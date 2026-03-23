const CDN_URL = "https://cdn.startrail.codes/textures";

interface BodyTexturesConfig {
  hasTexture: boolean;
  hasRings: boolean;
  ringScales?: [number, number];
}

const BODY_MANIFEST: Record<string, BodyTexturesConfig> = {
  sun: { hasTexture: true, hasRings: false },
  mercury: { hasTexture: true, hasRings: false },
  venus: { hasTexture: true, hasRings: false },
  earth: { hasTexture: true, hasRings: false },
  mars: { hasTexture: true, hasRings: false },
  jupiter: { hasTexture: true, hasRings: false },
  saturn: { hasTexture: true, hasRings: true, ringScales: [1.2, 2.4] },
  uranus: { hasTexture: true, hasRings: true, ringScales: [1.6, 2.0] },
  neptune: { hasTexture: true, hasRings: false },
  moon: { hasTexture: true, hasRings: false },
  europa: { hasTexture: true, hasRings: false },
  titan: { hasTexture: true, hasRings: false },
  ganymede: { hasTexture: true, hasRings: false },
  callisto: { hasTexture: true, hasRings: false },
  io: { hasTexture: true, hasRings: false },
};

export function getBodyTextureUrls(name: string) {
  const safeName = name.toLowerCase();

  const config = BODY_MANIFEST[safeName];

  if (!config) {
    return {
      bodyUrl: `${CDN_URL}/generic_moon.jpg`,
      ringUrl: null,
      ringScales: undefined,
    };
  }

  return {
    bodyUrl: config.hasTexture
      ? `${CDN_URL}/${safeName}.jpg`
      : `${CDN_URL}/generic_moon.jpg`,
    ringUrl: config.hasRings ? `${CDN_URL}/${safeName}_rings.png` : null,
    ringScales: config.ringScales,
  };
}
