import React, { useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── DATA ── */
const buyingServices = [
  {
    title: "Property Requirement Analysis",
    desc: "We understand your needs, preferences, and budget before recommending options.",
  },
  {
    title: "Verified Property Recommendations",
    desc: "Only legally verified and quality-checked properties make it to your shortlist.",
  },
  {
    title: "Site Visit Coordination",
    desc: "We schedule and accompany you on property visits for a seamless experience.",
  },
  {
    title: "Documentation Guidance",
    desc: "End-to-end support with paperwork, agreements, and registrations.",
  },
  {
    title: "Price Negotiation Support",
    desc: "We negotiate on your behalf to ensure you get the best deal.",
  },
  {
    title: "End-to-End Buying Assistance",
    desc: "From search to possession — we handle everything.",
  },
];

const sellingServices = [
  {
    title: "Property Evaluation Guidance",
    desc: "Get an accurate market valuation based on location, condition, and trends.",
  },
  {
    title: "Buyer Matching",
    desc: "We connect you with pre-verified, genuine buyers quickly.",
  },
  {
    title: "Property Promotion",
    desc: "Multi-channel marketing to give your property maximum visibility.",
  },
  {
    title: "Inquiry Management",
    desc: "We filter and manage all buyer inquiries so you don't have to.",
  },
  {
    title: "Negotiation Support",
    desc: "Expert negotiation to help you get the right price.",
  },
  {
    title: "Transaction Coordination",
    desc: "Smooth, transparent, hassle-free transaction management.",
  },
];

const areas = [
  {
    icon: "🏙️",
    name: "Jabalpur",
    sub: "Primary Market",
    desc: "Our headquarters and primary area of operations across all major localities.",
  },
  {
    icon: "🗺️",
    name: "Mahakaushal Region",
    sub: "Regional Coverage",
    desc: "Extended services across the broader Mahakaushal region for wider reach.",
  },
  {
    icon: "📍",
    name: "Nearby Localities",
    sub: "Towns & Areas",
    desc: "Coverage of surrounding towns and developing areas with growth potential.",
  },
];

const stats = [
  { value: 500, suffix: "+", label: "Properties Sold" },
  { value: 1200, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

/* ── COMPONENT ── */
export default function ServicesPage() {
  const pageRef = useRef(null);
  const bannerTextRef = useRef(null);
  const statsRef = useRef(null);
  const servicesRef = useRef(null);
  const areasRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    /* ── Lenis Smooth Scroll ── */
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      syncTouch: true,
      touchMultiplier: 1.5,
    });

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    /* ── Banner entrance animation ── */
    const bannerTl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 });
    if (bannerTextRef.current) {
      const textChildren = bannerTextRef.current.children;
      gsap.set(textChildren, { y: 50, opacity: 0 });
      bannerTl.to(textChildren, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
      });
    }

    /* ── Hero parallax on banner image ── */
    const bannerImg = pageRef.current?.querySelector('img[loading="eager"]');
    if (bannerImg) {
      gsap.to(bannerImg, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: bannerImg.closest("section"),
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    /* ── Scroll hint fade ── */
    const scrollHint = pageRef.current?.querySelector(".scroll-hint");
    if (scrollHint) {
      gsap.to(scrollHint, { opacity: 1, duration: 0.6, delay: 1.5 });
    }

    /* ── Stats counter animation ── */
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        }
      );

      const numberElements = statsRef.current.querySelectorAll('.stat-number');
      numberElements.forEach((el) => {
        const targetValue = parseInt(el.getAttribute('data-target'), 10);
        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 2.2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
            }
          }
        );
      });
    }

    /* ── Generic reveal animation (for .reveal class) ── */
    pageRef.current?.querySelectorAll(".reveal").forEach((el) => {
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
        }
      );
    });

    /* ── Clip-path reveal for section titles ── */
    pageRef.current?.querySelectorAll(".clip-r").forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    /* ── Services Section Animation ── */
    if (servicesRef.current) {
      const header = servicesRef.current.querySelector("[data-anim='header']");
      if (header) {
        gsap.fromTo(
          header.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
            },
          }
        );
      }

      const cards = servicesRef.current.querySelectorAll("[data-anim='card']");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            delay: i * 0.18,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
          }
        );

        const items = card.querySelectorAll("[data-anim='item']");
        gsap.fromTo(
          items,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
            },
          }
        );
      });
    }

    /* ── Areas Section Animation ── */
    if (areasRef.current) {
      const areaHeader = areasRef.current.querySelector("[data-anim='header']");
      if (areaHeader) {
        gsap.fromTo(
          areaHeader.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: areaHeader,
              start: "top 85%",
            },
          }
        );
      }

      const areaCards = areasRef.current.querySelectorAll("[data-anim='area-card']");
      areaCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
          }
        );
      });
    }

    /* ── CTA Animation ── */
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          },
        }
      );
    }

    /* ── Smooth scroll anchors ── */
    document.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const id = link.getAttribute("href");
        if (id.length > 1) {
          lenis.scrollTo(id, {
            duration: 1.4,
            easing: (t) => 1 - Math.pow(1 - t, 4),
          });
        } else {
          lenis.scrollTo(0, { duration: 1.4 });
        }
      });
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <PageWrapper ref={pageRef}>
      

      {/* ── BANNER ── */}
      <Banner>
        <BannerBgImage
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80"
          alt="Luxury property"
          loading="eager"
        />
        <BannerOverlay />
        <BannerPattern />

        <BannerInner>
          <BannerTextSide ref={bannerTextRef}>
            <Eyebrow>
              <EyebrowLine />
             
