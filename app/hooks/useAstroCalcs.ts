import { useState, useEffect } from "react";
import * as Astronomy from "astronomy-engine";
import { toast } from "react-toastify";
import { BODY_DATA } from "../constants";
import { usePlanetStore } from "../states/usePlanetStore";

export type AstroDataType =
  | {
      mode: "telescope";
      az: number;
      alt: number;
      dist: number;
      constellation: string;
      magnitude: number;
    }
  | {
      mode: "interplanetary";
      dist: number;
      lightTime: number;
      speed: number;
      pingTime: number;
    }
  | {
      mode: "satellites";
    };

export const getBody = (name: string): Astronomy.Body | null => {
  name = name.toLowerCase().charAt(0).toUpperCase() + name.slice(1);
  const map: Record<string, Astronomy.Body> = {
    Sun: Astronomy.Body.Sun,
    Mercury: Astronomy.Body.Mercury,
    Venus: Astronomy.Body.Venus,
    Earth: Astronomy.Body.Earth,
    Mars: Astronomy.Body.Mars,
    Jupiter: Astronomy.Body.Jupiter,
    Saturn: Astronomy.Body.Saturn,
    Uranus: Astronomy.Body.Uranus,
    Neptune: Astronomy.Body.Neptune,
  };
  return map[name] || null;
};

export function useAstroCalculations(fromValue: string, toValue: string) {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [astroData, setAstroData] = useState<AstroDataType | null>(null);
  const [locationName, setLocationName] = useState("My Location");
  const [isLoading, setIsLoading] = useState(false);
  const { apiMoons } = usePlanetStore();

  useEffect(() => {
    let isMounted = true;

    if (!fromValue || !toValue) {
      setAstroData(null);
      return;
    }
    if (fromValue === toValue) {
      setAstroData(null);
      toast.error("Please select different bodies to track.", {
        toastId: "same-body",
      });
      return;
    }

    setIsLoading(true);

    if (fromValue === "My Location" || fromValue === "Current Location") {
      if (!navigator.geolocation) {
        toast.error("Geolocation is not supported", {
          toastId: "geo-support",
        });
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          if (!isMounted) return;
          setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&zoom=10`,
            );
            const data = await res.json();
            const city =
              data.address.city ||
              data.address.town ||
              data.address.state ||
              "";
            if (isMounted) {
              setLocationName(
                city ? `${city}, ${data.address.country}` : "GPS Location",
              );
            }
          } catch {
            if (isMounted) setLocationName("GPS Location");
          } finally {
            if (isMounted) setIsLoading(false);
          }
        },
        (error) => {
          if (isMounted) {
            toast.error(`GPS Error: ${error.message}`, {
              toastId: "gps-error",
            });
            setIsLoading(false);
          }
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
      );
    } else {
      setCoords(null);
      setLocationName(fromValue);
      setTimeout(() => {
        if (isMounted) setIsLoading(false);
      }, 400);
    }

    return () => {
      isMounted = false;
    };
  }, [fromValue, toValue]);

  useEffect(() => {
    const targetBody = getBody(toValue);
    const isFromEarth =
      fromValue === "My Location" || fromValue === "Current Location";
    const isApiMoon = apiMoons.some((item) => item.englishName === toValue);

    if (!toValue || toValue.length < 3) {
      setAstroData(null);
      return;
    }

    if (!targetBody && !isApiMoon) {
      setAstroData(null);
      return;
    }

    if (isLoading || (isFromEarth && !coords)) {
      return;
    }

    const calculate = () => {
      if (isApiMoon && !targetBody) {
        setAstroData({ mode: "satellites" });
        return;
      }

      if (!targetBody) {
        setAstroData(null);
        return;
      }

      const date = new Date();

      if (isFromEarth && coords) {
        if (targetBody === "Earth") {
          setAstroData(null);
          toast.error("Earth can't be selected as target here", {
            toastId: "earth-selected",
          });
          return;
        }
        const observer = new Astronomy.Observer(coords.lat, coords.lon, 0);
        const equator = Astronomy.Equator(
          targetBody,
          date,
          observer,
          true,
          true,
        );
        const horizon = Astronomy.Horizon(
          date,
          observer,
          equator.ra,
          equator.dec,
          "normal",
        );

        const constellation = Astronomy.Constellation(
          equator.ra,
          equator.dec,
        ).name;

        const magnitude = Astronomy.Illumination(targetBody, date).mag;

        setAstroData({
          mode: "telescope",
          az: horizon.azimuth,
          alt: horizon.altitude,
          dist: equator.dist,
          constellation,
          magnitude,
        });
      } else if (BODY_DATA[targetBody] && !isFromEarth) {
        const fromBody = getBody(fromValue);
        if (fromBody && fromBody !== targetBody) {
          const hv1 = Astronomy.HelioVector(fromBody, date);
          const hv2 = Astronomy.HelioVector(targetBody, date);

          const st1 = Astronomy.HelioState(fromBody, date);
          const st2 = Astronomy.HelioState(targetBody, date);

          const dx = hv2.x - hv1.x;
          const dy = hv2.y - hv1.y;
          const dz = hv2.z - hv1.z;

          const vx = st2.vx - st1.vx;
          const vy = st2.vy - st1.vy;
          const vz = st2.vz - st1.vz;

          const speedDifAU = Math.sqrt(vx * vx + vy * vy + vz * vz);

          const distAU = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const distKm = distAU * 149597870.7;
          const lightSeconds = distKm / 299792.458;

          const pingTime = lightSeconds * 2;

          setAstroData({
            mode: "interplanetary",
            dist: distAU,
            lightTime: lightSeconds,
            speed: speedDifAU,
            pingTime,
          });
        } else {
          setAstroData(null);
        }
      } else {
        setAstroData(null);
      }
    };

    calculate();

    if (isApiMoon && !targetBody) {
      return;
    }

    const interval = setInterval(calculate, 1000);

    return () => clearInterval(interval);
  }, [coords, toValue, fromValue, isLoading, apiMoons]);

  return { astroData, setAstroData, locationName, isLoading };
}
