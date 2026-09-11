import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import moment from "moment";
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet";
import { getAppUrl } from "../config/axios";

const GOLD = "#B8895A";
const GOLD_LIGHT = "#C99D6F";
const GOLD_DARK = "#8C6340";
const CREAM = "#FAF8F3";
const TEXT = "#2C2C28";
const TEXT_MUTED = "#7D7A71";
const BORDER = "#EAE3D9";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop";

function formatPropertyType(type = "") {
  const map = {
    house: "Houses",
    villa: "Villas",
    plot: "Plots",
    flat: "Flats",
    land: "Lands",
    farmland: "Farm Lands",
    farmLand: "Farm Lands",
    farmhouse: "Farm Houses",
    farmHouse: "Farm Houses",
    commercial: "Commercial Properties",
    rent: "Rental Properties",
  };
  return (
    map[type.toLowerCase()] ||
    `${type.charAt(0).toUpperCase() + type.slice(1)} Properties`
  );
}

function getBadge(property) {
  const pFor = (property.property_for || "").toLowerCase();
  const listingType = (property.listing_type || "").toLowerCase();
  if (listingType === "featured") return { text: "Featured", type: "featured" };
  if (pFor === "rent" || listingType === "rent") return { text: "For Rent", type: "rent" };
  return { text: "For Sale", type: "sale" };
}

export default function PropertyType() {
  const [properties, setProperties] = useState(null);
  const [propertiesImages, setPropertiesImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const { propertyType } = useParams();
  const location = useLocation();
  const canonicalUrl = getAppUrl(location.pathname);

  const displayTitle = formatPropertyType(propertyType);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const [propRes, imgRes] = await Promise.all([
          axios.get(`/api/property/getPropertyByType/${propertyType}`),
          axios.get("/api/property/getAllPropertyImages"),
        ]);
        if (isMounted) {
          setProperties(propRes.data);
          setPropertiesImages(imgRes.data);
        }
      } catch (error) {
        console.error("Error fetching property data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });

    return () => {
      isMounted = false;
    };
  }, [propertyType, location.pathname]);

  const propertyList = properties?.data || [];
  const hasData = propertyList.length > 0;

  return (
    <PageWrapper>
      <Helmet>
        <title>{`Available ${displayTitle} | Siara Properties`}</title>
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* ── HEADER BANNER ── */}
      <HeaderSection>
        <HeaderInner>
          <Breadcrumb>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <span className="current">{displayTitle}</span>
          </Breadcrumb>

          <Eyebrow>
            <EyebrowLine />
            CURATED COLLECTION
          </Eyebrow>

          <PageTitle>
            Available <em>{displayTitle}</em>
          </PageTitle>

          <PageSub>
            Explore our handpicked collection of legally verified {propertyType}s in prime locations with complete transparency.
          </PageSub>

          {!loading && (
            <CountBadge>
              <span>{propertyList.length}</span> {propertyList.length === 1 ? "Property Available" : "Properties Available"}
            </CountBadge>
          )}
        </HeaderInner>
      </HeaderSection>

      {/* ── CONTENT SECTION ── */}
      <ContentSection>
        {loading ? (
          <PropertyGrid>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <SkeletonCard key={n}>
                <div className="sk-img" />
                <div className="sk-body">
                  <div className="sk-line sk-short" />
                  <div className="sk-line sk-long" />
                  <div className="sk-divider" />
                  <div className="sk-line sk-price" />
                </div>
              </SkeletonCard>
            ))}
          </PropertyGrid>
        ) : hasData ? (
          <PropertyGrid>
            {propertyList.map((property) => {
              const matchingImages = propertiesImages?.data?.filter(
                (image) => String(image.property_id) === String(property.id),
              );
              const imageSrc =
                matchingImages && matchingImages.length > 0
                  ? matchingImages[0].image
                  : FALLBACK_IMG;

              const badge = getBadge(property);

              return (
                <PropertyCard
                  key={property.id}
                  to={`/property/${property.id}`}
                >
                  <CardImageWrapper>
                    <img
                      src={imageSrc}
                      alt={property.property_name}
                      loading="lazy"
                    />
                    <CardBadge className={badge.type}>{badge.text}</CardBadge>
                  </CardImageWrapper>

                  <CardContent>
                    <PropertyLocation>
                      <span className="pin-icon">📍</span>
                      <span className="location-text">{property.property_address || "Indore, Madhya Pradesh"}</span>
                    </PropertyLocation>

                    <PropertyName>{property.property_name}</PropertyName>

                    <CardDivider />

                    <CardFooter>
                      <PriceWrap>
                        <PriceLabel>Price</PriceLabel>
                        <PriceValue>₹{property.price}</PriceValue>
                      </PriceWrap>

                      <TimeText>
                        {moment(property.created_at).fromNow()}
                      </TimeText>
                    </CardFooter>
                  </CardContent>
                </PropertyCard>
              );
            })}
          </PropertyGrid>
        ) : (
          <EmptyState>
            <EmptyIcon>
              <i className="bi bi-house-door" />
            </EmptyIcon>
            <EmptyTitle>No {displayTitle} Available</EmptyTitle>
            <EmptyDesc>
              We currently do not have any listings available under this category. Please check back soon or browse all our available properties.
            </EmptyDesc>
            <EmptyActions>
              <PrimaryBtn to="/properties">
                Browse All Properties
              </PrimaryBtn>
              <SecondaryBtn to="/contact">
                Contact Our Team
              </SecondaryBtn>
            </EmptyActions>
          </EmptyState>
        )}
      </ContentSection>
    </PageWrapper>
  );
}

