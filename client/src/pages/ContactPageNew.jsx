import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/UpdatedCode/Navbar";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── COMPONENT ── */
export default function ContactPageNew() {
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  /* ── GSAP & Smooth Scroll ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Header Animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      );
    }

    // Info Cards Animation
    if (infoRef.current) {
      const infoItems = infoRef.current.children;
      gsap.fromTo(
        infoItems,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
          },
        }
      );
    }

    // Form Animation
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
          },
        }
      );
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* ── Form Logic ── */
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email is required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone))
      e.phone = "Valid 10-digit mobile number is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
  };

  return (
    <PageWrapper ref={pageRef}>
      <Navbar />

      <PageContent>
        {/* Decorative elements */}
        <BgPattern />
        <GlowBlob />

        <HeaderSection ref={headerRef}>
          <Eyebrow>
            <EyebrowLine />
            Get In Touch
          </Eyebrow>
          <PageTitle>
            We are here <em>for you</em>
          </PageTitle>
        </HeaderSection>

        <MainGrid>
          {/* LEFT — Contact Info */}
          <ContactInfoSide ref={infoRef}>
            <ContactNote>
              <strong>
                Ready to buy, sell, or discuss your property requirements?
              </strong>
              <span>Get in touch with our team today.</span>
            </ContactNote>

            <InfoCard>
              <InfoIconBox>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </InfoIconBox>
              <InfoDetails>
                <InfoLabel>Office Address</InfoLabel>
                <InfoValue>
                  <strong>Siara Properties</strong>
                  1815 Wright Town, Jabalpur,
                  <br />
                  Madhya Pradesh INDIA 482002
                </InfoValue>
              </InfoDetails>
            </InfoCard>

            <InfoCard>
              <InfoIconBox>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </InfoIconBox>
              <InfoDetails>
                <InfoLabel>Phone Number</InfoLabel>
                <InfoValue>
                  <InfoLink href="tel:+919243066371">+91 9243066371</InfoLink>
                  <br />
                  <InfoLink href="tel:+917000102121">+91 7000102121</InfoLink>
                </InfoValue>
              </InfoDetails>
            </InfoCard>

            <InfoCard>
              <InfoIconBox>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </InfoIconBox>
              <InfoDetails>
                <InfoLabel>Email Address</InfoLabel>
                <InfoValue>
                  <InfoLink href="mailto:info@siaraproperties.com">
                    info@siaraproperties.com
                  </InfoLink>
                  <br />
                  <InfoLink href="mailto:support@siaraproperties.com">
                    support@siaraproperties.com
                  </InfoLink>
                </InfoValue>
              </InfoDetails>
            </InfoCard>

            <InfoCard>
              <InfoIconBox>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </InfoIconBox>
              <InfoDetails>
                <InfoLabel>Business Hours</InfoLabel>
                <InfoValue>
                  Monday – Saturday <br />
                  10:00 AM – 7:00 PM
                </InfoValue>
              </InfoDetails>
            </InfoCard>

            <DividerLine />
            <Tagline>
              Trusted Properties. Transparent Deals
              <br />
              Value for Every Investment.
            </Tagline>
          </ContactInfoSide>

          {/* RIGHT — Form */}
          <FormSide ref={formRef}>
            <FormContainer>
              {sent ? (
                <SuccessState>
                  <SuccessIcon>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </SuccessIcon>
                  <SuccessTitle>
                    Message <em>Sent!</em>
                  </SuccessTitle>
                  <SuccessDesc>
                    Thank you for reaching out. Our team will get back to you
                    shortly to assist with your requirements.
                  </SuccessDesc>
                  <BackButton onClick={() => setSent(false)}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="16"
                      height="16"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Send Another Message
                  </BackButton>
                </SuccessState>
              ) : (
                <StyledForm onSubmit={handleSubmit} noValidate>
                  <FormRow>
                    <FormGroup>
                      <Label>Full Name</Label>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={errors.name ? "error" : ""}
                      />
                      {errors.name && <ErrorText>{errors.name}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                      <Label>Phone Number</Label>
                      <Input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className={errors.phone ? "error" : ""}
                      />
                      {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && <ErrorText>{errors.email}</ErrorText>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Your Message</Label>
                    <TextArea
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className={errors.message ? "error" : ""}
                    />
                    {errors.message && (
                      <ErrorText>{errors.message}</ErrorText>
                    )}
                  </FormGroup>

                  <SubmitButton type="submit" disabled={loading}>
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </SubmitButton>
                </StyledForm>
              )}
            </FormContainer>
          </FormSide>
        </MainGrid>
      </PageContent>
    </PageWrapper>
  );
}

/* ─────────────────────────────────────────── STYLES ── */

const GOLD = "#b8895a";
const GOLD_LIGHT = "#d4a96a";
const CREAM = "#faf8f3";
const TEXT = "#2c2c28";
const MUTED = "#5a5a54";
const BORDER = "#e2ddd4";

/* Animations */
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

/* Layout */
const PageWrapper = styled.div`
  overflow-x: hidden;
  background: ${CREAM};
  min-height: 100vh;
`;

const PageContent = styled.main`
  position: relative;
  padding: 140px 6% 100px;
  max-width: 1280px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 120px 6% 80px;
  }
`;

const BgPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(184, 137, 90, 0.08) 1px,
    transparent 0
  );
  background-size: 32px 32px;
  pointer-events: none;
  z-index: 0;