Siara Properties
            </Eyebrow>

            <BannerTitle>
             Where Trust Meets
              <br />
              <BannerTitleGold>Real Estate</BannerTitleGold>
            </BannerTitle>

            <BannerSub>
              Building trust through every property deal buy smart, sell
              confidently. Your dream property is just one step away.
            </BannerSub>

            <BannerCta href="#services">
              Explore Services
              <CtaArrow>→</CtaArrow>
            </BannerCta>
          </BannerTextSide>
        </BannerInner>

        <FloatingBadge>
          <BadgeIcon>✦</BadgeIcon>
          <BadgeText>
            <span>Premium</span>
            <small>Properties</small>
          </BadgeText>
        </FloatingBadge>

        <ScrollHint className="scroll-hint">
          Scroll
          <ScrollLine />
        </ScrollHint>
      </Banner>

      <Divider />

      {/* ── STATS BAR ── */}
      <StatsBar ref={statsRef}>
        {stats.map((s) => (
          <StatItem key={s.label}>
            <StatNumber>
              <span className="stat-number" data-target={s.value}>0</span>{s.suffix}
            </StatNumber>
            <StatLabel>{s.label}</StatLabel>
          </StatItem>
        ))}
      </StatsBar>

      {/* ── SERVICES ── */}
      <ServicesSection id="services" ref={servicesRef}>
        <SectionHeader data-anim="header">
          <Eyebrow className="reveal">
            <EyebrowLine />
            What We Offer
          </Eyebrow>
          <SectionTitle className="clip-r">
            Our <SectionTitleGold>Services</SectionTitleGold>
          </SectionTitle>
          <SectionDesc className="reveal">
            We provide end-to-end real estate assistance with honesty,
            professionalism, and a commitment to lasting relationships.
          </SectionDesc>
        </SectionHeader>

        <ServiceGrid>
          {/* Buying Card */}
          <ServiceCard data-anim="card">
            <CardHeader>
              <CardIconBox>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
                  <path d="M9 21V12h6v9" />
                </svg>
              </CardIconBox>
              <CardBadge>Buyers</CardBadge>
            </CardHeader>
            <CardTitle>Property Buying Assistance</CardTitle>
            <CardBody>
              Finding the right property requires experience, local knowledge,
              and trustworthy guidance. We help buyers identify suitable options
              based on their requirements, budget, and long-term goals.
            </CardBody>
            <ServiceList>
              {buyingServices.map((s) => (
                <ServiceItem key={s.title} data-anim="item">
                  <ServiceItemDot />
                  <ServiceItemContent>
                    <ServiceItemTitle>{s.title}</ServiceItemTitle>
                    <ServiceItemDesc>{s.desc}</ServiceItemDesc>
                  </ServiceItemContent>
                </ServiceItem>
              ))}
            </ServiceList>
          </ServiceCard>

          {/* Selling Card */}
          <ServiceCard data-anim="card">
            <CardHeader>
              <CardIconBox>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12H3l9-9 9 9h-2" />
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <circle cx="19" cy="7" r="3" />
                  <path d="M17.5 7h3M19 5.5v3" />
                </svg>
              </CardIconBox>
              <CardBadge>Sellers</CardBadge>
            </CardHeader>
            <CardTitle>Property Selling Assistance</CardTitle>
            <CardBody>
              Selling a property should be efficient, transparent, and
              profitable. Our team helps property owners connect with genuine
              buyers while ensuring smooth transactions.
            </CardBody>
            <ServiceList>
              {sellingServices.map((s) => (
                <ServiceItem key={s.title} data-anim="item">
                  <ServiceItemDot />
                  <ServiceItemContent>
                    <ServiceItemTitle>{s.title}</ServiceItemTitle>
                    <ServiceItemDesc>{s.desc}</ServiceItemDesc>
                  </ServiceItemContent>
                </ServiceItem>
              ))}
            </ServiceList>
          </ServiceCard>
        </ServiceGrid>
      </ServicesSection>

      <Divider />

      {/* ── AREAS ── */}
      <AreasSection ref={areasRef}>
        <SectionHeader data-anim="header">
          <Eyebrow dark className="reveal">
            <EyebrowLine />
            Where We Work
          </Eyebrow>
          <SectionTitle dark className="clip-r">
            Areas We <SectionTitleGold>Serve</SectionTitleGold>
          </SectionTitle>
          <SectionDesc dark className="reveal">
            We proudly serve clients across Jabalpur and the wider Mahakaushal
            region. If you are looking for reliable real estate guidance in and
            around Jabalpur, SIARA Properties is here to assist you.
          </SectionDesc>
        </SectionHeader>

        <AreasGrid>
          {areas.map((a) => (
            <AreaCard key={a.name} data-anim="area-card">
              <AreaIconWrap>
                <AreaEmoji>{a.icon}</AreaEmoji>
              </AreaIconWrap>
              <AreaTag>{a.sub}</AreaTag>
              <AreaName>{a.name}</AreaName>
              <AreaDesc>{a.desc}</AreaDesc>
              <AreaDivider />
            </AreaCard>
          ))}
        </AreasGrid>
      </AreasSection>

      {/* ── CTA ── */}
      <CtaSection ref={ctaRef}>
        <CtaContent>
          <CtaTitle>
            Ready to find your <SectionTitleGold>perfect property</SectionTitleGold>?
          </CtaTitle>
          <CtaSub>
            Let's talk. Our team is ready to help you make the right move.
          </CtaSub>
          <CtaButton href="/contact">
            Contact Us Today
            <CtaArrow>→</CtaArrow>
          </CtaButton>
        </CtaContent>
      </CtaSection>
    </PageWrapper>
  );
}

