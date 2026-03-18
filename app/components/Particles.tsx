"use client";

import { memo, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const PARTICLE_COLOR = "#6d28d9";

const ParticlesBackground = memo(function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 -z-10"
      options={{
        background: { color: { value: "#0a0a0a" } },
        particles: {
          number: { value: 80 },
          color: { value: PARTICLE_COLOR },
          links: {
            enable: true,
            color: PARTICLE_COLOR,
            opacity: 0.1,
          },
          move: { enable: true, speed: 1 },
          opacity: { 
            value: {min: 0.1, max: 0.8},
            animation: {
                enable: true,
                speed: 1,
                sync: false,
            },
          },
          shadow: {
            enable: true,
            color: PARTICLE_COLOR,
            blur: 10,
          },
          size: { value: 2 },
        },
        interactivity:{
            events:{
                onHover: {
                    enable: true,
                    mode: "attract",
                },
            },
            modes: {
                attract: {
                    distance: 100,
                    speed: 3,
                },
            },
        },
      }}
    />
  );
});

export default ParticlesBackground;