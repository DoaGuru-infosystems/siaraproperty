// components/MarqueeStrip.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Dark charcoal banner with infinite scrolling property-type labels
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import styled from "styled-components";

const ITEMS = [
  "House",
  "Villa",
  "Plot",
  "Flat",
  "Farm Land",
  "Farm House",
  "Commercial",
  "Property for Rent",
];

export default function MarqueeStrip() {
  // Duplicate for seamless loop
  const allItems = [...ITEMS, ...ITEMS];

  return (
    <Strip>
      <div className="marquee-track">
        {allItems.map((item, i) => (
          <div className="marquee-item" key={i}>
            {item}
            <div className="marquee-dot" />
          </div>
        ))}
      </div>
    </Strip>
  );
}

const Strip = styled.div`
  background: #2c2c28;
  padding: 20px 0;
  overflow: hidden;

  .marquee-track {
    display: flex;
    gap: 0;
    animation: marquee 30s linear infinite;
    width: max-content;
  }

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  .marquee-item {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 0 40px;
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 18px;
    font-weight: 300;
    font-style: italic;
    color: rgba(255, 255, 255, 0.4);
    white-space: nowrap;
  }

  .marquee-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #b8895a;
    flex-shrink: 0;
  }
`;
