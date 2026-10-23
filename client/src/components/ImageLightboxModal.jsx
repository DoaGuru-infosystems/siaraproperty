import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

const ImageLightboxModal = ({
  isOpen,
  onClose,
  images = [],
  currentIndex = 0,
  setCurrentIndex,
}) => {
  const total = images.length;

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total, setCurrentIndex]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total, setCurrentIndex]);

  // Keyboard navigation (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Lock body scroll when lightbox is active
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!isOpen || total === 0) return null;

  const currentImage = images[currentIndex]?.image || images[currentIndex];

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      handleNext(); // Swiped left -> next
    } else if (touchEndX - touchStartX > 50) {
      handlePrev(); // Swiped right -> prev
    }
  };

  return (
    <Overlay
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar */}
      <HeaderBar onClick={(e) => e.stopPropagation()}>
        <Counter>
          Photo {currentIndex + 1} of {total}
        </Counter>
        <CloseBtn
          onClick={onClose}
          aria-label="Close photo gallery"
          type="button"
        >
          <FaTimes />
        </CloseBtn>
      </HeaderBar>

      {/* Main Viewport Container */}
      <MainStage onClick={(e) => e.stopPropagation()}>
        {total > 1 && (
          <NavBtn
            className="prev"
            onClick={handlePrev}
            aria-label="Previous image"
            type="button"
          >
            <FaChevronLeft />
          </NavBtn>
        )}

        <ImageWrapper>
          <img
            key={currentIndex}
            src={currentImage}
            alt={`Property slide ${currentIndex + 1}`}
            className="lightbox-image"
          />
        </ImageWrapper>

        {total > 1 && (
          <NavBtn
            className="next"
            onClick={handleNext}
            aria-label="Next image"
            type="button"
          >
            <FaChevronRight />
          </NavBtn>
        )}
      </MainStage>

      {/* Bottom Thumbnail Strip */}
      {total > 1 && (
        <ThumbnailStrip onClick={(e) => e.stopPropagation()}>
          {images.map((item, idx) => {
            const thumbSrc = item?.image || item;
            return (
              <ThumbBtn
                key={item?.id || idx}
                $isActive={idx === currentIndex}
                onClick={() => setCurrentIndex(idx)}
                type="button"
                aria-label={`Jump to photo ${idx + 1}`}
              >
                <img src={thumbSrc} alt={`Thumbnail ${idx + 1}`} />
              </ThumbBtn>
            );
          })}
        </ThumbnailStrip>
      )}
    </Overlay>
  );
};

export default ImageLightboxModal;

/* ─── STYLED COMPONENTS ───────────────────────────────────────────────────────── */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(15, 15, 15, 0.94);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 20px 24px;
  animation: fadeIn 0.25s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  z-index: 2;
  padding-bottom: 8px;
`;

const Counter = styled.span`
  color: #f0ebe1;
  font-family: "DM Sans", sans-serif;
  font-size: 14px;
  letter-spacing: 0.05em;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.1);
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

const CloseBtn = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #b8895a;
    border-color: #b8895a;
    transform: scale(1.08);
  }
`;

const MainStage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  min-height: 0; /* allows child images to shrink properly in flex */
`;

const NavBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(30, 30, 30, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }

  &:hover {
    background: #b8895a;
    border-color: #b8895a;
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
    font-size: 15px;
    background: rgba(30, 30, 30, 0.85);
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 88vw;
  max-height: 72vh;
  margin: 0 auto;

  .lightbox-image {
    max-width: 100%;
    max-height: 72vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    user-select: none;
    animation: zoomIn 0.25s ease-out;
  }

  @keyframes zoomIn {
    from {
      opacity: 0.6;
      transform: scale(0.97);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (max-width: 768px) {
    max-width: 95vw;
    max-height: 65vh;

    .lightbox-image {
      max-height: 65vh;
    }
  }
`;

const ThumbnailStrip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  overflow-x: auto;
  padding: 12px 10px 4px;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;

const ThumbBtn = styled.button`
  background: transparent;
  border: 2px solid
    ${({ $isActive }) => ($isActive ? "#b8895a" : "transparent")};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.45)};
  padding: 0;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  width: 60px;
  height: 45px;
  transition: all 0.2s ease;
  transform: ${({ $isActive }) => ($isActive ? "scale(1.05)" : "scale(1)")};

  &:hover {
    opacity: 1;
    border-color: #b8895a;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;
