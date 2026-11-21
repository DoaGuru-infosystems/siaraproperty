import LegalDocumentPage from "../components/LegalDocumentPage";

const privacySections = [
  {
    heading: "Information We Collect",
    paragraphs: [
      "When you interact with our website, such as filling out a contact form, submitting a property enquiry, requesting a callback, or subscribing to updates, we may collect personal details including your name, email address, phone number, and any other information you choose to share with us, such as your property preferences, budget range, or location requirements. We only collect information that is relevant and necessary for us to assist you effectively.",
    ],
  },
  {
    heading: "How We Use Your Information",
    paragraphs: ["The information we collect is used for the following purposes:"],
    bullets: [
      "To respond to your enquiries and provide accurate information about properties, services, and availability.",
      "To understand your requirements better and connect you with suitable property options.",
      "To improve our website's functionality, content, and overall user experience based on how visitors interact with it.",
      "To send you promotional offers, property updates, and newsletters, but only if you have opted in to receive such communication.",
      "To comply with applicable legal, regulatory, or governmental requirements, and to protect our legal rights where necessary.",
    ],
    afterBullets:
      "We do not sell or trade your personal information to third parties for their marketing purposes.",
  },
  {
    heading: "Data Security",
    paragraphs: [
      "We take reasonable and appropriate technical and organizational measures to protect your personal information from unauthorized access, misuse, disclosure, alteration, or destruction. Access to your information is limited to authorized personnel who need it to perform their work. That said, no method of data transmission or storage over the internet can be guaranteed to be completely secure, and while we strive to protect your information, we cannot promise absolute security.",
    ],
  },
  {
    heading: "Data Retention",
    paragraphs: [
      "We retain your personal information only for as long as it is reasonably necessary to fulfil the purposes described in this policy, such as responding to your enquiry or providing you with requested services, or for as long as required to comply with applicable legal, accounting, or reporting obligations. Once this information is no longer needed, we take steps to securely delete or anonymize it.",
    ],
  },
  {
    heading: "Your Consent",
    paragraphs: [
      "By accessing and using our website, submitting your details through our forms, or otherwise providing us with your personal information, you consent to the collection, use, and handling of that information as described in this Privacy Policy. If you do not agree with any part of this policy, we would encourage you not to share your personal information with us through the website.",
    ],
  },
  {
    heading: "Changes to This Privacy Policy",
    paragraphs: [
      "Siara Properties reserves the right to update, modify, or revise this Privacy Policy at any time, without prior notice, to reflect changes in our practices, services, or legal requirements. Any changes will be posted on this page along with a revised effective date, and we encourage you to review this policy periodically to stay informed about how we are protecting your information.",
    ],
  },
  {
    heading: "Contact Us",
    paragraphs: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or how your personal information is handled, please feel free to reach out to us at:",
    ],
    contact: {
      phones: ["+91 92430 66371", "+91 70001 02121"],
      emails: ["info@siaraproperties.com", "support@siaraproperties.com"],
      address:
        "Siara Properties, 1815 Wright Town, Jabalpur, Madhya Pradesh, India 482002",
    },
  },
];

function PrivacyPolicy() {
  return (
    <LegalDocumentPage
      title="Privacy Policy"
      description="Learn what personal information Siara Properties collects, how it is used and protected, and the choices available to website visitors."
      intro="At Siara Properties, we value your privacy and are committed to protecting the personal information of everyone who visits or interacts with our website. This Privacy Policy explains what information we collect, how we use it, how we protect it, and the choices you have regarding your personal data. By using our website, you agree to the practices described in this policy."
      sections={privacySections}
    />
  );
}

export default PrivacyPolicy;