`;

const GlowBlob = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(184, 137, 90, 0.08) 0%, transparent 60%);
  top: 10%;
  right: -200px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: ${float} 6s ease-in-out infinite;
`;

/* Header */
const HeaderSection = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  margin-bottom: 72px;
`;

const EyebrowLine = styled.span`
  display: inline-block;
  width: 36px;
  height: 1px;
  background: ${GOLD};
`;

const Eyebrow = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0 0 16px;
  color: ${GOLD};
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;

  &::after {
    content: "";
    width: 36px;
    height: 1px;
    background: ${GOLD};
  }
`;

const PageTitle = styled.h2`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(2.4rem, 4.5vw, 3.8rem);
  font-weight: 300;
  color: ${TEXT};
  margin: 0;
  line-height: 1.1;

  em {
    color: ${GOLD};
    font-style: italic;
  }
`;

/* Grid */
const MainGrid = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 64px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 56px;
  }
`;

/* Contact Info Side */
const ContactInfoSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ContactNote = styled.div`
  margin-bottom: 32px;
  padding-left: 20px;
  border-left: 3px solid ${GOLD};

  strong {
    display: block;
    font-size: 18px;
    color: ${TEXT};
    font-weight: 500;
    line-height: 1.4;
    margin-bottom: 8px;
  }

  span {
    display: block;
    color: ${MUTED};
    font-size: 15px;
    line-height: 1.6;
  }
`;

const InfoCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 24px 0;
  border-bottom: 1px solid ${BORDER};

  &:last-of-type {
    border-bottom: none;
  }
`;

const InfoIconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(184, 137, 90, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;

  svg {
    width: 22px;
    height: 22px;
    color: ${GOLD};
    transition: all 0.3s ease;
  }

  ${InfoCard}:hover & {
    background: linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT});
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(184, 137, 90, 0.2);
    
    svg {
      color: #fff;
    }
  }
`;

const InfoDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${GOLD};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const InfoValue = styled.div`
  color: ${MUTED};
  font-size: 15px;
  line-height: 1.6;

  strong {
    display: block;
    color: ${TEXT};
    font-weight: 500;
    margin-bottom: 2px;
  }
`;

const InfoLink = styled.a`
  color: ${MUTED};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${GOLD};
  }
`;

const DividerLine = styled.div`
  width: 40px;
  height: 2px;
  background: ${GOLD};
  border-radius: 2px;
  margin: 36px 0 24px;
`;

const Tagline = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.4rem;
  font-weight: 300;
  color: ${MUTED};
  line-height: 1.5;
  font-style: italic;
  margin: 0;
`;

/* Form Side */
const FormSide = styled.div`
  width: 100%;
`;

const FormContainer = styled.div`
  background: #fff;
  border: 1px solid ${BORDER};
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: 0 20px 60px rgba(44, 44, 40, 0.05);

  @media (max-width: 600px) {
    padding: 36px 24px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 11px;
  font-weight: 600;
  color: #888880;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const InputBase = styled.input`
  width: 100%;
  padding: 14px 18px;
  border: 1px solid ${BORDER};
  border-radius: 10px;
  background: ${CREAM};
  color: ${TEXT};
  font-family: "DM Sans", sans-serif;
  font-size: 14.5px;
  outline: none;
  transition: all 0.25s ease;

  &::placeholder {
    color: #b0aa9c;
  }

  &:focus {
    background: #fff;
    border-color: ${GOLD};
    box-shadow: 0 0 0 3px rgba(184, 137, 90, 0.12);
  }

  &.error {
    border-color: #e05252;
    background: #fffaf9;
  }
`;

const Input = styled(InputBase)``;

const TextArea = styled(InputBase).attrs({ as: "textarea" })`
  height: 140px;
  resize: none;
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: #e05252;
  margin-top: 2px;
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  margin-top: 12px;
  padding: 16px 32px;
  background: linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT});
  color: #fff;
  border: none;
  border-radius: 10px;
  font-family: "Jost", sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(184, 137, 90, 0.25);

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(184, 137, 90, 0.35);

    svg {
      transform: translateX(4px) translateY(-4px);
    }
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    background: #dcd6cb;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

/* Success State */
const SuccessState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 0;
  min-height: 380px;
`;

const SuccessIcon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(184, 137, 90, 0.15), rgba(184, 137, 90, 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: ${GOLD};

  svg {
    width: 32px;
    height: 32px;
  }
`;

const SuccessTitle = styled.h3`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 2.2rem;
  font-weight: 400;
  color: ${TEXT};
  margin: 0 0 12px;

  em {
    color: ${GOLD};
    font-style: italic;
  }
`;

const SuccessDesc = styled.p`
  color: ${MUTED};
  font-size: 15px;
  line-height: 1.7;
  max-width: 320px;
  margin: 0 0 32px;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: ${GOLD};
  font-family: "DM Sans", sans-serif;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    color: ${GOLD_LIGHT};
    
    svg {
      transform: translateX(-4px);
    }
  }
`;