/* ─────────────────────────────────────────── STYLES ── */

const GOLD = "#b8895a";
const GOLD_LIGHT = "#d4a96a";
const CREAM = "#faf8f3";
const DARK = "#1a1a16";
const DARK_2 = "#242420";
const TEXT = "#2c2c28";
const MUTED = "#6a6a62";
const BORDER = "#e2ddd4";

/* Animations */
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
`;

/* Page */
const PageWrapper = styled.div`
  overflow-x: hidden;
  background: ${CREAM};
`;

/* ── BANNER ── */
const Banner = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0;
`;

const BannerBgImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  z-index: 0;
  transition: transform 8s ease;
  animation: bannerZoom 20s ease-in-out infinite alternate;

  @keyframes bannerZoom {
    0% { transform: scale(1); }
    100% { transform: scale(1.08); }
  }
`;

const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(20, 18, 14, 0.92) 0%,
    rgba(20, 18, 14, 0.78) 35%,
    rgba(20, 18, 14, 0.45) 65%,
    rgba(20, 18, 14, 0.15) 100%
  );
  pointer-events: none;

  @media (max-width: 768px) {
    background: linear-gradient(
      180deg,
      rgba(20, 18, 14, 0.7) 0%,
      rgba(20, 18, 14, 0.85) 100%
    );
  }
`;

