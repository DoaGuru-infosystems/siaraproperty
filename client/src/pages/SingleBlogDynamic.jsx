import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Navbar from "../components/UpdatedCode/Navbar";

export default function SingleBlogDynamic() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/property/blogs/post/${slug}`);
        if (response.data.success) {
          setBlog(response.data.data);
        } else {
          setError(response.data.error || 'Blog not found');
        }
      } catch (err) {
        console.error(err);
        setError('Blog not found or an error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <Wrapper className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Wrapper>
    );
  }

  if (error || !blog) {
    return (
      <Wrapper className="container mt-5 pt-5 text-center" style={{ minHeight: '60vh' }}>
        <h2 className="text-muted mb-4">{error}</h2>
        <Link to="/blog" className="btn btn-primary px-4 py-2">
          Back to Blogs
        </Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Helmet>
        <title>{blog.title} - Siara Properties</title>
        <meta name="description" content={blog.title} />
      </Helmet>
      
      {/* Dynamic unified Navbar */}
      <Navbar />
      
      <div className="container content-wrapper mb-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/blog" className="text-decoration-none text-muted">Blogs</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{blog.title}</li>
          </ol>
        </nav>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="blog-header text-center mb-5">
              <span className="badge bg-secondary mb-3 px-3 py-2 rounded-pill fs-6">{blog.category}</span>
              <h1 className="blog-title fw-bold text-dark mb-4">{blog.title}</h1>
              <div className="d-flex justify-content-center align-items-center text-muted gap-4 meta-info">
                <span><i className="bi bi-person-fill me-2"></i>{blog.author}</span>
                <span><i className="bi bi-calendar-check-fill me-2"></i>{new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span><i className="bi bi-eye-fill me-2"></i>{blog.views || 0} Views</span>
              </div>
            </div>

            <div className="blog-banner-container mb-5 rounded overflow-hidden shadow-sm">
              <img 
                src={blog.image || 'https://via.placeholder.com/1200x600?text=No+Image+Available'} 
                alt={blog.title} 
                className="img-fluid w-100" 
                style={{ maxHeight: '550px', objectFit: 'cover' }}
              />
            </div>

            <div className="blog-content shadow-sm bg-white p-4 p-md-5 rounded border border-light">
              {/* 3. RICH TEXT (HTML) RENDERING COMPATIBILITY: securely injecting the HTML from DB */}
              <div 
                className="rich-text-container" 
                dangerouslySetInnerHTML={{ __html: blog.description }} 
              />
            </div>
            
            <div className="mt-5 text-center">
              <Link to="/blog" className="btn btn-outline-primary px-4 py-2 fw-semibold rounded-pill">
                <i className="bi bi-arrow-left me-2"></i>Back to All Blogs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #fafafa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  .content-wrapper {
    margin-top: 100px; /* Offset for dynamic sticky navbar */
  }

  .blog-title {
    font-size: 2.5rem;
    line-height: 1.3;
    font-family: 'Cormorant Garamond', Georgia, serif;
    color: #2c2c28 !important;
  }
  
  .meta-info span {
    font-size: 0.95rem;
    font-weight: 500;
  }
  
  .blog-content {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #4a4a4a;
    
    .rich-text-container h1, 
    .rich-text-container h2, 
    .rich-text-container h3, 
    .rich-text-container h4 {
      color: #2c2c28;
      font-family: 'Cormorant Garamond', Georgia, serif;
      margin-top: 1.5rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }
    
    .rich-text-container p {
      margin-bottom: 1.5rem;
    }
    
    .rich-text-container img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 1.5rem 0;
    }
    
    .rich-text-container a {
      color: #b8895a;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  .btn-primary {
    background-color: #b8895a;
    border-color: #b8895a;
    
    &:hover {
      background-color: #a07548;
      border-color: #a07548;
    }
  }
  
  .btn-outline-primary {
    color: #b8895a;
    border-color: #b8895a;
    
    &:hover {
      background-color: #b8895a;
      color: white;
    }
  }
  
  .bg-secondary {
    background-color: #f7ede2 !important;
    color: #b8895a !important;
    font-weight: 600;
  }
`;