/* ─── STYLED COMPONENTS ─── */

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${CREAM};
  font-family: "Jost", -apple-system, BlinkMacSystemFont, sans-serif;
  color: ${TEXT};
  padding-top: 85px; /* Spacing for fixed navbar */
`;

/* ── HEADER ── */
const HeaderSection = styled.header`
  background: linear-gradient(180deg, #F4ECE1 0%, #FAF8F3 100%);
  border-bottom: 1px solid ${BORDER};
  padding: 50px 6% 45px;
`;

const HeaderInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${TEXT_MUTED};
  margin-bottom: 24px;

  a {
    color: ${TEXT_MUTED};
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: ${GOLD};
    }
  }

  span {
    color: #c4beaf;
  }

  .current {
    color: ${GOLD_DARK};
    font-weight: 500;
  }
`;

const Eyebrow = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${GOLD};
  font-weight: 600;
  margin-bottom: 14px;
`;

const EyebrowLine = styled.span`
  width: 28px;
  height: 1px;
  background: ${GOLD};
  display: inline-block;
`;

const PageTitle = styled.h1`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(2.4rem, 4.5vw, 3.8rem);
  font-weight: 300;
  color: ${TEXT};
  line-height: 1.15;
  margin: 0 0 14px;

  em {
    font-style: italic;
    color: ${GOLD};
    font-weight: 400;
  }
`;

const PageSub = styled.p`
  font-size: 15px;
  color: ${TEXT_MUTED};
  max-width: 620px;
  line-height: 1.7;
  margin: 0 0 24px;
`;

const CountBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 18px;
  background: rgba(184, 137, 90, 0.09);
  border: 1px solid rgba(184, 137, 90, 0.22);
  border-radius: 20px;
  font-size: 13px;
  color: ${GOLD_DARK};
  font-weight: 500;

  span {
    font-weight: 700;
    color: ${GOLD};
  }
`;

/* ── GRID CONTENT ── */
const ContentSection = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 50px 6% 90px;
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 32px;

  @media (max-width: 440px) {
    grid-template-columns: 1fr;
  }
`;

/* ── PROPERTY CARD ── */
const PropertyCard = styled(Link)`
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid ${BORDER};
  overflow: hidden;
  text-decoration: none !important;
  color: inherit;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 18px rgba(44, 44, 40, 0.03);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 48px rgba(184, 137, 90, 0.18);
    border-color: rgba(184, 137, 90, 0.45);

    img {
      transform: scale(1.08);
    }
  }
