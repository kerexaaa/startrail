import { BodyDataType } from "../types/astronomy";

export const PLANET_IDS = {
  Earth: "terre",
  Mars: "mars",
  Jupiter: "jupiter",
  Saturn: "saturne",
  Uranus: "uranus",
  Neptune: "neptune",
};

export const BODY_DATA: Record<string, BodyDataType> = {
  Sun: {
    type: "Yellow Dwarf Star",
    mass: { massValue: 1.989, massExponent: 30 },
    temp: "5,500 °C",
    fact: "Contains 99.86% of the mass in the entire Solar System.",
    description:
      "The Sun is a star at the center of our solar system. It is an almost perfect sphere of hot plasma. Every second, millions of tons of hydrogen are converted into helium in its core through thermonuclear fusion, creating the light and heat that make life on Earth possible. The Sun is about 4.6 billion years old.",
  },
  Mercury: {
    type: "Terrestrial Planet",
    mass: { massValue: 3.301, massExponent: 23 },
    temp: "167 °C",
    fact: "Mercury has no moons and no rings.",
    description:
      "Mercury is the smallest planet and the closest to the Sun. Due to the lack of a dense atmosphere that could retain heat, Mercury's surface experiences the most extreme temperature fluctuations in the Solar System: from -173°C at night to 427°C during the day. Its surface is densely covered with craters and resembles the Moon.",
  },
  Venus: {
    type: "Terrestrial Planet",
    mass: { massValue: 4.867, massExponent: 24 },
    temp: "464 °C",
    fact: "The hottest planet in our solar system.",
    description:
      "Venus is the second planet from the Sun and the hottest in the Solar System. Its dense atmosphere, consisting mainly of carbon dioxide, creates a powerful greenhouse effect. The pressure on the surface of Venus is 92 times greater than that on Earth. Interestingly, Venus rotates in the opposite direction to most planets.",
  },
  Earth: {
    type: "Terrestrial Planet",
    mass: { massValue: 5.972, massExponent: 24 },
    temp: "15 °C",
    fact: "The only known planet in the universe to support life.",
    description:
      "Earth is the third planet from the Sun and our home. It is the only known astronomical object with liquid water on its surface and life. About 71% of its surface is covered by the World Ocean. Earth's magnetic field protects us from the destructive solar wind.",
  },
  Mars: {
    type: "Terrestrial Planet",
    mass: { massValue: 6.39, massExponent: 23 },
    temp: "-65 °C",
    fact: "Home to Olympus Mons, the highest mountain in our solar system.",
    description:
      "Mars is the fourth planet from the Sun, often called the “Red Planet” because of the iron oxide (rust) on its surface. In the distant past, Mars had a dense atmosphere and liquid water on its surface. Today, it is home to the tallest volcano in the Solar System (Olympus Mons) and a giant canyon (Valleys of Mariner).",
  },
  Jupiter: {
    type: "Gas Giant",
    mass: { massValue: 1.898, massExponent: 27 },
    temp: "-110 °C",
    fact: "So large that all other planets could fit inside it.",
    description:
      "Jupiter is the largest planet in the Solar System. It is a gas giant consisting mainly of hydrogen and helium. Its most famous feature is the Great Red Spot, a giant storm that has been raging for several centuries. Jupiter has a powerful magnetic field and dozens of moons.",
  },
  Saturn: {
    type: "Gas Giant",
    mass: { massValue: 5.683, massExponent: 26 },
    temp: "-140 °C",
    fact: "Has the most spectacular and complex ring system.",
    description:
      "Saturn is the sixth planet from the Sun and the second largest. It is famous for its incredibly beautiful ring system, consisting of billions of particles of ice and rock. Like Jupiter, it is a gas giant. Saturn is so less dense that it could float in a giant pool of water.",
  },
  Uranus: {
    type: "Ice Giant",
    mass: { massValue: 8.681, massExponent: 25 },
    temp: "-195 °C",
    fact: "Rotates on its side.",
    description:
      "Uranus is the seventh planet from the Sun. It is classified as an ice giant because it contains a lot of “ice” (water, ammonia, and methane). Methane gives the planet its characteristic pale blue color. The main feature of Uranus is that its axis of rotation is strongly tilted, causing it to rotate as if “lying on its side.”",
  },
  Neptune: {
    type: "Ice Giant",
    mass: { massValue: 1.024, massExponent: 26 },
    temp: "-200 °C",
    fact: "The only planet not visible to the naked eye.",
    description:
      "Neptune is the eighth and farthest planet from the Sun. It is a dark, cold world with the strongest winds in the Solar System, reaching speeds of up to 2,100 km/h. Neptune was the first planet to be discovered through mathematical calculations rather than visual observations.",
  },
  Moon: {
    type: "Natural Satellite",
    mass: { massValue: 7.342, massExponent: 22 },
    temp: "-53 °C",
    fact: "Always shows the same face to Earth due to tidal locking.",
    description:
      "The Moon is Earth's only natural satellite. It is the fifth largest satellite in the Solar System. Its surface is covered in dead volcanoes, impact craters, and ancient lava flows. The gravitational pull of the Moon is largely responsible for Earth's ocean tides.",
  },
  Io: {
    type: "Volcanic Moon",
    mass: { massValue: 8.931, massExponent: 22 },
    temp: "-130 °C",
    fact: "The most geologically active object in the Solar System.",
    description:
      "Io is the innermost of the four Galilean moons of Jupiter. Caught in a gravitational tug-of-war between Jupiter and the other moons, Io's interior is intensely heated by tidal friction. This results in endless volcanic eruptions that paint its surface in bright shades of yellow, red, and sulfur.",
  },
  Europa: {
    type: "Ice Moon",
    mass: { massValue: 4.799, massExponent: 22 },
    temp: "-160 °C",
    fact: "Hides a massive subsurface ocean of liquid water beneath its icy crust.",
    description:
      "Europa is the smallest of the four Galilean moons orbiting Jupiter. Its surface is essentially a thick layer of water ice crisscrossed by deep cracks and streaks. Scientists strongly believe there is a vast ocean of liquid water beneath the ice, making Europa one of the most promising places to search for extraterrestrial life.",
  },
  Ganymede: {
    type: "Ice Giant Moon",
    mass: { massValue: 1.481, massExponent: 23 },
    temp: "-163 °C",
    fact: "The largest moon in the Solar System and the only one with its own magnetic field.",
    description:
      "Ganymede is a massive satellite of Jupiter, larger even than the planet Mercury. It consists of roughly equal amounts of silicate rock and water ice. It features a fully differentiated body with a liquid iron core, and a subterranean ocean that may contain more water than all of Earth's oceans combined.",
  },
  Callisto: {
    type: "Ice/Rock Moon",
    mass: { massValue: 1.075, massExponent: 23 },
    temp: "-139 °C",
    fact: "Has the oldest and most heavily cratered surface in the Solar System.",
    description:
      "Callisto is Jupiter's second-largest moon. Unlike the other Galilean moons, it shows almost no signs of internal geological activity. Its ancient surface is completely saturated with impact craters, perfectly preserving a deeply frozen record of the early Solar System's violent history.",
  },
  Titan: {
    type: "Atmospheric Moon",
    mass: { massValue: 1.345, massExponent: 23 },
    temp: "-179 °C",
    fact: "The only moon in the Solar System with a dense atmosphere and liquid lakes.",
    description:
      "Titan is the largest moon of Saturn and an extraordinary world enveloped in a thick, hazy atmosphere rich in nitrogen and organics. It is the only place besides Earth known to have stable bodies of liquid on its surface—though its lakes and seas are filled with liquid methane and ethane, not water.",
  },
};

export const PLANETARY_BODIES = [
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
];