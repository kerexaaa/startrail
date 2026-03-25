export interface MoonData {
  id: string;
  name: string;
  englishName: string;
  isPlanet: boolean;
  semimajorAxis: number;
  meanRadius: number;
  sideralOrbit: number;
  inclination: number;
  mass: {
    massValue: number;
    massExponent: number;
  };
  avgTemp: number;
  discoveredBy: string;
  discoveryDate: string;
  aroundPlanet: {
    planet: string;
    rel: string;
  } | null;
}

export interface MoonApiResponse {
  bodies: MoonData[];
}
