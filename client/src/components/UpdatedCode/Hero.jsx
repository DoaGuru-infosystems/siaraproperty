// components/Hero.jsx

import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TITLE_WORDS = ["Property", "Buying", "&", "Selling"];
const TITLE_WORD_STARTS = [0, 8, 14, 15];

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

      gsap.set(els, { opacity: 0, y: 30 });
      gsap.set(indicatorRef.current, { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          searchRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          indicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );

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
    const query = e.target.elements.query?.value?.trim() || "";
    const type = e.target.elements.type?.value || "";
    const category = e.target.elements.category?.value || "";

    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (type) params.set("type", type);
    if (category) params.set("category", category);

    const queryString = params.toString();
    navigate(`/properties${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <HeroSection ref={sectionRef}>
      <div className="hero-bg" ref={bgRef} />

      <div className="hero-content">
        <p className="hero-eyebrow" ref={eyebrowRef}>
          Siara Properties
        </p>

        <h1 className="hero-title" ref={titleRef}>
          <span className="title-lead">Your Trusted Partner in</span>
          <br />
          <em className="title-highlight wavy-text">
            {TITLE_WORDS.map((word, wordIndex) => (
              <React.Fragment key={word}>
                {wordIndex > 0 && " "}
                <span className="title-word">
                  {word.split("").map((char, charIndex) => (
                    <span
                      className="title-char"
                      key={charIndex}
                      style={{
                        animationDelay: `${(TITLE_WORD_STARTS[wordIndex] + charIndex) * 0.08}s`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </React.Fragment>
            ))}
          </em>
        </h1>

        <p className="hero-sub" ref={subRef}>
          <strong>Jabalpur's most trusted property service.</strong> Buying a
          home just got easier.
        </p>

        <form className="search-bar" ref={searchRef} onSubmit={handleSearch}>
          <div className="search-input-wrap">
            <i className="bi bi-geo-alt search-icon" />
            <input
              className="search-input"
              name="query"
              type="text"
              placeholder="Enter location or project name…"
            />
          </div>

          <div className="search-divider desktop-only" />

          <div className="search-selects-row">
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
          </div>

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

  @media (max-width: 768px) {
    height: auto;
    min-height: calc(100svh - 64px);
    align-items: center;
    padding: 60px 0 50px;
  }

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
      background:
        radial-gradient(
          ellipse at 25% 42%,
          rgba(20, 18, 15, 0.62) 0%,
          rgba(20, 18, 15, 0.44) 42%,
          rgba(20, 18, 15, 0.08) 78%
        ),
        linear-gradient(
          to bottom,
          rgba(44, 44, 40, 0.28) 0%,
          rgba(44, 44, 40, 0.12) 30%,
          rgba(250, 248, 243, 0.88) 75%,
          rgba(250, 248, 243, 1) 100%
        );

      @media (max-width: 768px) {
        background: linear-gradient(
          180deg,
          rgba(20, 18, 15, 0.52) 0%,
          rgba(20, 18, 15, 0.42) 45%,
          rgba(20, 18, 15, 0.12) 72%,
          rgba(250, 248, 243, 0.96) 100%
        );
      }
    }
  }

  .hero-content {
    position: relative;
    z-index: 1;
    padding: 0 8%;
    max-width: 1100px;
    width: 100%;
    box-sizing: border-box;

    @media (max-width: 768px) {
      padding: 0 6%;
    }
  }

  .hero-eyebrow {
    font-size: 13px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #f0c27b;
    font-weight: 600;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;

    &::before {
      content: "";
      width: 32px;
      height: 1px;
      background: currentColor;
      display: inline-block;
    }

    @media (max-width: 768px) {
      font-size: 11.5px;
      margin-bottom: 12px;
    }
  }

  .hero-title {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: clamp(2.8rem, 5vw, 4.7rem);
    font-weight: 300;
    line-height: 1.1;
    color: #fffaf1;
    letter-spacing: -0.01em;
    margin-bottom: 22px;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.45);

    .title-lead {
      display: inline-block;
      background: linear-gradient(135deg, #fffdf8 0%, #f8ead2 55%, #e8c99a 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.7));
    }

    em.title-highlight {
      font-style: italic;
      color: #f0c27b;
      font-weight: 400;
      display: inline-block;
      filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.7));

      .title-word {
        display: inline-block;
        white-space: nowrap;
      }

      &.wavy-text .title-char {
        display: inline-block;
        animation: waveAnim 2.2s infinite ease-in-out;
        will-change: transform, color;
      }
    }

    @keyframes waveAnim {
      0%,
      100% {
        transform: translateY(0);
        color: #f0c27b;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.55);
      }
      50% {
        transform: translateY(-5px);
        color: #ffe0a6;
        text-shadow: 0 3px 14px rgba(0, 0, 0, 0.6);
      }
    }

    @media (max-width: 768px) {
      font-size: clamp(2rem, 7.8vw, 2.8rem);
      line-height: 1.15;
      margin-bottom: 16px;
    }
  }

  .hero-sub {
    font-size: 17px;
    color: #ffffff;
    max-width: 520px;
    margin-bottom: 34px;
    font-weight: 500;
    letter-spacing: 0.04em;
    line-height: 1.75;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.85), 0 1px 3px rgba(0, 0, 0, 0.9);

    strong {
      color: #ffffff;
      font-weight: 700;
      letter-spacing: 0.03em;
    }

    @media (max-width: 768px) {
      font-size: 15px;
      letter-spacing: 0.03em;
      margin-bottom: 24px;
    }
  }

  .search-bar {
    background: white;
    border: 1px solid #e2d9cc;
    border-radius: 12px;
    display: flex;
    align-items: stretch;
    box-shadow: 0 8px 32px rgba(44, 44, 40, 0.1);
    max-width: 720px;
    width: 100%;
    overflow: hidden;

    @media (max-width: 768px) {
      flex-direction: column;
      border-radius: 14px;
      box-shadow: 0 10px 30px rgba(44, 44, 40, 0.12);
    }
  }

  .search-input-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 18px;
    min-height: 52px;

    .search-icon {
      color: #b8895a;
      font-size: 16px;
      margin-right: 10px;
      flex-shrink: 0;
    }

    @media (max-width: 768px) {
      padding: 0 14px;
      min-height: 48px;
    }
  }

  .search-input {
    width: 100%;
    padding: 14px 0;
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

  .search-selects-row {
    display: flex;
    align-items: stretch;

    @media (max-width: 768px) {
      width: 100%;
      border-top: 1px solid #f0ece4;
      border-bottom: 1px solid #f0ece4;
      background: #faf8f5;
    }
  }

  .search-divider {
    width: 1px;
    background: #f0ece4;
    margin: 10px 0;

    @media (max-width: 768px) {
      margin: 8px 0;
    }

    &.desktop-only {
      @media (max-width: 768px) {
        display: none;
      }
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
    white-space: nowrap;

    @media (max-width: 768px) {
      flex: 1;
      min-width: 0;
      padding: 13px 26px 13px 12px;
      font-size: 12.5px;
      background-position: right 8px center;
    }
  }

  .search-btn {
    padding: 16px 36px;
    background: linear-gradient(135deg, #b8895a, #a67545);
    color: white;
    border: none;
    cursor: pointer;
    font-family: "DM Sans", sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    transition: all 0.25s ease;
    white-space: nowrap;

    &:hover {
      background: linear-gradient(135deg, #a67545, #8c6340);
    }

    @media (max-width: 768px) {
      width: 100%;
      padding: 14px 20px;
      text-align: center;
      letter-spacing: 0.14em;
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

    @media (max-width: 768px) {
      display: none;
    }
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
`;
