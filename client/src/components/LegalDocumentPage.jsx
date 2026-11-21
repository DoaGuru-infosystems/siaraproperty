import { useEffect } from "react";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";
import { getAppUrl } from "../config/axios";
import "./LegalDocumentPage.css";

function LegalDocumentPage({ title, description, intro, sections }) {
  const location = useLocation();
  const canonicalUrl = getAppUrl(location.pathname);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{title} | Siara Properties</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${title} | Siara Properties`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>
      <main className="legal-page">
        <article className="legal-document">
          <header className="legal-header">
            <h1>{title}</h1>
            <p>{intro}</p>
          </header>
          {sections.map((section, index) => (
            <section
              className="legal-section"
              id={`legal-section-${index + 1}`}
              key={section.heading}
            >
              <h2>
                {index + 1}. {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {section.afterBullets && <p>{section.afterBullets}</p>}
              {section.contact && (
                <address className="legal-contact">
                  <strong>Siara Properties</strong>
                  <span>
                    <strong>Phone:</strong>{" "}
                    {section.contact.phones.map((phone, phoneIndex) => (
                      <span key={phone}>
                        {phoneIndex > 0 && ", "}
                        <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                      </span>
                    ))}
                  </span>
                  <span>
                    <strong>Email:</strong>{" "}
                    {section.contact.emails.map((email, emailIndex) => (
                      <span key={email}>
                        {emailIndex > 0 && ", "}
                        <a href={`mailto:${email}`}>{email}</a>
                      </span>
                    ))}
                  </span>
                  <span>
                    <strong>Address:</strong> {section.contact.address}
                  </span>
                </address>
              )}
            </section>
          ))}
        </article>
      </main>
    </>
  );
}

export default LegalDocumentPage;
