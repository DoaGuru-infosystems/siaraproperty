import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    axios
      .get("/api/property/gallery")
      .then((response) => {
        if (active) setImages(response.data.data || []);
      })
      .catch((requestError) => {
        console.error("Error loading gallery:", requestError);
        if (active) setError("Gallery images could not be loaded. Please try again later.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <GalleryPage>
      <Helmet>
        <title>Gallery | Siara Properties</title>
        <meta
          name="description"
          content="Explore property, project, and community photos from Siara Properties in Jabalpur."
        />
      </Helmet>
      <header className="gallery-heading">
        <p className="eyebrow">SIARA PROPERTIES</p>
        <h1>Our Gallery</h1>
        <p>Explore our properties, projects, and community.</p>
      </header>

      <main className="gallery-content">
        {loading ? (
          <div className="status" role="status">Loading gallery...</div>
        ) : error ? (
          <div className="status error" role="alert">{error}</div>
        ) : images.length === 0 ? (
          <div className="status">Gallery images will be added soon.</div>
        ) : (
          <div className="gallery-grid">
            {images.map((image) => (
              <figure className="gallery-item" key={image.id}>
                <img src={image.image_url} alt={image.name} loading="lazy" />
                <figcaption>{image.name}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </main>
    </GalleryPage>
  );
}

const GalleryPage = styled.div`
  min-height: 60vh;
  padding: 120px 7% 80px;
  background: #faf8f3;
  color: #2c2c28;

  .gallery-heading {
    max-width: 760px;
    margin: 0 auto 44px;
    text-align: center;
  }

  .eyebrow {
    margin-bottom: 10px;
    color: #b8895a;
    font-size: 12px;
    letter-spacing: 0.18em;
  }

  h1 {
    margin: 0 0 12px;
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: clamp(38px, 5vw, 58px);
    font-weight: 500;
  }

  .gallery-heading > p:last-child {
    color: #7d7a71;
    font-size: 15px;
  }

  .gallery-content {
    max-width: 1280px;
    margin: 0 auto;
  }

  .status {
    padding: 70px 20px;
    color: #7d7a71;
    text-align: center;
  }

  .error {
    color: #a94442;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
  }

  .gallery-item {
    position: relative;
    overflow: hidden;
    min-height: 230px;
    margin: 0;
    background: #eae3d9;
    border-radius: 4px;
  }

  .gallery-item img {
    display: block;
    width: 100%;
    height: 300px;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  .gallery-item:hover img {
    transform: scale(1.04);
  }

  figcaption {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 28px 18px 16px;
    background: linear-gradient(transparent, rgba(20, 20, 18, 0.78));
    color: white;
    font-size: 15px;
  }

  @media (max-width: 600px) {
    padding: 105px 5% 56px;

    .gallery-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px;
    }

    .gallery-item img {
      height: 220px;
    }
  }
`;
