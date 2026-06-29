// components/Hero.jsx

import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const searchRef = useRef(null);
  const indicatorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = [
        eyebrowRef.current,
        titleRef.current,
        subRef.current,
        searchRef.current,
      ];

      // ── Step 1: GSAP se initial state SET karo (inline style override hoga) ──
      gsap.set(els, { opacity: 0, y: 30 });
      gsap.set(indicatorRef.current, { opacity: 0 });

      // ── Step 2: fromTo se animate karo ──
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          searchRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          indicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2",
        );

      // ── Step 3: Parallax ──
      ScrollTrigger.create({
        animation: gsap.to(bgRef.current, {
          yPercent: 30,
          ease: "none",
        }),
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = e.target.elements.query.value.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <HeroSection ref={sectionRef}>
      <div className="hero-bg" ref={bgRef} />

      <div className="hero-content">
        <p className="hero-eyebrow" ref={eyebrowRef}>
          Siara Properties
        </p>

        <h1 className="hero-title" ref={titleRef}>
          <br />
          <em className="wavy-text">
            {"Your Trusted Partner in Property".split("").map((char, idx) => (
              <span key={idx} style={{ animationDelay: `${idx * 0.08}s` }}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </em>
          <br />
          <span style={{ display: "inline-block" }}>Buying & Selling</span>
        </h1>

        <p className="hero-sub" ref={subRef}>
          <strong>Jabalpur's most trusted property service.</strong> Buying a
          home just got easier.
        </p>

        <form className="search-bar" ref={searchRef} onSubmit={handleSearch}>
          <input
            className="search-input"
            name="query"
            type="text"
            placeholder="Enter location or project name…"
          />
          <div className="search-divider" />
          <select className="search-select" name="type">
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
          <div className="search-divider" />
          <select className="search-select" name="category">
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="flat">Flat</option>
            <option value="plot">Plot</option>
            <option value="villa">Villa</option>
            <option value="commercial">Commercial</option>
          </select>
          <button className="search-btn" type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="scroll-indicator" ref={indicatorRef}>
        <div className="scroll-line" />
        <span className="scroll-text">Scroll</span>
      </div>
    </HeroSection>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const HeroSection = styled.section`
  height: 100vh;
  min-height: 640px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding-bottom: calc(10vh + 80px);

  .hero-bg {
    position: absolute;
    inset: 0;
    background: url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop")
      center / cover no-repeat;
    will-change: transform;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(44, 44, 40, 0.15) 0%,
        rgba(44, 44, 40, 0.05) 40%,
        rgba(250, 248, 243, 0.88) 80%,
        rgba(250, 248, 243, 1) 100%
      );
    }
  }

  .hero-content {
    position: relative;
    z-index: 1;
    padding: 0 8%;
    max-width: 1100px;
  }

  .hero-eyebrow {
    font-size: 20px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #7b4209ff;
    font-weight: 500;
    text-shadow:
      0 2px 10px rgba(250, 248, 243, 0.9),
      0 1px 3px rgba(44, 44, 40, 0.2);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;

    &::before {
      content: "";
      width: 40px;
      height: 1px;
      background: #b8895a;
      display: inline-block;
      box-shadow: 0 1px 3px rgba(44, 44, 40, 0.2);
    }
  }

  .hero-title {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: clamp(3rem, 6vw, 5.5rem);
    font-weight: 300;
    line-height: 1.05;
    color: #2c2c28;
    letter-spacing: -0.01em;
    margin-bottom: 24px;

    em.wavy-text {
      font-style: italic;
      color: #d4a574;
      font-weight: 400;
      text-shadow:
        0 2px 4px rgba(44, 44, 40, 0.4),
        0 4px 12px rgba(44, 44, 40, 0.3),
        0 8px 24px rgba(0, 0, 0, 0.25),
        2px 2px 0px rgba(255, 255, 255, 0.3);
      filter: drop-shadow(0 2px 2px rgba(44, 44, 40, 0.2));
      // display: block;

      span {
        // display: inline-block;
        animation: waveAnim 2s infinite ease-in-out;
        will-change: transform, color;
      }
    }
  }

  @keyframes waveAnim {
    0%,
    100% {
      transform: translateY(0);
      color: #d4a574;
    }
    50% {
      transform: translateY(-4px);
      color: #8b6f47;
    }
  }

  .hero-sub {
    font-size: 16px;
    color: #5a5a54;
    max-width: 420px;
    margin-bottom: 40px;
    font-weight: 300;
  }

  .search-bar {
    background: white;
    border: 1px solid #e2d9cc;
    border-radius: 4px;
    display: flex;
    align-items: stretch;
    overflow: hidden;
    box-shadow: 0 4px 32px rgba(44, 44, 40, 0.1);
    max-width: 680px;

    @media (max-width: 600px) {
      flex-direction: column;
    }
  }

  .search-input {
    flex: 1;
    padding: 16px 20px;
    border: none;
    outline: none;
    font-family: "DM Sans", sans-serif;
    font-size: 14px;
    background: transparent;
    color: #2c2c28;
    &::placeholder {
      color: #9a9a94;
    }
  }

  .search-divider {
    width: 1px;
    background: #e2d9cc;
    margin: 10px 0;

    @media (max-width: 600px) {
      width: 100%;
      height: 1px;
      margin: 0;
    }
  }

  .search-select {
    padding: 16px 36px 16px 16px;
    border: none;
    outline: none;
    background: transparent;
    font-family: "DM Sans", sans-serif;
    font-size: 13px;
    color: #5a5a54;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239A9A94' stroke-width='1.5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
  }

  .search-btn {
    padding: 16px 32px;
    background: #b8895a;
    color: white;
    border: none;
    cursor: pointer;
    font-family: "DM Sans", sans-serif;
    font-size: 13px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: background 0.2s;
    white-space: nowrap;
    &:hover {
      background: #8c6340;
    }
  }

  .scroll-indicator {
    position: absolute;
    bottom: 32px;
    right: 5%;
    left: auto;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 2;
  }

  .scroll-line {
    width: 1px;
    height: 48px;
    background: #5a5a54;
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      background: #b8895a;
      animation: scrollDrop 2s ease-in-out infinite;
    }
  }

  @keyframes scrollDrop {
    0% {
      top: -100%;
      height: 100%;
    }
    100% {
      top: 100%;
      height: 100%;
    }
  }

  .scroll-text {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #5a5a54;
    writing-mode: vertical-lr;
  }

  @media (max-width: 600px) {
    padding-bottom: calc(8vh + 80px);
    .hero-content {
      padding: 0 5%;
    }
    .scroll-indicator {
      display: none;
    }
  }
`;
