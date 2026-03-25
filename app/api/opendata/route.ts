import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,Moon",
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY_OPENDATA}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("API Route Error:", err);
    return NextResponse.json(
      { error: "failed to fetch data" },
      { status: 500 },
    );
  }
}
