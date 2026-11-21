import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page" aria-labelledby="not-found-title">
      <Helmet>
        <title>Page Not Found | Siara Properties</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section className="not-found-card">
        <p className="not-found-code" aria-hidden="true">
          404
        </p>
        <p className="not-found-eyebrow">Looks like this property is off the map</p>
        <h1 id="not-found-title">We can&apos;t find this page</h1>
        <p className="not-found-description">
          The link may be incorrect, or the page may have moved. Let's help you
          find your way back.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-home">
            Back to Home
          </Link>
          <Link to="/blog" className="not-found-blog">
            Browse our blog
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
