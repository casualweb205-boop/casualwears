import { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

function ParticleLogo() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    loadFull().then(() => setInit(true));
  }, []);

  const options = {
    background: {
      color: "#000",
    },
    particles: {
      number: {
        value: 150,
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.7,
      },
      size: {
        value: 2,
      },
      move: {
        enable: true,
        speed: 1,
      },
    },
  };

  if (!init) return null;

  return (
    <div className="relative h-24 flex items-center justify-center bg-black">

      {/* PARTICLES */}
      <Particles options={options} className="absolute w-full h-full" />

      {/* TEXT */}
      <h1 className="relative text-white text-2xl font-bold tracking-widest">
        Casual Wears
      </h1>
    </div>
  );
}

export default ParticleLogo;