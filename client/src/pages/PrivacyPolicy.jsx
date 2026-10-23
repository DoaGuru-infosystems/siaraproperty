import React, { useEffect } from "react";
import styled from "styled-components";
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import {
  FaUserShield,
  FaShieldAlt,
  FaHome,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { getAppUrl } from "../config/axios";

const PrivacyPolicy = () => {
  const location = useLocation();
  const canonicalUrl = getAppUrl(location.pathname);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "section-1", label: "1. Information We Collect" },
    { id: "section-2", label: "2. How We Use Your Information" },
    { id: "section-3", label: "3. Data Security" },
    { id: "section-4", label: "4. Data Retention" },
    { id: "section-5", label: "5. Your Consent" },
    { id: "section-6", label: "6. Changes to This Privacy Policy" },
    { id: "section-7", label: "7. Contact Us" },
  ];

  return (
    <PageWrapper>
      <Helmet>
        <title>
          Privacy Policy | Siara Properties - Trusted Real Estate in Jabalpur
        </title>
        <meta
          name="description"
          content="Privacy Policy of Siara Properties. Learn how we collect, protect, and handle your personal data when buying, selling, or renting properties in Jabalpur, MP."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          property="og:title"
          content="Privacy Policy | Siara Properties - Trusted Real Estate in Jabalpur"
        />
        <meta
          property="og:description"
          content="Privacy Policy of Siara Properties. Learn how we collect, protect, and handle your personal data when buying, selling, or renting properties in Jabalpur, MP."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Siara Properties" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://siaraproperties.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Privacy Policy",
                item: "https://siaraproperties.com/privacy",
              },
            ],
          })}
        </script>
      </Helmet>

      {/* ── HERO BANNER ── */}
      <HeroBanner>
        <HeroContent>
          <BreadcrumbNav>
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="current">Privacy Policy</span>
          </BreadcrumbNav>

          <Eyebrow>
            <span className="line" />
            <span className="text">Data Protection &amp; Confidentiality</span>
            <span className="line" />
          </Eyebrow>

          <HeroTitle>
            Privacy <em>Policy</em>
          </HeroTitle>

          <HeroSubtitle>
            At Siara Properties, we value your privacy and are committed to
            protecting the personal information of everyone who visits or
            interacts with our website. This Privacy Policy explains what
            information we collect, how we use it, how we protect it, and the
            choices you have regarding your personal data. By using our website,
            you agree to the practices described in this policy.
          </HeroSubtitle>

          <MetaBadgeGroup>
            <MetaBadge>
              <FaUserShield /> Privacy Protected
            </MetaBadge>
            <MetaBadge>
              <FaShieldAlt /> Siara Properties
            </MetaBadge>
            <MetaBadge>
              <FaMapMarkerAlt /> Jabalpur, Madhya Pradesh
            </MetaBadge>
          </MetaBadgeGroup>
        </HeroContent>
      </HeroBanner>

      {/* ── MAIN CONTENT ── */}
      <MainContainer>
        <LayoutGrid>
          {/* Quick Navigation Sticky Sidebar */}
          <SidebarCol>
            <StickySidebar>
              <SidebarHeader>
                <FaUserShield className="icon" />
                <span>Table of Contents</span>
              </SidebarHeader>
              <NavList>
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </NavList>

              <SidebarSupportBox>
                <h6>Privacy Inquiries?</h6>
                <p>Have questions about how your information is handled?</p>
                <a href="tel:+919243066371" className="support-link phone">
                  <FaPhoneAlt /> +91 92430 66371
                </a>
                <a href="tel:+917000102121" className="support-link phone">
                  <FaPhoneAlt /> +91 70001 02121
                </a>
                <a
                  href="mailto:info@siaraproperties.com"
                  className="support-link email"
                >
                  <FaEnvelope /> info@siaraproperties.com
                </a>
                <a
                  href="https://wa.me/919243066371"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="support-link whatsapp"
                >
                  <FaWhatsapp /> WhatsApp Us
                </a>
              </SidebarSupportBox>
            </StickySidebar>
          </SidebarCol>

          {/* Legal Text Content */}
          <ContentCol>
            {/* Section 1 */}
            <SectionCard id="section-1">
              <SectionHeader>
                <NumberBadge>1</NumberBadge>
                <SectionTitle>Information We Collect</SectionTitle>
              </SectionHeader>
              <SectionBody>
                <p>
                  When you interact with our website — such as filling out a
                  contact form, submitting a property enquiry, requesting a
                  callback, or subscribing to updates — we may collect personal
                  details including your name, email address, phone number, and
                  any other information you choose to share with us, such as your
                  property preferences, budget range, or location requirements.
                  We only collect information that is relevant and necessary for
                  us to assist you effectively.
                </p>
              </SectionBody>
            </SectionCard>

            {/* Section 2 */}
            <SectionCard id="section-2">
              <SectionHeader>
                <NumberBadge>2</NumberBadge>
                <SectionTitle>How We Use Your Information</SectionTitle>
              </SectionHeader>
              <SectionBody>
                <p>The information we collect is used for the following purposes:</p>
                <BulletList>
                  <li>
                    To respond to your enquiries and provide accurate information
                    about properties, services, and availability.
                  </li>
                  <li>
                    To understand your requirements better and connect you with
                    suitable property options.
                  </li>
                  <li>
                    To improve our website's functionality, content, and overall
                    user experience based on how visitors interact with it.
                  </li>
                  <li>
                    To send you promotional offers, property updates, and
                    newsletters, but only if you have opted in to receive such
                    communication.
                  </li>
                  <li>
                    To comply with applicable legal, regulatory, or governmental
                    requirements, and to protect our legal rights where necessary.
                  </li>
                </BulletList>
                <HighlightNote>
                  We do not sell, rent, or trade your personal information to
                  third parties for their marketing purposes.
                </HighlightNote>
              </SectionBody>
            </SectionCard>

            {/* Section 3 */}
            <SectionCard id="section-3">
              <SectionHeader>
                <NumberBadge>3</NumberBadge>
                <SectionTitle>Data Security</SectionTitle>
              </SectionHeader>
              <SectionBody>
                <p>
                  We take reasonable and appropriate technical and organizational
                  measures to protect your personal information from unauthorized
                  access, misuse, disclosure, alteration, or destruction. Access
                  to your information is limited to authorized personnel who need
                  it to perform their work. That said, no method of data
                  transmission or storage over the internet can be guaranteed to
                  be completely secure, and while we strive to protect your
                  information, we cannot promise absolute security.
                </p>
              </SectionBody>
            </SectionCard>

            {/* Section 4 */}
            <SectionCard id="section-4">
              <SectionHeader>
                <NumberBadge>4</NumberBadge>
                <SectionTitle>Data Retention</SectionTitle>
              </SectionHeader>
              <SectionBody>
                <p>
                  We retain your personal information only for as long as it is
                  reasonably necessary to fulfil the purposes described in this
                  policy — such as responding to your enquiry or providing you
                  with requested services — or for as long as required to comply
                  with applicable legal, accounting, or reporting obligations.
                  Once this information is no longer needed, we take steps to
                  securely delete or anonymize it.
                </p>
              </SectionBody>
            </SectionCard>

            {/* Section 5 */}
            <SectionCard id="section-5">
              <SectionHeader>
                <NumberBadge>5</NumberBadge>
                <SectionTitle>Your Consent</SectionTitle>
              </SectionHeader>
              <SectionBody>
                <p>
                  By accessing and using our website, submitting your details
                  through our forms, or otherwise providing us with your personal
                  information, you consent to the collection, use, and handling
                  of that information as described in this Privacy Policy. If you
                  do not agree with any part of this policy, we would encourage
                  you not to share your personal information with us through the
                  website.
                </p>
              </SectionBody>
            </SectionCard>

            {/* Section 6 */}
            <SectionCard id="section-6">
              <SectionHeader>
                <NumberBadge>6</NumberBadge>
                <SectionTitle>Changes to This Privacy Policy</SectionTitle>
              </SectionHeader>
              <SectionBody>
                <p>
                  Siara Properties reserves the right to update, modify, or
                  revise this Privacy Policy at any time, without prior notice,
                  to reflect changes in our practices, services, or legal
                  requirements. Any changes will be posted on this page along
                  with a revised effective date, and we encourage you to review
                  this policy periodically to stay informed about how we are
                  protecting your information.
                </p>
              </SectionBody>
            </SectionCard>

            {/* Section 7 */}
            <SectionCard id="section-7">
              <SectionHeader>
                <NumberBadge>7</NumberBadge>
                <SectionTitle>Contact Us</SectionTitle>
              </SectionHeader>
              <SectionBody>
                <p>
                  If you have any questions, concerns, or requests regarding this
                  Privacy Policy or how your personal information is handled,
                  please feel free to reach out to us at:
                </p>

                <ContactCardGrid>
                  <ContactItem>
                    <div className="icon-wrapper">
                      <FaHome />
                    </div>
                    <div>
                      <span className="label">Company Name &amp; Address</span>
                      <span className="value">
                        <strong>Siara Properties</strong>
                        <br />
                        1815 Wright Town, Jabalpur,
                        <br />
                        Madhya Pradesh INDIA 482002
                      </span>
                    </div>
                  </ContactItem>

                  <ContactItem>
                    <div className="icon-wrapper">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <span className="label">Phone Numbers</span>
                      <span className="value">
                        <a href="tel:+919243066371">+91 92430 66371</a>
                        <br />
                        <a href="tel:+917000102121">+91 70001 02121</a>
                      </span>
                    </div>
                  </ContactItem>

                  <ContactItem>
                    <div className="icon-wrapper">
                      <FaEnvelope />
                    </div>
                    <div>
                      <span className="label">Email Addresses</span>
                      <span className="value">
                        <a href="mailto:info@siaraproperties.com">
                          info@siaraproperties.com
                        </a>
                        <br />
                        <a href="mailto:support@siaraproperties.com">
                          support@siaraproperties.com
                        </a>
                      </span>
                    </div>
                  </ContactItem>

                  <ContactItem>
                    <div className="icon-wrapper">
                      <FaWhatsapp />
                    </div>
                    <div>
                      <span className="label">WhatsApp Support</span>
                      <span className="value">
                        <a
                          href="https://wa.me/919243066371"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          +91 92430 66371 (Click to Chat)
                        </a>
                      </span>
                    </div>
                  </ContactItem>
                </ContactCardGrid>
              </SectionBody>
            </SectionCard>
          </ContentCol>
        </LayoutGrid>
      </MainContainer>
    </PageWrapper>
  );
};

