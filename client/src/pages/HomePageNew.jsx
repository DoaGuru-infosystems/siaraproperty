// pages/Homepage.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Redesigned homepage using the newSiaraProperties design system.
//
// Child component mapping (old → new):
//   Banner + Search              → <Hero />
//   RecentlyPosted               → <PropertySection label="New Listings"     title="Recently" titleEm="Posted" />
//   RentProperty                 → <PropertySection label="For Rent"         title="Rent"     titleEm="Properties" />
//   Suggestions                  → <PropertySection label="Suggestions"      title="You May"  titleEm="Like" />
//   MostViewed                   → <PropertySection label="Trending"         title="Most"     titleEm="Viewed" />
//   Poshhouse                    → <PropertySection label="Premium Collection" title="Posh"   titleEm="House" />
//   CommercialProperty           → <PropertySection label="Business Spaces"  title="Commercial" titleEm="Properties" />
//   Pricedrop                    → <PropertySection label="Best Deals"       title="Price"    titleEm="Drop"  priceDrop />
//   Luxuaryhouse                 → <PropertySection label="Elite Living"     title="Luxury"   titleEm="House" />
//
// Each section makes its OWN API call via the useSectionData hook so the
// original API surface is unchanged. Just update the endpoint strings below.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../components/UpdatedCode/Navbar";
import Hero from "../components/UpdatedCode/Hero";
import MarqueeStrip from "../components/UpdatedCode/MarqueeStrip";
import WelcomeSection from "../components/UpdatedCode/WelcomeSection";
import PropertyTypes from "../components/UpdatedCode/PropertyTypes";
import StatsStrip from "../components/UpdatedCode/StatsStrip";
import PropertySection from "../components/UpdatedCode/PropertySection";
// import Footer from "../components/UpdatedCode/Footer";

import axios from "axios";
import useLenis from "../hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

// ── shared images (used across all sections) ──
function useAllImages() {
  const [images, setImages] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/property/getAllPropertyImages")
      .then((r) => setImages(r.data))
      .catch(() => setImages({ data: [] }));
  }, []);
  return images;
}

// ── per-section data hook ──
function useSectionData(endpoint) {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:4000${endpoint}`)
      .then((r) => setData(r.data))
      .catch(() => setData({ data: [] }));
  }, [endpoint]);
  return data;
}

export default function HomePageNew() {
  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  // Initialize Lenis smooth scroll
  useLenis();

  // Analytics + scroll-to-top
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    window.scrollTo(0, 0);
  }, []);

  // Scroll reveal animation for elements with class '.reveal'
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  // ── shared images ──
  const images = useAllImages();

  // ── individual section data ──
  const recentlyPosted = useSectionData(
    "/api/property/getRecentlyPostedProperties",
  );
  const rentProperties = useSectionData("/api/property/getRentProperties");
  const suggestions = useSectionData("/api/property/getSuggestions");
  const mostViewed = useSectionData("/api/property/getMostViewedProperties");
  const poshHouse = useSectionData("/api/property/getPoshHouseProperties");
  const commercial = useSectionData("/api/property/getCommercialProperties");
  const priceDrop = useSectionData("/api/property/getPriceDropProperties");
  const luxuryHouse = useSectionData("/api/property/getLuxuaryHouseProperties");

  return (
    <Wrapper>
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
        {/* Google Fonts for the new design */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* ── NAVIGATION ── */}
      <Navbar />

      {/* ── HERO (Banner + Search) ── */}
      <Hero />

      {/* ── MARQUEE ── */}
      <MarqueeStrip />

      {/* ── WELCOME SECTION ── */}
      <WelcomeSection />

      {/* ── EXPLORE PROPERTY TYPES ── */}
      <PropertyTypes />

      {/* ── STATS ── */}
      <StatsStrip />

      {/* ── PROPERTY SECTIONS ── */}
      <PropertySection
        label="New Listings"
        title="Recently"
        titleEm="Posted"
        viewAllLink="/properties?filter=recent"
        properties={recentlyPosted}
        images={images}
      />

      <PropertySection
        label="For Rent"
        title="Rent"
        titleEm="Properties"
        viewAllLink="/properties?type=rent"
        properties={rentProperties}
        images={images}
      />

      <PropertySection
        label="Suggested for You"
        title="You May"
        titleEm="Like"
        viewAllLink="/properties?filter=suggested"
        properties={suggestions}
        images={images}
      />

      <PropertySection
        label="Trending"
        title="Most"
        titleEm="Viewed"
        viewAllLink="/properties?filter=mostviewed"
        properties={mostViewed}
        images={images}
      />

      <PropertySection
        label="Premium Collection"
        title="Posh"
        titleEm="House"
        viewAllLink="/properties?filter=posh"
        properties={poshHouse}
        images={images}
        emptyText="Abhi koi posh properties available nahi hain."
      />

      <PropertySection
        label="Business Spaces"
        title="Commercial"
        titleEm="Properties"
        viewAllLink="/properties?type=commercial"
        properties={commercial}
        images={images}
        emptyText="Abhi koi commercial properties available nahi hain."
      />

      <PropertySection
        label="Best Deals"
        title="Price"
        titleEm="Drop"
        viewAllLink="/properties?filter=pricedrop"
        properties={priceDrop}
        images={images}
        priceDrop={true}
        bg="var(--terra-light, #F5EDE3)"
      />

      <PropertySection
        label="Elite Living"
        title="Luxury"
        titleEm="House"
        viewAllLink="/properties?filter=luxury"
        properties={luxuryHouse}
        images={images}
        emptyText="Abhi koi luxury houses available nahi hain."
      />

      {/* ── FOOTER ──
      <Footer /> */}
    </Wrapper>
  );
}

// ─── GLOBAL STYLES for this page ─────────────────────────────────────────────
const Wrapper = styled.div`
  /* push content below fixed navbar */
  padding-top: 64px;

  /* CSS variables available to all children */
  --cream: #faf8f3;
  --warm-white: #fffef9;
  --sand: #f0ebe1;
  --sand-dark: #e2d9cc;
  --terra: #b8895a;
  --terra-dark: #8c6340;
  --terra-light: #f5ede3;
  --sage: #7a8c6e;
  --charcoal: #2c2c28;
  --charcoal-mid: #5a5a54;
  --charcoal-light: #9a9a94;
  --gold: #c9a84c;
  --gold-light: #f7f0dc;

  font-family: "DM Sans", sans-serif;
  background: var(--cream);
  color: var(--charcoal);

  /* scroll-reveal base class used by GSAP */
  .reveal {
    opacity: 0;
    transform: translateY(32px);
  }
`;
