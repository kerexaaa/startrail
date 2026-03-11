# Startrail - Interactive 3D Solar System

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-black?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-black?style=for-the-badge&logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

**Startrail** is a highly performant, interactive 3D web application that simulates our Solar System. Built with modern web technologies, it features mathematically accurate planetary positions, seamless cinematic camera controls, and an optimized WebGL rendering loop.

> **[Live Demo](https://startrail-iota.vercel.app/)**

## Key Features

- **Accurate Astronomical Data**: Uses the `astronomy-engine` to calculate real-time planetary positions, distances, azimuth, and altitude based on actual astronomical math.
- **Cinematic Camera System**: Features a custom-built smooth zoom and free-cam system, completely decoupled from the UI state to prevent re-renders.
- **Interactive Planetary Meshes**: Hover and click on celestial bodies to fly towards them and reveal detailed scientific data cards.
- **High Performance (60 FPS)**: The WebGL render loop (`useFrame`) is heavily optimized using object pooling (reusing `THREE.Vector3` instances) to ensure a smooth experience without memory leaks.
- **Glassmorphism UI**: A sleek, modern user interface animated with Framer Motion, seamlessly layered over the 3D canvas.

## Tech Stack

- **Framework**: React 18 / Next.js / TS
- **3D Rendering**: Three.js / React Three Fiber / Drei
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Math & Physics**: Astronomy Engine

## Getting Started

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/kerexaaa/startrail.git
2. Install dependencies:
   ```bash
   npm install
3. Run the development server:
   ```bash
   npm run dev
4. Open http://localhost:3000 in your browser.

(Upcoming Features)
- Mobile responsiveness and touch-friendly controls.
- Implement Earth's Moon and other planetary satellites with complex orbital paths.
- Add an interactive Info/Guide menu for users.
- Expand the Telescope mode with deeper astronomical data (phases, constellations).

Author:
[GitHub](https://github.com/kerexaaa)
