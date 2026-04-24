import { useEffect, useState } from "react";
import { MoonData } from "../types/astronomy";
import { usePlanetStore } from "../states/usePlanetStore";
import { toast } from "react-toastify";

export default function useFetchMoons() {
  const { setApiMoons, apiMoons } = usePlanetStore();
  const [isLoadingMoons, setIsLoadingMoons] = useState(false);

  useEffect(() => {
    if (apiMoons.length !== 0) return;

    let isMounted = true;

    const fetchMoons = async () => {
      setIsLoadingMoons(true);
      try {
        const response = await fetch("/api/opendata");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !Array.isArray(data.bodies)) {
          throw new Error("Invalid data format received from API");
        }

        const validMoons = data.bodies as MoonData[];

        const filteredMoons = validMoons.filter(
          (item) => item.englishName && !item.englishName.includes("/"),
        );

        if (isMounted) {
          setApiMoons(filteredMoons);
        }
      } catch (err) {
        console.error("Error fetching moons:", err);
        if (isMounted) {
          toast.error(`Failed to load moons data`, { toastId: "api-error" });
          setApiMoons([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingMoons(false);
        }
      }
    };

    fetchMoons();

    return () => {
      isMounted = false;
    };
  }, [apiMoons.length, setApiMoons]);

  return { isLoadingMoons };
}