export default PrivacyPolicy;

/* ─── STYLED COMPONENTS ───────────────────────────────────────────────────────── */

const GOLD = "#B8895A";
const GOLD_DARK = "#8C6340";
const GOLD_LIGHT = "#F5EDE3";
const CHARCOAL = "#2C2C28";
const CHARCOAL_MID = "#5A5A54";
const CREAM = "#FAF8F3";
const WARM_WHITE = "#FFFEF9";
const SAND_BORDER = "#E8E2D8";

const PageWrapper = styled.div`
  background: ${CREAM};
  color: ${CHARCOAL};
  min-height: 100vh;
  padding-top: 64px; /* fixed navbar clearance */
  font-family: "DM Sans", sans-serif;
  overflow-x: hidden;
`;

const HeroBanner = styled.section`
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(240, 235, 225, 0.95) 0%,
    rgba(250, 248, 243, 1) 100%
  );
  padding: 56px 6% 40px;
  border-bottom: 1px solid ${SAND_BORDER};
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const BreadcrumbNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
  color: ${CHARCOAL_MID};
  margin-bottom: 20px;

  a {
    color: ${GOLD_DARK};
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
    &:hover {
      color: ${GOLD};
      text-decoration: underline;
    }
  }

  .current {
    color: ${CHARCOAL_MID};
  }
`;

const Eyebrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 14px;

  .line {
    width: 32px;
    height: 1px;
    background: ${GOLD};
  }

  .text {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${GOLD};
  }
`;

const HeroTitle = styled.h1`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(2.4rem, 4.5vw, 3.8rem);
  font-weight: 400;
  color: ${CHARCOAL};
  margin: 0 0 16px;
  line-height: 1.15;

  em {
    font-style: italic;
    color: ${GOLD};
    font-weight: 500;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${CHARCOAL_MID};
  max-width: 760px;
  margin: 0 auto 28px;
`;

const MetaBadgeGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const MetaBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: ${WARM_WHITE};
  border: 1px solid ${SAND_BORDER};
  border-radius: 20px;
  font-size: 12px;
  color: ${CHARCOAL_MID};
  box-shadow: 0 2px 8px rgba(44, 44, 40, 0.04);

  svg {
    color: ${GOLD};
    font-size: 13px;
  }
`;

const MainContainer = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 6% 80px;
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 48px;
  align-items: start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const SidebarCol = styled.aside`
  @media (max-width: 992px) {
    order: 2;
  }
`;

const StickySidebar = styled.div`
  position: sticky;
  top: 90px;
  background: ${WARM_WHITE};
  border: 1px solid ${SAND_BORDER};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(44, 44, 40, 0.04);
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 20px;
  font-weight: 500;
  color: ${CHARCOAL};
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${SAND_BORDER};

  .icon {
    color: ${GOLD};
    font-size: 18px;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px;

  li {
    margin-bottom: 4px;
  }

  button {
    width: 100%;
    text-align: left;
    background: transparent;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 13px;
    color: ${CHARCOAL_MID};
    cursor: pointer;
    transition: all 0.2s ease;
    display: block;

    &:hover {
      background: ${GOLD_LIGHT};
      color: ${GOLD_DARK};
      padding-left: 16px;
    }
  }
`;

const SidebarSupportBox = styled.div`
  background: ${GOLD_LIGHT};
  border: 1px solid rgba(184, 137, 90, 0.2);
  border-radius: 8px;
  padding: 18px;

  h6 {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 18px;
    font-weight: 600;
    color: ${CHARCOAL};
    margin-bottom: 6px;
  }

  p {
    font-size: 12px;
    color: ${CHARCOAL_MID};
    line-height: 1.5;
    margin-bottom: 14px;
  }

  .support-link {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    margin-bottom: 8px;
    padding: 8px 12px;
    border-radius: 6px;
    transition: all 0.2s;

    &.phone {
      background: ${WARM_WHITE};
      color: ${CHARCOAL};
      border: 1px solid ${SAND_BORDER};
      &:hover {
        border-color: ${GOLD};
        color: ${GOLD};
      }
    }

    &.email {
      background: ${WARM_WHITE};
      color: ${CHARCOAL};
      border: 1px solid ${SAND_BORDER};
      word-break: break-all;
      &:hover {
        border-color: ${GOLD};
        color: ${GOLD};
      }
    }

    &.whatsapp {
      background: #25d366;
      color: white;
      margin-bottom: 0;
      &:hover {
        background: #1eb954;
      }
    }

    svg {
      font-size: 14px;
    }
  }
`;

const ContentCol = styled.div`
  @media (max-width: 992px) {
    order: 1;
  }
`;

const SectionCard = styled.section`
  background: ${WARM_WHITE};
  border: 1px solid ${SAND_BORDER};
  border-radius: 12px;
  padding: 32px 36px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(44, 44, 40, 0.03);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 30px rgba(44, 44, 40, 0.06);
  }

  @media (max-width: 600px) {
    padding: 24px 20px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid ${SAND_BORDER};
`;

const NumberBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: ${GOLD_LIGHT};
  color: ${GOLD_DARK};
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 18px;
  font-weight: 600;
  flex-shrink: 0;
`;

const SectionTitle = styled.h2`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(1.3rem, 2.2vw, 1.65rem);
  font-weight: 500;
  color: ${CHARCOAL};
  margin: 0;
  line-height: 1.25;
`;

const SectionBody = styled.div`
  font-size: 15px;
  line-height: 1.8;
  color: ${CHARCOAL_MID};

  p {
    margin-bottom: 14px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const BulletList = styled.ul`
  margin: 14px 0 16px 20px;
  padding: 0;

  li {
    margin-bottom: 10px;
    line-height: 1.7;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const HighlightNote = styled.div`
  margin-top: 16px;
  padding: 14px 18px;
  background: ${GOLD_LIGHT};
  border-left: 3px solid ${GOLD};
  border-radius: 0 6px 6px 0;
  font-size: 14px;
  color: ${CHARCOAL};
  font-weight: 500;
`;

const ContactCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-top: 18px;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  background: ${CREAM};
  border: 1px solid ${SAND_BORDER};
  border-radius: 8px;

  .icon-wrapper {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    background: ${GOLD_LIGHT};
    color: ${GOLD};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 16px;
  }

  .label {
    display: block;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${CHARCOAL_MID};
    margin-bottom: 4px;
  }

  .value {
    display: block;
    font-size: 13.5px;
    color: ${CHARCOAL};
    line-height: 1.6;

    a {
      color: ${CHARCOAL};
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
        color: ${GOLD};
      }
    }
  }
`;
