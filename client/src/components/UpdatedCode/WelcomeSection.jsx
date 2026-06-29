import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WelcomeSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fade-up",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
      
      // Image scale effect
      gsap.fromTo(
        ".image-scale",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef}>
      <GridContainer>
        <TextContent>
          <Eyebrow className="fade-up">About Us</Eyebrow>
          <Title className="fade-up">
            Welcome to <em>SIARA Properties</em>
          </Title>

          <ContentWrapper>
            <Paragraph className="fade-up">
              At SIARA Properties, we believe that real estate is more than just
              buying and selling land—it's about building trust, securing futures,
              and helping people make the right decisions for one of the most
              important investments of their lives.
            </Paragraph>
            <Paragraph className="fade-up">
              Serving the Mahakaushal region and nearby areas of Jabalpur, we are
              committed to providing genuine property solutions backed by
              transparency, integrity, and value for money.
            </Paragraph>
            <Paragraph className="fade-up" $highlight>
              Whether you're looking to purchase your dream property or sell your
              existing asset with confidence, SIARA Properties stands beside you at
              every step of the journey.
            </Paragraph>
          </ContentWrapper>
        </TextContent>

        <ImageContent>
          <ImageWrapper className="image-scale">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
              alt="Premium Villa" 
            />
            <ExperienceBadge className="fade-up">
              <span className="number">10+</span>
              <span className="text">Years of<br/>Trust</span>
            </ExperienceBadge>
          </ImageWrapper>
        </ImageContent>
      </GridContainer>
    </Section>
  );
}

const Section = styled.section`
  padding: 120px 8%;
  background: var(--cream, #faf8f3);
  position: relative;
  overflow: hidden;

  @media (max-width: 968px) {
    padding: 80px 6%;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 64px;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Eyebrow = styled.p`
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--terra, #b8895a);
  font-weight: 500;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: "";
    width: 40px;
    height: 1px;
    background: var(--terra, #b8895a);
    display: inline-block;
  }
`;

const Title = styled.h2`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(2.8rem, 4.5vw, 4.2rem);
  font-weight: 300;
  color: var(--charcoal, #2c2c28);
  margin-bottom: 40px;
  line-height: 1.1;

  em {
    font-style: italic;
    color: var(--terra, #b8895a);
  }

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Paragraph = styled.p`
  font-family: "DM Sans", sans-serif;
  font-size: ${(props) => (props.$highlight ? "18px" : "16px")};
  line-height: 1.8;
  color: ${(props) => (props.$highlight ? "var(--charcoal, #2c2c28)" : "var(--charcoal-mid, #5a5a54)")};
  font-weight: ${(props) => (props.$highlight ? "500" : "400")};
  font-style: ${(props) => (props.$highlight ? "italic" : "normal")};
  border-left: ${(props) => (props.$highlight ? "3px solid var(--terra, #b8895a)" : "none")};
  padding-left: ${(props) => (props.$highlight ? "20px" : "0")};

  @media (max-width: 768px) {
    font-size: ${(props) => (props.$highlight ? "16px" : "15px")};
  }
`;

const ImageContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 520px;
  aspect-ratio: 4/5;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(44, 44, 40, 0.1);
  margin-left: auto;

  @media (max-width: 968px) {
    margin: 0 auto;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ExperienceBadge = styled.div`
  position: absolute;
  bottom: 32px;
  left: -40px;
  background: var(--terra, #b8895a);
  color: white;
  border-radius: 50%;
  width: 140px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 16px 32px rgba(184, 137, 90, 0.4);
  z-index: 2;

  /* Added a subtle spinning border effect */
  &::before {
    content: '';
    position: absolute;
    inset: 8px;
    border: 1px dashed rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    animation: spin 20s linear infinite;
  }

  @keyframes spin {
    100% { transform: rotate(360deg); }
  }

  .number {
    font-family: "Cormorant Garamond", serif;
    font-size: 42px;
    line-height: 1;
    margin-bottom: 4px;
    font-weight: 400;
  }

  .text {
    font-family: "DM Sans", sans-serif;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-align: center;
    line-height: 1.4;
    font-weight: 500;
  }

  @media (max-width: 968px) {
    bottom: 24px;
    left: 24px;
    width: 110px;
    height: 110px;
    
    .number { font-size: 32px; }
    .text { font-size: 10px; }
  }
`;
