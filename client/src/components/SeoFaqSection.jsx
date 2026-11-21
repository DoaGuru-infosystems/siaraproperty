import { Helmet } from "react-helmet";
import "./SeoFaqSection.css";

export const homePageFaqs = [
  {
    question: "How can I find a suitable property in Jabalpur?",
    answer:
      "First, decide on your preferred area, property type, plot size, and budget. Then, explore the options available with Siara Properties and compare listings based on location, city connectivity, amenities, and other important factors.",
  },
  {
    question: "What should I check before buying a plot in Jabalpur?",
    answer:
      "Before purchasing a plot, check the ownership and title documents, applicable approvals, land records, road access, location, and development status. It is also advisable to get all documents properly verified by a professional before completing the purchase.",
  },
  {
    question: "What documents are required when buying a property?",
    answer:
      "Required documents can vary depending on the type of property and transaction. Buyers should verify ownership documents, title records, previous sale deeds, applicable approvals, property tax records, and other relevant paperwork before purchasing.",
  },
  {
    question: "Should I visit a property before buying it?",
    answer:
      "Yes. A site visit helps you understand the actual location, road access, surrounding development, and neighborhood — details that photos or online listings often do not fully show.",
  },
  {
    question: "Does Siara Properties deal in both residential and commercial properties?",
    answer:
      "Yes, Siara Properties offers a range of property options including residential plots, houses, and commercial properties, depending on current availability.",
  },
  {
    question: "Is financing or loan assistance available for buying a property?",
    answer:
      "Buyers are advised to check with their preferred bank or financial institution for home loan eligibility and terms. Siara Properties can guide you on the property documentation needed for loan approval.",
  },
];

export const servicesPageFaqs = [
  {
    question: "Is buying a residential plot in Jabalpur a good option?",
    answer:
      "A residential plot can be a good choice for buyers who want to build a home in the future or hold land as a long-term asset. Suitability depends on factors such as location, budget, connectivity, development, and your individual goals.",
  },
  {
    question: "Which areas of Jabalpur are suitable for buying property?",
    answer:
      "The right area depends on your budget and future goals. When comparing locations in Jabalpur, consider road connectivity, nearby schools and hospitals, markets, public transportation, and future infrastructure development.",
  },
  {
    question: "How can I check whether a property is legally safe to buy?",
    answer:
      "Property buyers should verify ownership, title, land records, applicable approvals, and other legal documents before making a purchase. For significant transactions, getting the documents reviewed by a qualified legal professional can also be helpful.",
  },
  {
    question: "Can I buy property in Jabalpur for investment purposes?",
    answer:
      "Yes, people purchase property for different purposes, including residential use and long-term investment. Before investing, consider the location, property documents, development in the area, market conditions, and your own financial objectives.",
  },
  {
    question: "How do I choose the right plot size?",
    answer:
      "The right plot size depends on your intended use, construction plans, family requirements, budget, and the property's location. If you plan to build a house, consider the size and layout you will need for construction.",
  },
  {
    question: "Is Siara Properties suitable for first-time property buyers?",
    answer:
      "Yes. First-time buyers can contact Siara Properties to understand the available property options and buying process. It is important for every buyer, especially first-timers, to understand a property's documents, costs, location, and terms before making a purchase.",
  },
];

export const aboutPageFaqs = [
  {
    question: "Who is Siara Properties?",
    answer:
      "Siara Properties is a real estate platform based in Jabalpur, helping buyers explore, compare, and find residential and commercial properties. The team assists customers through the property search and buying process.",
  },
  {
    question: "What areas does Siara Properties operate in?",
    answer:
      "Siara Properties primarily focuses on properties within Jabalpur and its surrounding areas, helping local and outstation buyers find suitable options.",
  },
  {
    question: "How can I enquire about a property from Siara Properties?",
    answer:
      "You can visit the Siara Properties website and contact the team with your preferred location, property type, approximate budget, and other requirements. Sharing these details helps the team understand exactly what type of property you are looking for.",
  },
  {
    question: "Why should I choose Siara Properties over other agents or platforms?",
    answer:
      "Siara Properties focuses on verified listings, transparent information, and guidance through documentation and the buying process, aiming to make property search simpler and more reliable for buyers in Jabalpur.",
  },
  {
    question: "What kind of support does Siara Properties provide after I express interest in a property?",
    answer:
      "Once you share your requirements, the Siara Properties team helps by shortlisting suitable options, coordinating site visits, and guiding you through documentation and the next steps in the buying process.",
  },
];

function SeoFaqSection({ title, faqs }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <section className="seo-faq-section" aria-labelledby="seo-faq-title">
        <div className="seo-faq-inner">
          <p className="seo-faq-eyebrow">Helpful answers</p>
          <h2 id="seo-faq-title">{title}</h2>
          <div className="seo-faq-list">
            {faqs.map(({ question, answer }) => (
              <details className="seo-faq-item" key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default SeoFaqSection;
