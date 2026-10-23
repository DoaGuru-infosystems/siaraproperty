import React, { useEffect } from "react";
import styled from "styled-components";
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import {
  FaFileContract,
  FaShieldAlt,
  FaHome,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { getAppUrl } from "../config/axios";

const TermsAndCondition = () => {
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
    { id: "section-1", label: "1. About the Information Provided" },
    { id: "section-2", label: "2. Use of the Website" },
    { id: "section-3", label: "3. No Guarantee of Transaction or Outcome" },
    { id: "section-4", label: "4. Buyer Responsibility" },
    { id: "section-5", label: "5. Intellectual Property" },
    { id: "section-6", label: "6. Third-Party Communication" },
    { id: "section-7", label: "7. Limitation of Liability" },
    { id: "section-8", label: "8. Changes to These Terms" },
    { id: "section-9", label: "9. Governing Law" },
    { id: "section-10", label: "10. Contact Us" },
  ];

  return (
    <PageWrapper>
      <Helmet>
        <title>
          Terms and Conditions | Siara Properties - Real Estate Jabalpur
        </title>
        <meta
          name="description"
          content="Terms and Conditions for Siara Properties. Guidelines on property listings, website usage, buyer responsibilities, and legal agreements in Jabalpur, MP."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          property="og:title"
          content="Terms and Conditions | Siara Properties - Real Estate Jabalpur"
        />
        <meta
          property="og:description"
          content="Terms and Conditions for Siara Properties. Guidelines on property listings, website usage, buyer responsibilities, and legal agreements in Jabalpur, MP."
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
                name: "Terms & Conditions",
                item: "https://siaraproperties.com/terms",
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
            <span className="current">Terms &amp; Conditions</span>
          </BreadcrumbNav>

          <Eyebrow>
            <span className="line" />
            <span className="text">Legal Framework</span>
            <span className="line" />
          </Eyebrow>

          <HeroTitle>
            Terms and <em>Conditions</em>
          </HeroTitle>

          <HeroSubtitle>
            Welcome to Siara Properties. These Terms and Conditions govern your
            use of our website and the services we provide. By accessing or using
            this website, you agree to comply with and be bound by the following
            terms. If you do not agree with any part of these terms, please refrain
            from using our website.
          </HeroSubtitle>

          <MetaBadgeGroup>
            <MetaBadge>
              <FaShieldAlt /> Official Terms
            </MetaBadge>
            <MetaBadge>
              <FaFileContract /> Siara Properties
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
                <FaFileContract className="icon" />
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
                <h6>Need Help?</h6>
                <p>Contact our Jabalpur real estate team directly:</p>
                <a href="tel:+919243066371" className="support-link phone">
                  <FaPhoneAlt /> +91 92430 66371
                </a>
                <a href="tel:+917000102121" className="support-link phone">
                  <FaPhoneAlt /> +91 70001 02121
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
                <SectionTitle>About the Information Provided</SectionTitle>
              </SectionHeader>
              <SectionBody>
                <p>
                  The property listings, prices, descriptions, images, and other
                  details on this website are provided for general informational
                  purposes only. While we make every effort to ensure the
                  accuracy and timeliness of the information, property
                  availability, pricing, and specifications may change without
                  prior notice. Siara Properties does not guarantee that all
                  information on the website is complete, current, or
                  error-free, and visitors are advised to verify details
                  directly with our team before making any decisions.
                </p>
              </SectionBody>
            </SectionCard>

            {/* Section 2 */}
            <SectionCard id="section-2">
              <SectionHeader>
                <NumberBadge>2</NumberBadge>
                <SectionTitle>Use of the Website</SectionTitle>
              </SectionHeader>
              <SectionBody>
                <p>
                  You agree to use this website only for lawful purposes and in a
                  manner that does not infringe upon the rights of, or restrict
                  or inhibit the use of, this website by any third party. You
                  must not misuse the website by knowingly introducing viruses,
                  malware, or any other harmful material, or by attempting to
                  gain unauthorized access to the website, its servers, or any
                  connected database.
                </p>
              </SectionBody>
            </SectionCard>

            {/* Section 3 */}
            <SectionCard id="section-3">
              <SectionHeader>
                <NumberBadge>3</NumberBadge>
                <SectionTitle>No Guarantee of Transaction or Outcome</SectionTitle>
              </SectionHeader>
              <SectionBody>
                <p>
                  Siara Properties acts as a platform to help buyers explore and
                  enquire about available properties. Browsing this website,
                  submitting an enquiry, or contacting our team does not
                  constitute a guarantee of property availability, price
                  confirmation, or the successful completion of any transaction.
                  All property transactions are subject to independent
                  verification, applicable legal processes, and mutual agreement
                  between the concerned parties.
                </p>
              </SectionBody>
            </SectionCard>

            {/* Section 4 */}
            <SectionCard id="section-4">
              <SectionHeader>
                <NumberBadge>4</NumberBadge>
                <SectionTitle>Buyer Responsibility</SectionTitle>
              </SectionHeader>
              <SectionBody>
                <p>
                  While Siara Properties assists in providing information and
                  guidance, buyers are responsible for independently verifying
                  property documents, ownership records, land titles, approvals,
                  and other legal aspects before making any purchase decision.
                  We strongly recommend consulting a qualified legal
                  professional for document verification and due diligence on
                  any property transaction.
                </p>
              </SectionBody>
            </SectionCard>

            {/* Section 5 */}
            <SectionCard id="section-5">
              <SectionHeader>
                <NumberBadge>5</NumberBadge>
                <SectionTitle>Intellectual Property</SectionTitle>
              </SectionHeader>
              <SectionBody>
                <p>
                  All content on this website — including text, images, logos,
                  graphics, and design — is the property of Siara Properties
                  unless otherwise stated, and is protected under applicable
                  intellectual property laws. You may not copy, reproduce,
                  distribute, or use any content from this website for commercial
                  purposes without our prior written consent.
                </p>
              </SectionBody>
            </SectionCard>

            {/* Section 6 */}
            <SectionCard id="section-6">
              <SectionHeader>
                <NumberBadge>6</NumberBadge>
                <SectionTitle>Third-Party Communication</SectionTitle>
              </SectionHeader>
              <SectionBody>
                <p>
                  Any enquiry, callback request, or contact form submission made
                  through this website may result in our team, or authorized
                  representatives, contacting you via phone, email, or WhatsApp
                  to assist with your property requirements. By submitting your
                  details, you consent to being contacted for this purpose.
                </p>
              </SectionBody>
            </SectionCard>

            {/* Section 7 */}
            <SectionCard id="section-7">
              <SectionHeader>
                <NumberBadge>7</NumberBadge>
                <SectionTitle>Limitation of Liability</SectionTitle>
              </SectionHeader>
              <SectionBody>
                <p>
                  Siara Properties shall not be held liable for any direct,
                  indirect, incidental, or consequential loss or damage arising
                  from the use of this website, reliance on the information
                  provided, or any property transaction undertaken based on
                  information obtained through this website. Users access and use
                  the website at their own risk.
                </p>
              </SectionBody>
            </SectionCard>

            {/* Section 8 */}
            <SectionCard id="section-8">
              <SectionHeader>
                <NumberBadge>8</NumberBadge>
                <SectionTitle>Changes to These Terms</SectionTitle>
              </SectionHeader>
              <SectionBody>
                <p>
                  Siara Properties reserves the right to update, modify, or
                  revise these Terms and Conditions at any time without prior
                  notice. Any changes will be posted on this page along with a
                  revised effective date, and continued use of the website
                  following such changes constitutes acceptance of the updated
                  terms.
                </p>
              </SectionBody>
            </SectionCard>

            {/* Section 9 */}
            <SectionCard id="section-9">
              <SectionHeader>
                <NumberBadge>9</NumberBadge>
                <SectionTitle>Governing Law</SectionTitle>
              </SectionHeader>
              <SectionBody>
                <p>
                  These Terms and Conditions shall be governed by and interpreted
                  in accordance with the laws of India, and any disputes arising
                  from the use of this website shall be subject to the
                  jurisdiction of the courts in Jabalpur, Madhya Pradesh.
                </p>
              </SectionBody>
            </SectionCard>

            {/* Section 10 */}
            <SectionCard id="section-10">
              <SectionHeader>
                <NumberBadge>10</NumberBadge>
                <SectionTitle>Contact Us</SectionTitle>
              </SectionHeader>
              <SectionBody>
                <p>
                  If you have any questions or concerns regarding these Terms and
                  Conditions, please contact us at:
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

export default TermsAndCondition;

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
