import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
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

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "House", value: "house" },
  { label: "Villa", value: "villa" },
  { label: "Plot", value: "plot" },
  { label: "Flat", value: "flat" },
  { label: "Land", value: "land" },
  { label: "Farm Land", value: "farmland" },
  { label: "Farm House", value: "farmhouse" },
  { label: "Commercial", value: "commercial" },
  { label: "For Rent", value: "rent" },
];

function getBadge(property) {
  const pFor = (property.property_for || "").toLowerCase();
  const listingType = (property.listing_type || "").toLowerCase();
  if (listingType === "featured") return { text: "Featured", type: "featured" };
  if (pFor === "rent" || listingType === "rent") return { text: "For Rent", type: "rent" };
  return { text: "For Sale", type: "sale" };
}

export default function AllProperties() {
  const [properties, setProperties] = useState(null);
  const [propertiesImages, setPropertiesImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const location = useLocation();
  const canonicalUrl = getAppUrl(location.pathname);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const [propRes, imgRes] = await Promise.all([
          axios.get("/api/property/getAllProperty"),
          axios.get("/api/property/getAllPropertyImages"),
        ]);
        if (isMounted) {
          setProperties(propRes.data);
          setPropertiesImages(imgRes.data);
        }
      } catch (error) {
        console.error("Error fetching properties data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });

    return () => {
      isMounted = false;
    };
  }, []);

  const allList = useMemo(() => {
    return properties?.data || [];
  }, [properties]);

  // Category counts
  const counts = useMemo(() => {
    const c = { all: allList.length };
    CATEGORIES.forEach((cat) => {
      if (cat.value === "all") return;
      if (cat.value === "rent") {
        c[cat.value] = allList.filter(
          (p) => (p.property_for || "").toLowerCase() === "rent"
        ).length;
      } else {
        c[cat.value] = allList.filter((p) => {
          const t = (p.property_type || "").toLowerCase().replace(/\s+/g, "");
          return (
            t === cat.value &&
            (p.property_for || "").toLowerCase() !== "rent"
          );
        }).length;
      }
    });
    return c;
  }, [allList]);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let list = [...allList];

    // Category filter
    if (selectedCategory !== "all") {
      if (selectedCategory === "rent") {
        list = list.filter(
          (p) => (p.property_for || "").toLowerCase() === "rent"
        );
      } else {
        list = list.filter((p) => {
          const t = (p.property_type || "").toLowerCase().replace(/\s+/g, "");
          return (
            t === selectedCategory &&
            (p.property_for || "").toLowerCase() !== "rent"
          );
        });
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          (p.property_name || "").toLowerCase().includes(q) ||
          (p.property_address || "").toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price_asc") {
      list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sortBy === "price_desc") {
      list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else {
      // newest
      list.sort(
        (a, b) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
      );
    }

    return list;
  }, [allList, selectedCategory, searchQuery, sortBy]);

  return (
    <PageWrapper>
      <Helmet>
        <title>All Properties | Siara Properties</title>
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* ── HEADER SECTION ── */}
      <HeaderSection>
        <HeaderInner>
          <Breadcrumb>
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="current">All Properties</span>
          </Breadcrumb>

          <Eyebrow>
            <EyebrowLine />
            COMPLETE PORTFOLIO
          </Eyebrow>

          <PageTitle>
            Explore <em>All Properties</em>
          </PageTitle>

          <PageSub>
            Discover our curated portfolio of verified residential, commercial,
            and luxury properties located across Indore and prime areas.
          </PageSub>

          {!loading && (
            <CountBadge>
              <span>{filteredProperties.length}</span>{" "}
              {filteredProperties.length === 1
                ? "Property Available"
                : "Properties Available"}
            </CountBadge>
          )}
        </HeaderInner>
      </HeaderSection>

      {/* ── FILTERS BAR ── */}
      <FilterSection>
        <FilterInner>
          <CategoryScrollWrapper>
            <CategoryPills>
              {CATEGORIES.map((cat) => {
                const count = counts[cat.value] ?? 0;
                const isActive = selectedCategory === cat.value;
                return (
                  <PillButton
                    key={cat.value}
                    $active={isActive}
                    onClick={() => setSelectedCategory(cat.value)}
                  >
                    {cat.label}
                    <PillCount $active={isActive}>{count}</PillCount>
                  </PillButton>
                );
              })}
            </CategoryPills>
          </CategoryScrollWrapper>

          <ControlsRow>
            <SearchBox>
              <i className="bi bi-search" />
              <input
                type="text"
                placeholder="Search by title or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <ClearBtn onClick={() => setSearchQuery("")}>
                  <i className="bi bi-x" />
                </ClearBtn>
              )}
            </SearchBox>

            <SortSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest Listed</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </SortSelect>
          </ControlsRow>
        </FilterInner>
      </FilterSection>

      {/* ── PROPERTIES GRID ── */}
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
        ) : filteredProperties.length > 0 ? (
          <PropertyGrid>
            {filteredProperties.map((property) => {
              const matchingImages = propertiesImages?.data?.filter(
                (image) => String(image.property_id) === String(property.id)
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
                      <span className="location-text">
                        {property.property_address || "Indore, Madhya Pradesh"}
                      </span>
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
              <i className="bi bi-search" />
            </EmptyIcon>
            <EmptyTitle>No Properties Found</EmptyTitle>
            <EmptyDesc>
              No listings matched your selected filters or search query. Try
              adjusting your search or clear filters to see all properties.
            </EmptyDesc>
            <ResetBtn
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                setSortBy("newest");
              }}
            >
              Reset Filters
            </ResetBtn>
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
  padding-top: 85px;
`;

/* ── HEADER ── */
const HeaderSection = styled.header`
  background: linear-gradient(180deg, #f4ece1 0%, #faf8f3 100%);
  border-bottom: 1px solid ${BORDER};
  padding: 50px 6% 40px;
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
  max-width: 640px;
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

/* ── FILTERS BAR ── */
const FilterSection = styled.div`
  background: #ffffff;
  border-bottom: 1px solid ${BORDER};
  padding: 24px 6%;
  box-shadow: 0 4px 16px rgba(44, 44, 40, 0.02);
`;

const FilterInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CategoryScrollWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  padding-bottom: 4px;
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e0d8cc;
    border-radius: 4px;
  }
`;

const CategoryPills = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: max-content;
`;

const PillButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid ${(p) => (p.$active ? GOLD : BORDER)};
  background: ${(p) => (p.$active ? GOLD : "#fff")};
  color: ${(p) => (p.$active ? "#fff" : TEXT)};
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;

  &:hover {
    border-color: ${GOLD};
    color: ${(p) => (p.$active ? "#fff" : GOLD)};
    transform: translateY(-1px);
  }
`;

const PillCount = styled.span`
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 12px;
  background: ${(p) =>
    p.$active ? "rgba(255, 255, 255, 0.25)" : "rgba(184, 137, 90, 0.12)"};
  color: ${(p) => (p.$active ? "#fff" : GOLD_DARK)};
  font-weight: 600;
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${CREAM};
  border: 1px solid ${BORDER};
  border-radius: 10px;
  padding: 10px 16px;
  width: 100%;
  max-width: 420px;
  transition: all 0.2s;

  &:focus-within {
    border-color: ${GOLD};
    background: #fff;
    box-shadow: 0 0 0 3px rgba(184, 137, 90, 0.12);
  }

  i {
    color: ${GOLD};
    font-size: 14px;
  }

  input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 13.5px;
    font-family: inherit;
    color: ${TEXT};
    width: 100%;

    &::placeholder {
      color: #9c978b;
    }
  }
`;

const ClearBtn = styled.button`
  border: none;
  background: transparent;
  color: ${TEXT_MUTED};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 16px;
  &:hover {
    color: ${TEXT};
  }
`;

const SortSelect = styled.select`
  padding: 10px 18px;
  border: 1px solid ${BORDER};
  border-radius: 10px;
  background: ${CREAM};
  color: ${TEXT};
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  outline: none;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    border-color: ${GOLD};
    background: #fff;
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
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.12) 0%,
      transparent 40%,
      rgba(0, 0, 0, 0.4) 100%
    );
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
    background: linear-gradient(135deg, #4a6b53, #6b8e73);
    box-shadow: 0 4px 12px rgba(74, 107, 83, 0.35);
  }

  &.featured {
    background: linear-gradient(135deg, #2c2c28, #4d4d44);
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
  background: #f0ece4;
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
  color: #a39e93;
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
    font-size: 28px;
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

const ResetBtn = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 14px 32px;
  background: linear-gradient(135deg, ${TEXT}, #383832);
  color: #faf8f3 !important;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 500;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT});
    color: #fff !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(184, 137, 90, 0.3);
  }
`;
