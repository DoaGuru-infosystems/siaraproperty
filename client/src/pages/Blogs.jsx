import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/UpdatedCode/Navbar";
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet";
import { useLocation, Link } from "react-router-dom";
import { getAppUrl } from "../config/axios";
import axios from 'axios';

function Blogs() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const canonicalUrl = getAppUrl(location.pathname);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    const handleTop = () => {
      window.scrollTo(0, 0);
    };
    handleTop();

    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/property/blogs/all');
        if (response.data.success) {
          setBlogPosts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Container>
        <Helmet>
          <link rel="canonical" href={canonicalUrl} />
          <title>Blogs - Siara Properties</title>
        </Helmet>
        
        {/* Replaced both nav1 and nav2 with the unified responsive Navbar */}
        <Navbar />

        <div className="container-fluid content-wrapper mb-5">
          <div className="row">
            <div className="col-12 text-center mt-5 mb-4">
              <h1 className="fw-bold section-title">Blogs For Homes</h1>
              <p className="text-muted fs-5">Insights, market trends, and property tips.</p>
            </div>
          </div>

          <div className="container">
            <div className="row mt-4 cardBox">
              {loading ? (
                <div className="col-12 text-center my-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : blogPosts.length === 0 ? (
                <div className="col-12 text-center my-5 text-muted">
                  <h4>No blogs available at the moment.</h4>
                </div>
              ) : (
                blogPosts.map((blog) => (
                  <div key={blog.id} className="col-lg-4 col-md-6 mb-5 d-flex align-items-stretch">
                    <Link to={`/blog/${blog.slug}`} className="text-decoration-none w-100">
                      <div className="card h-100 shadow-sm border-0 blog-card">
                        <img 
                          src={blog.image || 'https://via.placeholder.com/400x250?text=Blog'} 
                          className="card-img-top" 
                          alt={blog.title} 
                          style={{ height: '220px', objectFit: 'cover' }}
                        />
                        <div className="card-body d-flex flex-column">
                          <span className="badge bg-secondary mb-2 align-self-start">{blog.category}</span>
                          <h5 className="card-title text-dark fw-bold mb-3">{blog.title}</h5>
                          <p className="card-text text-muted mb-4 text-truncate" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', whiteSpace: 'normal' }}>
                            {/* Stripping HTML for the excerpt snippet */}
                            {blog.description.replace(/<[^>]+>/g, '')}
                          </p>
                          <div className="mt-auto d-flex justify-content-between align-items-center text-muted small">
                            <span><i className="bi bi-person me-1"></i> {blog.author}</span>
                            <span><i className="bi bi-calendar me-1"></i> {new Date(blog.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Blogs;

const Container = styled.div`
  background-color: #fafafa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .content-wrapper {
    margin-top: 100px; /* Provides padding below the fixed navbar */
  }

  .section-title {
    font-family: '"Cormorant Garamond", Georgia, serif';
    color: #2c2c28;
    font-size: 3rem;
    
    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }

  .blog-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.05);
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 1rem 3rem rgba(0,0,0,.08) !important;
    }
    
    .card-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.4rem;
      line-height: 1.3;
    }
  }

  .bg-secondary {
    background-color: #f7ede2 !important;
    color: #b8895a !important;
    font-weight: 600;
  }
`;
