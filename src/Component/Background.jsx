import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const Background = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options = useMemo(() => ({
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "grab" },
      },
      modes: {
        push: { quantity: 3 },
        grab: {
          distance: 180,
          links: { opacity: 0.8, color: "#C4F20D" },
        },
      },
    },
    particles: {
      color: { value: "#C4F20D" },
      links: {
        color: "#C4F20D",
        distance: 160,
        enable: true,
        opacity: 0.25,
        width: 1,
        // This makes links look like circuit traces — straight angles
        triangles: { enable: false },
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 0.6,       // Very slow — circuit boards don't move fast
        straight: false,
        attract: { enable: false },
      },
      number: {
        density: { enable: true, area: 900 },
        value: 80,
      },
      opacity: {
        value: { min: 0.3, max: 1 },
        animation: {
          enable: true,
          speed: 0.8,
          sync: false,
        },
      },
      shape: { type: "circle" },
      size: {
        value: { min: 1.5, max: 4 },
        animation: {
          enable: true,
          speed: 1.5,
          sync: false,
        },
      },
      shadow: {
        enable: true,
        color: "#C4F20D",
        blur: 12,
      },
    },
    detectRetina: true,
  }), []);

  return (
    <div className="fixed inset-0 -z-10 w-full h-full"
      style={{
        background: "radial-gradient(ellipse at 40% 50%, #0a360aff 0%, #031406ff 50%, #020801ff 100%)"
      }}
    >
      {init && (
        <Particles
          id="tsparticles"
          options={options}
          className="absolute inset-0 w-full h-full"
        />
      )}

      {/* Circuit grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(196,242,13,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,242,13,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Center glow like your reference image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(196,242,13,0.06) 0%, transparent 65%)",
        }}
      />
    </div>
  );
};

export default Background;