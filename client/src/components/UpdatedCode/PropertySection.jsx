// components/PropertySection.jsx
// ─────────────────────────────────────────────────────────────────────────────
// REPLACES: RecentlyPosted, RentProperty, Suggestions, MostViewed,
//           Poshhouse, CommercialProperty, Pricedrop, Luxuaryhouse
//
// Props:
//   label        {string}   — small eyebrow label  (e.g. "New Listings")
//   title        {string}   — main heading          (e.g. "Recently")
//   titleEm      {string}   — italic highlighted word inside heading
//   viewAllLink  {string}   — href for "Sab dekhein"
//   properties   {Array}    — fetched property data (can be null = loading)
//   images       {Array}    — fetched image data    (can be null = loading)
//   emptyText    {string}   — text when no data
//   priceDrop    {boolean}  — show "Price Drop ↓" badge variant
//   bg           {string}   — background override CSS value
//
// Each property object is expected to have:
//   id, property_name, property_address, price, created_at
//   (badge type is inferred from property.listing_type: "sale" | "rent" | "featured")
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop";

function getBadge(property, priceDrop) {
  if (priceDrop) return { text: "Price Drop ↓", cls: "price-drop" };
  const t = (property.listing_type || "").toLowerCase();
  if (t === "featured") return { text: "Featured", cls: "featured" };
  if (t === "rent") return { text: "Rent", cls: "rent" };
  return { text: "Sale", cls: "" };
}

function getImageSrc(property, images) {
  if (!images) return FALLBACK_IMG;
  const match = images.find((img) => img.property_id == property.id);
  return match?.image || FALLBACK_IMG;
}

// ── skeleton placeholder ──
function SkeletonCard() {
  return (
    <div className="prop-card skeleton">
      <div className="prop-img skeleton-img" />
      <div className="prop-info">
        <div className="sk-line short" />
        <div className="sk-line long" />
        <div className="sk-line med" />
      </div>
    </div>
  );
}

export default function PropertySection({
  label = "Section",
  title = "Properties",
  titleEm = "",
  viewAllLink = "/properties",
  properties = null,
  images = null,
  emptyText = "No properties available at the moment.",
  priceDrop = false,
  bg,
}) {
  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // section title clip reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // card stagger
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              delay: (i % 4) * 0.1,
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            },
          );
        });
      }
    });

    return () => ctx.revert();
  }, [properties]);

  // tilt on mouse-move
  const handleMouseMove = (e, card) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, {
      rotateY: x * 4,
      rotateX: -y * 4,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power1.out",
    });
  };
  const handleMouseLeave = (card) => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const isLoading = properties === null || images === null;
  const hasData = properties?.data?.length > 0;

  return (
    <>
      <SectionDivider />
      <Wrapper style={bg ? { background: bg } : {}}>
        <div className="props-header">
          <div>
            <p className="section-label">{label}</p>
            <h2 className="section-title" ref={titleRef}>
              {title} {titleEm && <em>{titleEm}</em>}
            </h2>
          </div>
          <Link to={viewAllLink} className="link-arrow">
            View All
          </Link>
        </div>

        {isLoading ? (
          <div className="props-grid">
            {[1, 2, 3, 4].map((n) => (
              <SkeletonCard key={n} />
            ))}
          </div>
        ) : !hasData ? (
          <p className="empty-text">{emptyText}</p>
        ) : (
          <div className="props-grid">
            {properties.data.map((property, i) => {
              const badge = getBadge(property, priceDrop);
              const imgSrc = getImageSrc(property, images?.data);

              return (
                <div
                  key={property.id}
                  className="prop-card"
                  ref={(el) => (cardsRef.current[i] = el)}
                  style={{ opacity: 0, transform: "translateY(40px)" }}
                  onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                >
                  <Link
                    to={`/property/${property.id}`}
                    className="prop-img-link"
                  >
                    <div className="prop-img">
                      <img
                        src={imgSrc}
                        alt={property.property_name}
                        loading="lazy"
                      />
                      <span className={`prop-badge ${badge.cls}`}>
                        {badge.text}
                      </span>
                    </div>
                  </Link>
                  <div className="prop-info">
                    <div className="prop-location">
                      📍 {property.property_address}
                    </div>
                    <Link
                      to={`/property/${property.id}`}
                      className="prop-name-link"
                    >
                      <div className="prop-name">{property.property_name}</div>
                    </Link>
                    <div className="prop-footer">
                      <div className="prop-price">₹{property.price}</div>
                      <div className="prop-time">
                        {moment(property.created_at).fromNow()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Wrapper>
    </>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const SectionDivider = styled.div`
  height: 1px;
  background: #e2d9cc;
  margin: 0 8%;
`;

const Wrapper = styled.section`
  background: #faf8f3;
  padding: 80px 8%;

  &:nth-of-type(even) {
    background: #fffef9;
  }

  .props-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 40px;
    flex-wrap: wrap;
    gap: 16px;
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

  .empty-text {
    color: #9a9a94;
    font-size: 14px;
    margin-top: -16px;
  }

  /* ── property grid ── */
  .props-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }

  /* ── card ── */
  .prop-card {
    background: white;
    border: 1px solid #e2d9cc;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    transition:
      border-color 0.35s ease,
      box-shadow 0.35s ease,
      transform 0.35s ease;
    transform-style: preserve-3d;

    &:hover {
      border-color: #b8895a;
      box-shadow: 0 16px 48px rgba(184, 137, 90, 0.13);
      transform: translateY(-4px) !important;

      .prop-img img {
        transform: scale(1.06);
      }
    }
  }

  .prop-img-link {
    display: block;
  }

  .prop-img {
    height: 200px;
    overflow: hidden;
    background: #f0ebe1;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
      display: block;
    }
  }

  /* badges */
  .prop-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    background: white;
    color: #2c2c28;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 2px;
    font-weight: 500;

    &.rent {
      background: #7a8c6e;
      color: white;
    }
    &.featured {
      background: #b8895a;
      color: white;
    }
    &.price-drop {
      background: #b8895a;
      color: white;
    }
  }

  .prop-info {
    padding: 20px 22px 22px;
  }

  .prop-location {
    font-size: 12px;
    color: #9a9a94;
    letter-spacing: 0.05em;
    margin-bottom: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .prop-name-link {
    text-decoration: none;
  }

  .prop-name {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 20px;
    font-weight: 400;
    color: #2c2c28;
    margin-bottom: 12px;
    line-height: 1.2;
    text-transform: capitalize;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .prop-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f0ebe1;
    padding-top: 14px;
  }

  .prop-price {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 22px;
    font-weight: 500;
    color: #b8895a;
  }

  .prop-time {
    font-size: 11px;
    color: #9a9a94;
    letter-spacing: 0.04em;
  }

  /* ── skeleton ── */
  .skeleton {
    pointer-events: none;
    opacity: 1 !important;
    transform: none !important;
  }

  .skeleton-img {
    height: 200px;
    background: linear-gradient(90deg, #f0ebe1 25%, #faf8f3 50%, #f0ebe1 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  .sk-line {
    height: 14px;
    border-radius: 4px;
    background: linear-gradient(90deg, #f0ebe1 25%, #faf8f3 50%, #f0ebe1 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    margin-bottom: 10px;

    &.short {
      width: 40%;
    }
    &.long {
      width: 80%;
    }
    &.med {
      width: 60%;
    }
  }

  @keyframes shimmer {
    from {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @media (max-width: 600px) {
    padding: 56px 5%;
  }
`;
