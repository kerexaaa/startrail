import { useEffect, useState } from "react";
import { MoonData } from "../types/astronomy";
import { usePlanetStore } from "../states/usePlanetStore";
import { toast } from "react-toastify";

let inFlight: Promise<MoonData[]> | null = null;

function fetchMoons(): Promise<MoonData[]> {
  if (inFlight) return inFlight;

  inFlight = (async () => {
    const response = await fetch("/api/opendata");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.bodies)) {
      throw new Error("Invalid data format received from API");
    }

    return data.bodies as MoonData[];
  })();

  inFlight.catch(() => {
    inFlight = null;
  });

  return inFlight;
}

export default function useFetchMoons() {
  const setApiMoons = usePlanetStore((s) => s.setApiMoons);
  const apiMoons = usePlanetStore((s) => s.apiMoons);
  const setHydrated = usePlanetStore((s) => s.setHydrated);
  const [ready, setReady] = useState(
    () => usePlanetStore.persist?.hasHydrated?.() ?? true,
  );

  useEffect(() => {
    if (ready) return;
    return usePlanetStore.persist.onFinishHydration(() => {
      setHydrated(true);
      setReady(true);
    });
  }, [ready, setHydrated]);

  useEffect(() => {
    if (!ready) return;

    if (apiMoons.length !== 0) return;

    let isMounted = true;

    fetchMoons()
      .then((moons) => {
        if (isMounted) setApiMoons(moons);
      })
      .catch((err) => {
        console.error("Error fetching moons:", err);
        if (isMounted) {
          toast.error("Failed to load moons data", { toastId: "api-error" });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [ready, apiMoons.length, setApiMoons]);

  return { isReady: ready };
}