const BannerPattern = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(184, 137, 90, 0.04) 1px,
    transparent 0
  );
  background-size: 40px 40px;
  pointer-events: none;
`;

const BannerInner = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1340px;
  margin: 0 auto;
  padding: 140px 6% 80px;

  @media (max-width: 768px) {
    padding: 120px 6% 60px;
    text-align: center;
  }
`;

const BannerTextSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 620px;

  @media (max-width: 768px) {
    align-items: center;
    max-width: 100%;
  }
`;

const FloatingBadge = styled.div`
  position: absolute;
  bottom: 36px;
  right: 36px;
  z-index: 4;
  background: rgba(26, 26, 22, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(184, 137, 90, 0.3);
  border-radius: 14px;
  padding: 14px 22px;
  display: flex;
  align-items: center;
  gap: 14px;
  animation: ${float} 3s ease-in-out infinite;

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
`;

const BadgeIcon = styled.span`
  color: ${GOLD};
  font-size: 20px;
`;

const BadgeText = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: #f5f0e8;
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.2;
  }

  small {
    color: ${GOLD};
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
`;

const BannerTitle = styled.h1`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 300;
  color: #f5f0e8;
  line-height: 1.18;
  margin: 0 0 24px;
`;

const BannerTitleGold = styled.em`
  color: ${GOLD};
  font-style: italic;
`;

const BannerSub = styled.p`
  color: #b0aa9c;
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.02em;
  max-width: 460px;
  margin: 0 0 36px;
  line-height: 1.85;
`;

const CtaArrow = styled.span`
  display: inline-block;
  transition: transform 0.3s ease;
  margin-left: 8px;
`;

const BannerCta = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 14px 32px;
  background: linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT});
  color: #fff;
  font-family: "Jost", sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(184, 137, 90, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(184, 137, 90, 0.4);

    ${CtaArrow} {
      transform: translateX(4px);
    }
  }
`;

/* ── Eyebrow ── */
const EyebrowLine = styled.span`
  display: inline-block;
  width: 36px;
  height: 1px;
  background: ${GOLD};
`;

const Eyebrow = styled.p`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 16px;
  color: ${GOLD};
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
`;

/* ── STATS BAR ── */
const StatsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: linear-gradient(135deg, ${GOLD}, #a07444);
  padding: 0;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatItem = styled.div`
  padding: 32px 20px;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.15);
  transition: background 0.3s ease;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  @media (max-width: 640px) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);

    &:nth-child(even) {
      border-right: none;
    }
  }
`;

const StatNumber = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 400;
  color: #fff;
  margin: 0 0 4px;
  line-height: 1;
`;

const StatLabel = styled.p`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 0;
`;

/* ── SERVICES SECTION ── */
const SectionHeader = styled.div`
  margin-bottom: 48px;
`;

const SectionTitle = styled.h2`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  color: ${(p) => (p.dark ? "#f5f0e8" : TEXT)};
  margin: 0 0 12px;
  line-height: 1.15;
`;

const SectionTitleGold = styled.em`
  color: ${GOLD};
  font-style: italic;
`;

const SectionDesc = styled.p`
  max-width: 560px;
  color: ${(p) => (p.dark ? "#b0aa9c" : MUTED)};
  font-size: 15px;
  line-height: 1.8;
  margin: 0;
`;

const ServicesSection = styled.section`
  padding: 80px 6%;
  max-width: 1280px;
  margin: 0 auto;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 32px;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  padding: 40px 36px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid ${BORDER};
  transition: all 0.4s ease;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
    border-color: rgba(184, 137, 90, 0.3);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const CardIconBox = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(184, 137, 90, 0.1), rgba(184, 137, 90, 0.05));
  border: 1px solid rgba(184, 137, 90, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${GOLD};
  transition: all 0.3s ease;

  ${ServiceCard}:hover & {
    background: linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT});
    color: #fff;
    transform: scale(1.05);
  }
`;

