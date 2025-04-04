/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

const ParticlesComponent = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).particlesJS) {
      // Estrelas amarelas
      (window as any).particlesJS("particles-starfield-yellow", {
        particles: {
          number: { value: 160, density: { enable: true, value_area: 400 } },
          color: { value: "#f5ff6f" }, 
          shape: { type: "circle" },
          opacity: { value: 0.8, anim: { enable: false } },
          size: { value: 2, random: true },
          line_linked: { enable: false },
          move: {
            enable: true,
            speed: 0.2, 
            direction: "bottom", 
            random: true, 
            straight: false, 
            out_mode: "out", 
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false },
            onclick: { enable: false },
            resize: false
          },
          modes: {}
        },
        retina_detect: true
      });

      // Estrelas azuis
      (window as any).particlesJS("particles-starfield-blue", {
        particles: {
          number: { value: 160, density: { enable: true, value_area: 400 } },
          color: { value: "#6f9efe" }, 
          shape: { type: "circle" },
          opacity: { value: 0.8, anim: { enable: false } },
          size: { value: 2, random: true },
          line_linked: { enable: false },
          move: {
            enable: true,
            speed: 0.2, 
            direction: "top", 
            random: true, 
            straight: false, 
            out_mode: "out", 
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false },
            onclick: { enable: false },
            resize: false
          },
          modes: {}
        },
        retina_detect: true
      });


      (window as any).particlesJS("particles-starfield-white", {
        particles: {
          number: { value: 160, density: { enable: true, value_area: 400 } },
          color: { value: "#ffffff" }, 
          shape: { type: "circle" },
          opacity: { value: 0.8, anim: { enable: false } },
          size: { value: 2, random: true },
          line_linked: { enable: false },
          move: {
            enable: true,
            speed: 0.2, 
            direction: "onne", 
            random: true, 
            straight: false, 
            out_mode: "out", 
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false },
            onclick: { enable: false },
            resize: false
          },
          modes: {}
        },
        retina_detect: true
      });
    }
  }, []);

  return (
    <>
      <div id="particles-starfield-yellow" className="fixed top-0 left-0 w-full h-screen -z-10" />
      <div id="particles-starfield-blue" className="fixed top-0 left-0 w-full h-screen -z-10" />
      <div id="particles-starfield-white" className="fixed top-0 left-0 w-full h-screen -z-10" />
    </>
  );
};

export default ParticlesComponent;
