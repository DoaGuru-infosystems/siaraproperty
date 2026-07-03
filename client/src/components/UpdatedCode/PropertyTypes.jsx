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
import axios from "axios";
import { 
  FaHome, 
  FaBuilding, 
  FaTree, 
  FaTractor, 
  FaCity, 
  FaKey, 
  FaVectorSquare 
} from "react-icons/fa";
import { MdOutlineVilla, MdOutlineHolidayVillage } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

export default function PropertyTypes() {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    axios
      .get("/api/property/getAllProperty")
      .then((r) => {
        const data = r.data?.data || [];
        const newCounts = {
          house: 0,
          villa: 0,
          plot: 0,
          flat: 0,
          land: 0,
          farmland: 0,
          farmhouse: 0,
          commercial: 0,
          rent: 0,
        };

        data.forEach((p) => {
          // Exclude sold properties
          if (p.isSold == "1" || p.isSold === 1) return;

          const pFor = (p.property_for || "").toLowerCase();
          const t = (p.property_type || "").toLowerCase();

          // Count For Rent
          if (pFor === "rent") {
            newCounts.rent++;
          } 
          // Count categories for sale
          else if (pFor === "sale") {
            if (t === "house") newCounts.house++;
            if (t === "villa") newCounts.villa++;
            if (t === "plot") newCounts.plot++;
            if (t === "flat") newCounts.flat++;
            if (t === "land") newCounts.land++;
            if (t === "farmland" || t === "farm land") newCounts.farmland++;
            if (t === "farmhouse" || t === "farm house") newCounts.farmhouse++;
            if (t === "commercial") newCounts.commercial++;
          }
        });
        setCounts(newCounts);
      })
      .catch((e) => console.log(e));
  }, []);

  const TYPES = [
    {
      icon: <FaHome />,
      name: "House",
      count: `${counts.house || 0} Properties`,
      link: "/property/propertyType/house",
      className: "",
    },
    {
      icon: <MdOutlineVilla />,
      name: "Villa",
      count: `${counts.villa || 0} Properties`,
      link: "/property/propertyType/villa",
      className: "",
    },
    {
      icon: <FaVectorSquare />,
      name: "Plot",
      count: `${counts.plot || 0} Properties`,
      link: "/property/propertyType/plot",
      className: "",
    },
    {
      icon: <FaBuilding />,
      name: "Flat",
      count: `${counts.flat || 0} Properties`,
      link: "/property/propertyType/flat",
      className: "",
    },
    {
      icon: <FaTree />,
      name: "Land",
      count: `${counts.land || 0} Properties`,
      link: "/property/propertyType/land",
      className: "",
    },
    {
      icon: <FaTractor />,
      name: "Farm Land",
      count: `${counts.farmland || 0} Properties`,
      link: "/property/propertyType/farmLand",
      className: "",
    },
    {
      icon: <MdOutlineHolidayVillage />,
      name: "Farm House",
      count: `${counts.farmhouse || 0} Properties`,
      link: "/property/propertyType/farmHouse",
      className: "",
    },
    {
      icon: <FaCity />,
      name: "Commercial",
      count: `${counts.commercial || 0} Properties`,
      link: "/property/propertyType/commercial",
      className: "",
    },
    {
      icon: <FaKey />,
      name: "For Rent",
      count: `${counts.rent || 0} Properties`,
      link: "/property/propertiesForRent",
      className: "rent-card",
    },
  ];

  // ── drag to scroll ──
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
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
      if (cards.length) {
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
          }
        );
      }
    });
    return () => ctx.revert();
  }, [counts]); // re-run animation on data change if needed

  const handleCardClick = (i, e) => {
    // Note: Do not preventDefault here, so the link actually navigates.
    setActive(i);
    gsap.fromTo(
      cardsRef.current[i],
      { scale: 0.95 },
      { scale: 1, duration: 0.3, ease: "back.out(2)" }
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
          View All
        </Link>
      </div>

      <div className="types-track-wrap" ref={trackRef}>
        <div className="types-track">
          {TYPES.map((type, i) => (
            <Link
              key={type.name}
              to={type.link}
              className={`type-card${type.className ? ` ${type.className}` : ""}${
                active === i ? " active" : ""
              }`}
              ref={(el) => (cardsRef.current[i] = el)}
              onClick={(e) => handleCardClick(i, e)}
              draggable="false"
            >
              <div className="type-icon-wrap">{type.icon}</div>
              <div className="type-name">{type.name}</div>
              <div className="type-count">{type.count}</div>
            </Link>
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
        background: #b8895a;
        color: white;
      }
    }

    &.active {
      background: #b8895a;
      border-color: #b8895a;
      .type-icon-wrap {
        background: rgba(255, 255, 255, 0.22);
        color: white;
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
        color: #c9a84c;
      }
      &:hover {
        border-color: #c9a84c;
        box-shadow: 0 10px 36px rgba(201, 168, 76, 0.18);
        .type-icon-wrap {
          background: #c9a84c;
          color: white;
        }
      }
      &.active {
        background: #c9a84c;
        border-color: #c9a84c;
      }
    }
  }

  .type-icon-wrap {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    background: #f0ebe1;
    color: #b8895a;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    transition: all 0.25s;
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
