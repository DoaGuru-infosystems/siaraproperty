// src/hooks/useLenis.js
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    // Instantiate Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      syncTouch: true,
      touchMultiplier: 1.5,
    });

    // Sync ScrollTrigger scroll calculations with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis frame updates with GSAP ticker
    const onTickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // Cleanup when component unmounts
    return () => {
      gsap.ticker.remove(onTickerUpdate);
      lenis.destroy();
    };
  }, []);
}
