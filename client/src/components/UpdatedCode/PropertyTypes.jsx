// components/PropertyTypes.jsx
// ─────────────────────────────────────────────────────────────────────────────
// "Explore Our Properties" — drag-to-scroll horizontal cards
// GSAP fan-in stagger + click active state
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TYPES = [
  {
    icon: "🏠",
    name: "House",
    count: "24 Properties",
    slug: "house",
    className: "",
  },
  {
    icon: "🏡",
    name: "Villa",
    count: "12 Properties",
    slug: "villa",
    className: "",
  },
  {
    icon: "📐",
    name: "Plot",
    count: "38 Properties",
    slug: "plot",
    className: "",
  },
  {
    icon: "🏢",
    name: "Flat",
    count: "19 Properties",
    slug: "flat",
    className: "",
  },
  {
    icon: "🌿",
    name: "Land",
    count: "15 Properties",
    slug: "land",
    className: "",
  },
  {
    icon: "🌾",
    name: "Farm Land",
    count: "9 Properties",
    slug: "farmland",
    className: "",
  },
  {
    icon: "🏘️",
    name: "Farm House",
    count: "7 Properties",
    slug: "farmhouse",
    className: "",
  },
  {
    icon: "🏪",
    name: "Commercial",
    count: "22 Properties",
    slug: "commercial",
    className: "",
  },
  {
    icon: "🔑",
    name: "For Rent",
    count: "41 Properties",
    slug: "rent",
    className: "rent-card",
  },
];

export default function PropertyTypes() {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);

  // ── drag to scroll ──
  useEffect(() => {
    const track = trackRef.current;
    let isDragging = false,
      startX = 0,
      scrollLeft = 0;

    const onDown = (e) => {
      isDragging = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.style.cursor = "grabbing";
    };
    const onLeave = () => {
      isDragging = false;
      track.style.cursor = "grab";
    };
    const onUp = () => {
      isDragging = false;
      track.style.cursor = "grab";
    };
    const onMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX) * 1.4;
    };

    track.addEventListener("mousedown", onDown);
    track.addEventListener("mouseleave", onLeave);
    track.addEventListener("mouseup", onUp);
    track.addEventListener("mousemove", onMove);
    return () => {
      track.removeEventListener("mousedown", onDown);
      track.removeEventListener("mouseleave", onLeave);
      track.removeEventListener("mouseup", onUp);
      track.removeEventListener("mousemove", onMove);
    };
  }, []);

  // ── GSAP fan-in stagger ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        cards,
        { opacity: 0, x: 40, scale: 0.93 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.55,
          ease: "back.out(1.4)",
          stagger: 0.06,
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  const handleCardClick = (i, e) => {
    e.preventDefault();
    setActive(i);
    gsap.fromTo(
      cardsRef.current[i],
      { scale: 0.95 },
      { scale: 1, duration: 0.3, ease: "back.out(2)" },
    );
  };

  return (
    <TypesSection>
      <div className="types-header">
        <div>
          <p className="section-label">Browse by Category</p>
          <h2 className="section-title reveal">
            Explore <em>Our Properties</em>
          </h2>
        </div>
        <Link to="/properties" className="link-arrow reveal">
          Sab dekhein
        </Link>
      </div>

      <div className="types-track-wrap" ref={trackRef}>
        <div className="types-track">
          {TYPES.map((type, i) => (
            <a
              key={type.slug}
              href={`/properties?type=${type.slug}`}
              className={`type-card${type.className ? ` ${type.className}` : ""}${active === i ? " active" : ""}`}
              ref={(el) => (cardsRef.current[i] = el)}
              onClick={(e) => handleCardClick(i, e)}
            >
              <div className="type-icon-wrap">{type.icon}</div>
              <div className="type-name">{type.name}</div>
              <div className="type-count">{type.count}</div>
            </a>
          ))}
        </div>
      </div>
    </TypesSection>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const TypesSection = styled.section`
  background: #fffef9;
  padding: 80px 8%;
  overflow: hidden;

  .types-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 44px;
  }

  .section-label {
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #b8895a;
    font-weight: 500;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;

    &::before {
      content: "";
      width: 28px;
      height: 1px;
      background: #b8895a;
      display: inline-block;
    }
  }

  .section-title {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 300;
    line-height: 1.1;
    color: #2c2c28;
    em {
      font-style: italic;
      color: #b8895a;
    }
  }

  .link-arrow {
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #b8895a;
    text-decoration: none;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: gap 0.2s;
    white-space: nowrap;
    &:hover {
      gap: 14px;
    }
    &::after {
      content: "→";
    }
  }

  /* ── scrollable track ── */
  .types-track-wrap {
    position: relative;
    margin: 0 -8%;
    padding: 0 8% 20px;
    overflow-x: auto;
    overflow-y: visible;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    cursor: grab;
    user-select: none;

    &::-webkit-scrollbar {
      display: none;
    }

    /* fade edges */
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 20px;
      width: 64px;
      pointer-events: none;
      z-index: 2;
    }
    &::before {
      left: 0;
      background: linear-gradient(to right, #fffef9, transparent);
    }
    &::after {
      right: 0;
      background: linear-gradient(to left, #fffef9, transparent);
    }
  }

  .types-track {
    display: flex;
    gap: 14px;
    width: max-content;
    padding-bottom: 4px;
  }

  /* ── individual card ── */
  .type-card {
    background: white;
    border: 1px solid #e2d9cc;
    border-radius: 14px;
    padding: 28px 22px 22px;
    cursor: pointer;
    transition:
      border-color 0.25s,
      box-shadow 0.25s,
      transform 0.25s;
    position: relative;
    overflow: hidden;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 148px;
    flex-shrink: 0;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 14px;
      background: linear-gradient(
        135deg,
        rgba(184, 137, 90, 0.07) 0%,
        transparent 60%
      );
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover {
      border-color: #b8895a;
      box-shadow: 0 10px 36px rgba(184, 137, 90, 0.14);
      transform: translateY(-3px);
      &::after {
        opacity: 1;
      }
      .type-icon-wrap {
        background: #f5ede3;
      }
    }

    &.active {
      background: #b8895a;
      border-color: #b8895a;
      .type-icon-wrap {
        background: rgba(255, 255, 255, 0.22);
      }
      .type-name {
        color: white;
      }
      .type-count {
        color: rgba(255, 255, 255, 0.72);
      }
      &::after {
        opacity: 0;
      }
      &:hover {
        box-shadow: 0 12px 40px rgba(140, 99, 64, 0.28);
      }
    }

    /* rent variant */
    &.rent-card {
      border-color: rgba(201, 168, 76, 0.35);
      .type-icon-wrap {
        background: #f7f0dc;
      }
      &:hover {
        border-color: #c9a84c;
        box-shadow: 0 10px 36px rgba(201, 168, 76, 0.18);
        .type-icon-wrap {
          background: #f0e4b8;
        }
      }
    }
  }

  .type-icon-wrap {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    background: #f0ebe1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    transition: background 0.25s;
    font-size: 26px;
    line-height: 1;
    flex-shrink: 0;
  }

  .type-name {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 17px;
    font-weight: 400;
    color: #2c2c28;
    margin-bottom: 5px;
    line-height: 1.15;
  }

  .type-count {
    font-size: 12px;
    color: #9a9a94;
    letter-spacing: 0.03em;
  }
`;
