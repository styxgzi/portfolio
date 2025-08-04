import React from "react";
import HeroContent from "./hero-context";

const Hero = () => {
  return (
    <section
      className="relative py-16 md:py-0 flex flex-col min-h-screen w-full overflow-hidden"
      id="about-me"
    >
      {/* Removed video background */}
      <HeroContent />
    </section>
  );
};

export default Hero;
