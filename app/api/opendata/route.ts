import { NextResponse } from "next/server";
import { MoonData } from "@/app/types/astronomy";
import { MOONS_CACHE_TTL_SECONDS } from "@/app/constants";

const MOONS_API_URL =
  "https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,Moon";

async function fetchMoons(): Promise<MoonData[]> {
  const response = await fetch(MOONS_API_URL, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY_OPENDATA}`,
    },
    next: { revalidate: MOONS_CACHE_TTL_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`API responded with status: ${response.status}`);
  }

  const data = await response.json();
  const bodies: MoonData[] = Array.isArray(data?.bodies) ? data.bodies : [];

  return bodies.filter(
    (item) => item.englishName && !item.englishName.includes("/"),
  );
}

export async function GET() {
  try {
    const moons = await fetchMoons();

    return NextResponse.json(
      { bodies: moons },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${MOONS_CACHE_TTL_SECONDS}, stale-while-revalidate=${MOONS_CACHE_TTL_SECONDS * 7}`,
        },
      },
    );
  } catch (err) {
    console.error("API Route Error:", err);
    return NextResponse.json(
      { error: "failed to fetch data" },
      { status: 500 },
    );
  }
}
