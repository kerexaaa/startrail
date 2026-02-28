import * as Astronomy from "astronomy-engine";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { usePlanetStore } from "./states/usePlanetStore";

interface TelescopeDataProps {
  fromValue: string;
  toValue: string;
  setToValue: (val: string) => void;
  setFromValue: (val: string) => void;
}

type AstroDataType =
  | { mode: "telescope"; az: number; alt: number; dist: number }
  | { mode: "interplanetary"; dist: number; lightTime: number };

export const getBody = (name: string): Astronomy.Body | null => {
  const map: Record<string, Astronomy.Body> = {
    Sun: Astronomy.Body.Sun,
    Moon: Astronomy.Body.Moon,
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

export default function TelescopeData({
  fromValue,
  toValue,
  setFromValue,
  setToValue,
}: TelescopeDataProps) {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const { setSearchTarget, setFocusedPlanet } = usePlanetStore();
  const [astroData, setAstroData] = useState<AstroDataType | null>(null);

  const [locationName, setLocationName] = useState("My Location");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!fromValue || !toValue) return;
    if (fromValue === toValue) {
      toast.error("Please select different bodies to track.", {
        toastId: "same-body",
      });
      return;
    }

    setIsLoading(true);

    if (fromValue === "My Location" || fromValue === "Current Location") {
      if (!navigator.geolocation) {
        toast.error("Geolocation is not supported");
        setIsLoading(false);
        return;
      }

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
            toast.error(`GPS Error: ${error.message}`);
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

    if (!targetBody || (isFromEarth && !coords) || isLoading) {
      return;
    }

    const calculate = () => {
      const date = new Date();

      if (isFromEarth && coords) {
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

        setAstroData({
          mode: "telescope",
          az: horizon.azimuth,
          alt: horizon.altitude,
          dist: equator.dist,
        });
      } else {
        const fromBody = getBody(fromValue);
        if (fromBody && fromBody !== targetBody) {
          const hv1 = Astronomy.HelioVector(fromBody, date);
          const hv2 = Astronomy.HelioVector(targetBody, date);

          const dx = hv2.x - hv1.x;
          const dy = hv2.y - hv1.y;
          const dz = hv2.z - hv1.z;

          const distAU = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const distKm = distAU * 149597870.7;
          const lightSeconds = distKm / 299792.458;

          setAstroData({
            mode: "interplanetary",
            dist: distAU,
            lightTime: lightSeconds,
          });
        }
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);

    return () => clearInterval(interval);
  }, [coords, toValue, fromValue, isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && fromValue && toValue && fromValue !== toValue ? (
        <motion.div
          key="skeleton"
          className="absolute top-40 left-8 mt-4 p-4 glassmorphism rounded-[20px] flex flex-col gap-4 w-72 text-white z-10"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="animate-pulse flex flex-col gap-4">
            <div className="h-4 bg-white/20 rounded w-2/3"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-white/10 rounded-lg"></div>
              <div className="h-16 bg-white/10 rounded-lg"></div>
            </div>
            <div className="h-3 bg-white/10 rounded w-1/2"></div>
          </div>
        </motion.div>
      ) : astroData ? (
        <motion.div
          key="data"
          className="absolute top-40 left-8 mt-4 p-4 glassmorphism rounded-[20px] flex flex-col gap-3 text-white z-10 w-72"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-sm text-white/50 border-b border-white/10 pb-2 leading-relaxed pr-6">
            Tracking:{" "}
            <span className="text-white font-semibold">{toValue}</span> <br />
            from <span className="text-white font-medium">{locationName}</span>
          </div>

          <div className="absolute top-4 right-4">
            <button
              onClick={() => {
                setAstroData(null);
                setFromValue("");
                setToValue("");
                setSearchTarget("");
                setFocusedPlanet(null);
              }}
              className="text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {astroData.mode === "telescope" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-white/50">Azimuth</div>
                <div className="text-xl font-mono">
                  {astroData.az.toFixed(2)}°
                </div>
              </div>
              <div>
                <div className="text-xs text-white/50">Altitude</div>
                <div className="text-xl font-mono">
                  {astroData.alt.toFixed(2)}°
                  {astroData.alt < 0 && (
                    <span className="text-red-400 text-[10px] block leading-tight mt-1">
                      Below horizon
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {astroData.mode === "interplanetary" && (
            <div className="bg-white/5 p-2 rounded-lg">
              <div className="text-xs text-white/50">Light Travel Time</div>
              <div className="text-lg font-mono text-blue-300">
                {Math.floor(astroData.lightTime / 60)}m{" "}
                {(astroData.lightTime % 60).toFixed(0)}s
              </div>
            </div>
          )}

          <div className="mt-1 text-xs text-white/50">
            Distance:&nbsp;
            {(astroData.dist * 149597870.7).toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}{" "}
            km <br />
            <span className="text-[10px] text-white/30">
              {astroData.dist.toFixed(4)} AU
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
