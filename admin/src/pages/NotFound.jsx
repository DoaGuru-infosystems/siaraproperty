import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="container d-flex min-vh-100 flex-column align-items-center justify-content-center px-4 py-5 text-center">
      <p className="display-1 fw-bold mb-0" style={{ color: "#b8895a" }}>
        404
      </p>
      <h1 className="h2 fw-semibold mb-3">Page not found</h1>
      <p className="text-muted mb-4">
        This page does not exist or you do not have access to it.
      </p>
      <Link to="/admin_login" className="btn btn-primary px-4">
        Return to admin sign in
      </Link>
    </main>
  );
}

export default NotFound;
