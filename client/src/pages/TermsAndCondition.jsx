import LegalDocumentPage from "../components/LegalDocumentPage";

const termsSections = [
  {
    heading: "About the Information Provided",
    paragraphs: [
      "The property listings, prices, descriptions, images, and other details on this website are provided for general informational purposes only. While we make every effort to ensure the accuracy and timeliness of the information, property availability, pricing, and specifications may change without prior notice. Siara Properties does not guarantee that all information on the website is complete, current, or error-free, and visitors are advised to verify details directly with our team before making any decisions.",
    ],
  },
  {
    heading: "Use of the Website",
    paragraphs: [
      "You agree to use this website only for lawful purposes and in a manner that does not infringe upon the rights of, or restrict or inhibit the use of, this website by any third party. You must not misuse the website by knowingly introducing viruses, malware, or any other harmful material, or by attempting to gain unauthorized access to the website, its servers, or any connected database.",
    ],
  },
  {
    heading: "No Guarantee of Transaction or Outcome",
    paragraphs: [
      "Siara Properties acts as a platform to help buyers explore and enquire about available properties. Browsing this website, submitting an enquiry, or contacting our team does not constitute a guarantee of property availability, price confirmation, or the successful completion of any transaction. All property transactions are subject to independent verification, applicable legal processes, and mutual agreement between the concerned parties.",
    ],
  },
  {
    heading: "Buyer Responsibility",
    paragraphs: [
      "While Siara Properties assists in providing information and guidance, buyers are responsible for independently verifying property documents, ownership records, land titles, approvals, and other legal aspects before making any purchase decision. We strongly recommend consulting a qualified legal professional for document verification and due diligence on any property transaction.",
    ],
  },
  {
    heading: "Intellectual Property",
    paragraphs: [
      "All content on this website, including text, images, logos, graphics, and design, is the property of Siara Properties unless otherwise stated, and is protected under applicable intellectual property laws. You may not copy, reproduce, distribute, or use any content from this website for commercial purposes without our prior written consent.",
    ],
  },
  {
    heading: "Third-Party Communication",
    paragraphs: [
      "Any enquiry, callback request, or contact form submission made through this website may result in our team, or authorized representatives, contacting you via phone, email, or WhatsApp to assist with your property requirements. By submitting your details, you consent to being contacted for this purpose.",
    ],
  },
  {
    heading: "Limitation of Liability",
    paragraphs: [
      "Siara Properties shall not be held liable for any direct, indirect, incidental, or consequential loss or damage arising from the use of this website, reliance on the information provided, or any property transaction undertaken based on information obtained through this website. Users access and use the website at their own risk.",
    ],
  },
  {
    heading: "Changes to These Terms",
    paragraphs: [
      "Siara Properties reserves the right to update, modify, or revise these Terms and Conditions at any time without prior notice. Any changes will be posted on this page along with a revised effective date, and continued use of this website following such changes constitutes acceptance of the updated terms.",
    ],
  },
  {
    heading: "Governing Law",
    paragraphs: [
      "These Terms and Conditions shall be governed by and interpreted in accordance with the laws of India, and any disputes arising from the use of this website shall be subject to the jurisdiction of the courts in Jabalpur, Madhya Pradesh.",
    ],
  },
  {
    heading: "Contact Us",
    paragraphs: [
      "If you have any questions or concerns regarding these Terms and Conditions, please contact us at:",
    ],
    contact: {
      phones: ["+91 92430 66371", "+91 70001 02121"],
      emails: ["info@siaraproperties.com", "support@siaraproperties.com"],
      address:
        "Siara Properties, 1815 Wright Town, Jabalpur, Madhya Pradesh, India 482002",
    },
  },
];

function TermsAndCondition() {
  return (
    <LegalDocumentPage
      title="Terms and Conditions"
      description="Read the Terms and Conditions governing the use of the Siara Properties website and its property information and services."
      intro="Welcome to Siara Properties. These Terms and Conditions govern your use of our website and the services we provide. By accessing or using this website, you agree to comply with and be bound by the following terms. If you do not agree with any part of these terms, please refrain from using our website."
      sections={termsSections}
    />
  );
}

export default TermsAndCondition;