`;

const CardImageWrapper = styled.div`
  height: 235px;
  position: relative;
  overflow: hidden;
  background: #ede7dd;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, transparent 40%, rgba(0, 0, 0, 0.4) 100%);
    pointer-events: none;
  }
`;

const CardBadge = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 20px;
  color: #fff;
  backdrop-filter: blur(8px);

  &.sale {
    background: linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT});
    box-shadow: 0 4px 12px rgba(184, 137, 90, 0.35);
  }

  &.rent {
    background: linear-gradient(135deg, #4A6B53, #6B8E73);
    box-shadow: 0 4px 12px rgba(74, 107, 83, 0.35);
  }

  &.featured {
    background: linear-gradient(135deg, #2C2C28, #4D4D44);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

const CardContent = styled.div`
  padding: 24px 22px 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const PropertyLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${TEXT_MUTED};
  margin-bottom: 8px;

  .pin-icon {
    font-size: 12px;
  }

  .location-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const PropertyName = styled.h3`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${TEXT};
  line-height: 1.25;
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s ease;

  ${PropertyCard}:hover & {
    color: ${GOLD};
  }
`;

const CardDivider = styled.div`
  height: 1px;
  background: #F0ECE4;
  margin-top: auto;
  margin-bottom: 16px;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const PriceWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceLabel = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: ${TEXT_MUTED};
  margin-bottom: 2px;
`;

const PriceValue = styled.span`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.45rem;
  font-weight: 700;
  color: ${GOLD};
  line-height: 1;
`;

const TimeText = styled.span`
  font-size: 11.5px;
  color: #A39E93;
`;

/* ── SKELETON LOADER ── */
const SkeletonCard = styled.div`
  background: #fff;
  border-radius: 18px;
  border: 1px solid ${BORDER};
  overflow: hidden;

  .sk-img {
    height: 235px;
    background: linear-gradient(90deg, #f0ebe2 25%, #f8f4ec 50%, #f0ebe2 75%);
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
  }

  .sk-body {
    padding: 24px 22px;
  }

  .sk-line {
    background: linear-gradient(90deg, #f0ebe2 25%, #f8f4ec 50%, #f0ebe2 75%);
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
    border-radius: 4px;
    height: 14px;
    margin-bottom: 12px;
  }

  .sk-short {
    width: 40%;
  }

  .sk-long {
    width: 80%;
    height: 20px;
  }

  .sk-divider {
    height: 1px;
    background: #f0ebe2;
    margin: 16px 0;
  }

  .sk-price {
    width: 50%;
    height: 22px;
    margin-bottom: 0;
  }
`;

/* ── EMPTY STATE ── */
const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  max-width: 540px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid ${BORDER};
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(44, 44, 40, 0.04);
`;

const EmptyIcon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(184, 137, 90, 0.1);
  color: ${GOLD};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;

  i {
    font-size: 32px;
  }
`;

const EmptyTitle = styled.h3`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.8rem;
  font-weight: 500;
  color: ${TEXT};
  margin: 0 0 12px;
`;

const EmptyDesc = styled.p`
  font-size: 14.5px;
  color: ${TEXT_MUTED};
  line-height: 1.7;
  margin: 0 0 32px;
`;

const EmptyActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  background: linear-gradient(135deg, ${TEXT}, #383832);
  color: #FAF8F3 !important;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 500;
  text-decoration: none !important;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT});
    color: #fff !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(184, 137, 90, 0.3);
  }
`;

const SecondaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  background: transparent;
  color: ${TEXT} !important;
  border: 1px solid ${BORDER};
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 500;
  text-decoration: none !important;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${GOLD};
    color: ${GOLD} !important;
    background: rgba(184, 137, 90, 0.05);
    transform: translateY(-2px);
  }
`;
