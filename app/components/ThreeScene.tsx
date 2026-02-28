"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current?.appendChild(renderer.domElement);

    camera.position.z = 8;
    camera.zoom = 1;
    camera.updateProjectionMatrix();

    const texture = new THREE.TextureLoader().load("/textures/stars/sun/sun_2k.jpg");

    const geometry = new THREE.SphereGeometry();
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      //   transparent: true,
      //   opacity: 0.5,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const animate = () => {
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
}