const CardBadge = styled.span`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${GOLD};
  background: rgba(184, 137, 90, 0.08);
  border: 1px solid rgba(184, 137, 90, 0.15);
  padding: 6px 14px;
  border-radius: 20px;
`;

const CardTitle = styled.h3`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.6rem;
  font-weight: 500;
  color: ${TEXT};
  margin: 0 0 14px;
`;

const CardBody = styled.p`
  color: ${MUTED};
  font-size: 14px;
  line-height: 1.8;
  margin: 0 0 28px;
`;

const ServiceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const ServiceItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid #f0ece4;
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    padding-left: 6px;
  }
`;

const ServiceItemDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${GOLD};
  margin-top: 8px;
  flex-shrink: 0;
  transition: all 0.3s ease;

  ${ServiceItem}:hover & {
    transform: scale(1.5);
    box-shadow: 0 0 8px rgba(184, 137, 90, 0.4);
  }
`;

const ServiceItemContent = styled.div``;

const ServiceItemTitle = styled.p`
  color: ${TEXT};
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 3px;
  line-height: 1.4;
`;

const ServiceItemDesc = styled.p`
  color: #9a9a90;
  font-size: 12.5px;
  margin: 0;
  line-height: 1.6;
`;

/* ── AREAS SECTION ── */
const AreasSection = styled.section`
  padding: 80px 6%;
  background: linear-gradient(180deg, ${DARK} 0%, ${DARK_2} 100%);
`;

const AreasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
  max-width: 1280px;
  margin: 0 auto;
`;

const AreaCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(184, 137, 90, 0.12);
  border-radius: 16px;
  padding: 36px 28px;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, transparent, ${GOLD}, transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(184, 137, 90, 0.3);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);

    &::before {
      opacity: 1;
    }
  }
`;

const AreaIconWrap = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(184, 137, 90, 0.1);
  border: 1px solid rgba(184, 137, 90, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
  transition: all 0.3s ease;

  ${AreaCard}:hover & {
    transform: scale(1.08);
    background: rgba(184, 137, 90, 0.18);
  }
`;

const AreaEmoji = styled.span`
  font-size: 28px;
`;

const AreaTag = styled.p`
  font-size: 10px;
  color: ${GOLD};
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin: 0 0 10px;
  font-weight: 500;
`;

const AreaName = styled.h3`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: #f5f0e8;
  margin: 0 0 12px;
`;

const AreaDesc = styled.p`
  font-size: 13px;
  color: #8a8880;
  line-height: 1.7;
  margin: 0 0 20px;
`;

const AreaDivider = styled.div`
  width: 40px;
  height: 1px;
  background: rgba(184, 137, 90, 0.3);
  margin: 0 auto;
`;

/* ── CTA SECTION ── */
const CtaSection = styled.section`
  padding: 80px 6%;
  background: linear-gradient(135deg, #f5efe4 0%, #ede5d5 50%, #f0e9db 100%);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(184, 137, 90, 0.08), transparent 70%);
    top: -150px;
    right: -100px;
    pointer-events: none;
  }
`;

const CtaContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto;
`;

const CtaTitle = styled.h2`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(1.6rem, 3.5vw, 2.6rem);
  font-weight: 300;
  color: ${TEXT};
  margin: 0 0 14px;
  line-height: 1.2;
`;

const CtaSub = styled.p`
  color: ${MUTED};
  font-size: 15px;
  line-height: 1.7;
  margin: 0 0 32px;
`;

const CtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 16px 40px;
  background: linear-gradient(135deg, ${DARK}, #333328);
  color: #f5f0e8;
  font-family: "Jost", sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
    background: linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT});
    color: #fff;

    ${CtaArrow} {
      transform: translateX(4px);
    }
  }
`;

/* ── SCROLL HINT ── */
const scanAnim = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
`;

const ScrollHint = styled.div`
  position: absolute;
  bottom: 28px;
  right: 8%;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  opacity: 0;
`;

const ScrollLine = styled.div`
  width: 40px;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: ${GOLD};
    animation: ${scanAnim} 1.8s ease-in-out infinite;
  }
`;

/* ── DIVIDER ── */
const Divider = styled.div`
  height: 1px;
  background: ${BORDER};
  margin: 0 8%;
`;
