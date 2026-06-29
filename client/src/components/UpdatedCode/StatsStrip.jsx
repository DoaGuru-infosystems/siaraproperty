// components/StatsStrip.jsx

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { target: 500, label: "Properties Listed" },
  { target: 1200, label: "Happy Families" },
  { target: 8, label: "Years of Trust" },
  { target: 15, label: "Areas Covered" },
];

export default function StatsStrip() {
  const numsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      numsRef.current.forEach((el, i) => {
        if (!el) return;
        const target = STATS[i].target;

        // Plain object — GSAP tweens this, onUpdate writes to DOM manually
        const counter = { val: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              val: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.round(counter.val) + "+";
              },
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <StatsSection>
      <div className="stats-grid">
        {STATS.map((stat, i) => (
          <div className="stat-item" key={stat.label}>
            <div className="stat-num" ref={(el) => (numsRef.current[i] = el)}>
              0+
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </StatsSection>
  );
}

const StatsSection = styled.div`
  background: #b8895a;
  padding: 64px 8%;

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 48px;

    @media (max-width: 600px) {
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }
  }

  .stat-item {
    text-align: center;
  }

  .stat-num {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: clamp(2.4rem, 4vw, 3.5rem);
    font-weight: 300;
    color: white;
    line-height: 1;
    margin-bottom: 8px;
  }

  .stat-label {
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.65);
  }
`;
