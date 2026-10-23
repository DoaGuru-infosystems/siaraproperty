import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaTimes,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaHome,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";
import logo from "../images/siaralogo1.jpeg";

const AutoPopupModal = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "Buy Flat / House",
    message: "",
  });
  const [errors, setErrors] = useState({});

  // 3-second timer after page opens
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};

    // 1. Name validation (required)
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // 2. Phone validation (required, 10 digits)
    const cleanPhone = formData.phone.trim().replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    // 3. Email validation (OPTIONAL: if filled, must be valid format)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email.trim() && !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@example.com)";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhoneChange = (e) => {
    // Only allow numbers, max 10 digits
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: val }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in valid details in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim() || "",
        phone: formData.phone.trim(),
        propertyType: formData.propertyType,
        message: formData.message.trim() || "Interested in property consultation in Jabalpur.",
      };

      const res = await axios.post("/api/property/popup-lead", payload);

      if (res.data?.success) {
        toast.success(
          "Thank you! Your enquiry has been received. Our Jabalpur property expert will call you shortly."
        );
        setIsOpen(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          propertyType: "Buy Flat / House",
          message: "",
        });
      } else {
        toast.error(res.data?.message || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      console.error("Popup submit error:", err);
      toast.error(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Failed to submit enquiry. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={() => setIsOpen(false)}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <CloseButton
          onClick={() => setIsOpen(false)}
          type="button"
          aria-label="Close modal"
        >
          <FaTimes />
        </CloseButton>

        {/* Modal Header with Logo */}
        <ModalHeader>
          <LogoBadgeWrapper>
            <LogoImage src={logo} alt="Siara Properties" />
            <BrandBadge>
              <FaShieldAlt /> SIARA PROPERTIES · JABALPUR
            </BrandBadge>
          </LogoBadgeWrapper>
          <ModalTitle>
            Looking for your <em>Dream Property?</em>
          </ModalTitle>
          <ModalSubtitle>
            Connect with our verified real estate specialists. Get genuine
            listings, best deals, and instant assistance across Jabalpur.
          </ModalSubtitle>
        </ModalHeader>

        {/* Modal Form */}
        <Form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <FormGroup>
            <Label>
              <FaUser className="input-icon" /> Full Name *
            </Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              $hasError={!!errors.name}
              required
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </FormGroup>

          {/* Contact Row (Phone & Email) */}
          <FormRow>
            {/* Phone */}
            <FormGroup>
              <Label>
                <FaPhoneAlt className="input-icon" /> Phone Number *
              </Label>
              <PhoneInputWrapper $hasError={!!errors.phone}>
                <span className="country-code">+91</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit mobile"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  maxLength={10}
                  required
                />
              </PhoneInputWrapper>
              {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
            </FormGroup>

            {/* Email - OPTIONAL */}
            <FormGroup>
              <Label>
                <FaEnvelope className="input-icon" /> Email Address{" "}
                <OptionalTag>(Optional)</OptionalTag>
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="name@example.com (optional)"
                value={formData.email}
                onChange={handleChange}
                $hasError={!!errors.email}
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </FormGroup>
          </FormRow>

          {/* Property Type Interest */}
          <FormGroup>
            <Label>
              <FaHome className="input-icon" /> Interested In
            </Label>
            <Select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
            >
              <option value="Buy Flat / House">Buy Flat / Apartment / House</option>
              <option value="Buy Plot / Land">Buy Residential Plot / Land</option>
              <option value="Commercial Property">Commercial Office / Shop</option>
              <option value="Rent a Property">Looking to Rent a House / Flat</option>
              <option value="Sell / Rent My Property">I want to Sell or Rent out my property</option>
              <option value="Agricultural / Farm Land">Farm Land / Farm House</option>
            </Select>
          </FormGroup>

          {/* Optional Message */}
          <FormGroup>
            <Label>Specific Requirement (Optional)</Label>
            <TextArea
              name="message"
              placeholder="Budget range, preferred locality (e.g. Wright Town, Tilhari, Vijay Nagar)..."
              value={formData.message}
              onChange={handleChange}
              rows={2}
            />
          </FormGroup>

          {/* Submit Button */}
          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Get Free Property Consultation →"}
          </SubmitButton>

          {/* Trust Guarantees */}
          <TrustBar>
            <span>
              <FaCheckCircle className="check-icon" /> 100% Verified Listings
            </span>
            <span>
              <FaCheckCircle className="check-icon" /> No Spam Guarantee
            </span>
          </TrustBar>
        </Form>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default AutoPopupModal;

/* ─── STYLED COMPONENTS ───────────────────────────────────────────────────────── */

const GOLD = "#B8895A";
const GOLD_DARK = "#8C6340";
const CHARCOAL = "#2C2C28";
const CHARCOAL_MID = "#5A5A54";
const CREAM = "#FAF8F3";
const WARM_WHITE = "#FFFEF9";
const SAND_BORDER = "#E8E2D8";

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99998;
  background: rgba(20, 20, 18, 0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  position: relative;
  background: ${WARM_WHITE};
  border: 1px solid ${SAND_BORDER};
  border-radius: 16px;
  width: 100%;
  max-width: 540px;
  max-height: 94vh;
  overflow-y: auto;
  padding: 32px 32px 24px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.35);
  font-family: "DM Sans", sans-serif;
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @keyframes popIn {
    from {
      opacity: 0;
      transform: scale(0.92) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @media (max-width: 600px) {
    padding: 24px 18px 18px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${CREAM};
  border: 1px solid ${SAND_BORDER};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${CHARCOAL_MID};
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    background: #e2d9cc;
    color: ${CHARCOAL};
    transform: rotate(90deg);
  }
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const LogoBadgeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const LogoImage = styled.img`
  height: 54px;
  width: auto;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  border: 1px solid ${SAND_BORDER};
  background: #ffffff;
  padding: 2px;
`;

const BrandBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${GOLD_DARK};
  font-weight: 600;
  background: #f5ede3;
  padding: 4px 12px;
  border-radius: 20px;

  svg {
    font-size: 10px;
    color: ${GOLD};
  }
`;

const ModalTitle = styled.h3`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(1.6rem, 3.2vw, 2.1rem);
  font-weight: 500;
  color: ${CHARCOAL};
  margin: 0 0 6px;
  line-height: 1.2;

  em {
    font-style: italic;
    color: ${GOLD};
    font-weight: 600;
  }
`;

const ModalSubtitle = styled.p`
  font-size: 12.5px;
  line-height: 1.5;
  color: ${CHARCOAL_MID};
  margin: 0 auto;
  max-width: 440px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 13px;
  }
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: ${CHARCOAL};
  display: flex;
  align-items: center;
  gap: 6px;

  .input-icon {
    color: ${GOLD};
    font-size: 11px;
  }
`;

const OptionalTag = styled.span`
  font-size: 11px;
  font-weight: 400;
  color: #8c8a82;
  margin-left: 2px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid
    ${({ $hasError }) => ($hasError ? "#e53e3e" : SAND_BORDER)};
  background: ${CREAM};
  font-family: "DM Sans", sans-serif;
  font-size: 13.5px;
  color: ${CHARCOAL};
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? "#e53e3e" : GOLD)};
    background: #ffffff;
    box-shadow: 0 0 0 3px
      ${({ $hasError }) =>
        $hasError ? "rgba(229, 62, 62, 0.15)" : "rgba(184, 137, 90, 0.15)"};
  }

  &::placeholder {
    color: #a09f99;
    font-size: 13px;
  }
`;

const PhoneInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 1px solid
    ${({ $hasError }) => ($hasError ? "#e53e3e" : SAND_BORDER)};
  background: ${CREAM};
  overflow: hidden;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${({ $hasError }) => ($hasError ? "#e53e3e" : GOLD)};
    background: #ffffff;
    box-shadow: 0 0 0 3px
      ${({ $hasError }) =>
        $hasError ? "rgba(229, 62, 62, 0.15)" : "rgba(184, 137, 90, 0.15)"};
  }

  .country-code {
    padding: 10px 10px 10px 12px;
    font-size: 13.5px;
    font-weight: 600;
    color: ${GOLD_DARK};
    border-right: 1px solid ${SAND_BORDER};
    user-select: none;
  }

  input {
    width: 100%;
    padding: 10px 12px;
    border: none;
    outline: none;
    background: transparent;
    font-family: "DM Sans", sans-serif;
    font-size: 13.5px;
    color: ${CHARCOAL};

    &::placeholder {
      color: #a09f99;
      font-size: 13px;
    }
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid ${SAND_BORDER};
  background: ${CREAM};
  font-family: "DM Sans", sans-serif;
  font-size: 13.5px;
  color: ${CHARCOAL};
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${GOLD};
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(184, 137, 90, 0.15);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid ${SAND_BORDER};
  background: ${CREAM};
  font-family: "DM Sans", sans-serif;
  font-size: 13.5px;
  color: ${CHARCOAL};
  outline: none;
  resize: vertical;
  min-height: 52px;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${GOLD};
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(184, 137, 90, 0.15);
  }

  &::placeholder {
    color: #a09f99;
    font-size: 12.5px;
  }
`;

const ErrorText = styled.span`
  color: #e53e3e;
  font-size: 11.5px;
  margin-top: 2px;
  font-weight: 500;
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 4px;
  padding: 13px 20px;
  border-radius: 8px;
  background: ${GOLD};
  color: #ffffff;
  border: none;
  font-family: "DM Sans", sans-serif;
  font-size: 14.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(184, 137, 90, 0.35);

  &:hover:not(:disabled) {
    background: ${GOLD_DARK};
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(184, 137, 90, 0.45);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const TrustBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 4px;
  font-size: 11.5px;
  color: ${CHARCOAL_MID};
  flex-wrap: wrap;

  span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }

  .check-icon {
    color: #38a169;
    font-size: 12px;
  }
`;
