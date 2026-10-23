import React from "react";
import styled, { keyframes } from "styled-components";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const FloatingContactButtons = () => {
  const phoneNumber = "+919630811196";
  const displayPhone = "+91 96308 11196";
  const whatsappMessage = encodeURIComponent(
    "Hello Siara Properties, I would like to enquire about properties in Jabalpur."
  );

  return (
    <FloatingWrapper>
      {/* Call Button */}
      <FloatingBtn
        href={`tel:${phoneNumber}`}
        className="call-btn"
        aria-label={`Call Siara Properties at ${displayPhone}`}
      >
        <span className="tooltip">Call {displayPhone}</span>
        <FaPhoneAlt className="icon" />
      </FloatingBtn>

      {/* WhatsApp Button */}
      <FloatingBtn
        href={`https://wa.me/919630811196?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Chat with Siara Properties on WhatsApp"
      >
        <span className="tooltip">Chat on WhatsApp</span>
        <FaWhatsapp className="icon" />
      </FloatingBtn>
    </FloatingWrapper>
  );
};

export default FloatingContactButtons;

/* ─── ANIMATIONS & STYLES ─────────────────────────────────────────────────────── */

const pulseGreen = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6);
  }
  70% {
    box-shadow: 0 0 0 14px rgba(37, 211, 102, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
`;

const pulseGold = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(184, 137, 90, 0.6);
  }
  70% {
    box-shadow: 0 0 0 14px rgba(184, 137, 90, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(184, 137, 90, 0);
  }
`;

const FloatingWrapper = styled.div`
  position: fixed;
  bottom: 28px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-end;
  pointer-events: none; /* allows clicking through empty spaces */

  @media (max-width: 600px) {
    bottom: 20px;
    right: 16px;
    gap: 10px;
  }
`;

const FloatingBtn = styled.a`
  pointer-events: auto;
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff !important;
  text-decoration: none !important;
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;

  .icon {
    font-size: 24px;
    transition: transform 0.2s ease;
  }

  /* Tooltip for desktop */
  .tooltip {
    position: absolute;
    right: calc(100% + 12px);
    top: 50%;
    transform: translateY(-50%) translateX(10px);
    background: rgba(30, 30, 27, 0.95);
    color: #ffffff;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-family: "DM Sans", sans-serif;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all 0.2s ease;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);

    &::after {
      content: "";
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent transparent rgba(30, 30, 27, 0.95);
    }
  }

  &:hover {
    transform: scale(1.1);

    .icon {
      transform: scale(1.1);
    }

    .tooltip {
      opacity: 1;
      transform: translateY(-50%) translateX(0);
    }
  }

  /* WhatsApp Theme */
  &.whatsapp-btn {
    background: #25d366;
    box-shadow: 0 4px 16px rgba(37, 211, 102, 0.45);
    animation: ${pulseGreen} 2.5s infinite;

    &:hover {
      background: #20ba5a;
      box-shadow: 0 6px 22px rgba(37, 211, 102, 0.65);
    }
  }

  /* Call Theme */
  &.call-btn {
    background: #b8895a;
    box-shadow: 0 4px 16px rgba(184, 137, 90, 0.45);
    animation: ${pulseGold} 2.5s infinite 1.25s;

    &:hover {
      background: #9e7246;
      box-shadow: 0 6px 22px rgba(184, 137, 90, 0.65);
    }
  }

  @media (max-width: 600px) {
    width: 46px;
    height: 46px;

    .icon {
      font-size: 21px;
    }

    .tooltip {
      display: none; /* Hide tooltips on mobile devices */
    }
  }
`;
