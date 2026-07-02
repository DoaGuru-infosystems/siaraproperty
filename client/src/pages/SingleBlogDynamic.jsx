import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Navbar from "../components/UpdatedCode/Navbar";
import useLenis from "../hooks/useLenis";

export default function SingleBlogDynamic() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [iframeHeight, setIframeHeight] = useState('600px');

  // Initialize Lenis smooth scroll for this page
  useLenis();

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

  const isFullHtml = blog && blog.description && (
    blog.description.trim().toLowerCase().startsWith('<!doctype html>') || 
    blog.description.toLowerCase().includes('<html')
  );

  const handleIframeLoad = (e) => {
    const iframe = e.target;
    const adjustHeight = () => {
      try {
        if (iframe.contentWindow && iframe.contentWindow.document.body) {
          const height = iframe.contentWindow.document.documentElement.scrollHeight || iframe.contentWindow.document.body.scrollHeight;
          setIframeHeight(`${height + 50}px`);
        }
      } catch (err) {
        console.error('Error adjusting iframe height:', err);
      }
    };
    
    adjustHeight();
    // Adjust height dynamically after assets load
    setTimeout(adjustHeight, 500);
    setTimeout(adjustHeight, 1500);
    setTimeout(adjustHeight, 3000);
  };

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
      
      <Navbar />
      
      <div className="container content-wrapper mb-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/blog" className="text-decoration-none">Blogs</Link></li>
            <li className="breadcrumb-item active text-dark" aria-current="page">{blog.title}</li>
          </ol>
        </nav>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Always render Blog Header */}
            <div className="blog-header text-center mb-5">
              <span className="badge category-badge mb-3 px-3 py-2 rounded-pill fs-6">{blog.category}</span>
              <h1 className="blog-title fw-bold mb-4">{blog.title}</h1>
              <div className="d-flex justify-content-center align-items-center text-muted gap-4 meta-info">
                <span><i className="bi bi-person-fill me-2"></i>{blog.author}</span>
                <span><i className="bi bi-calendar-check-fill me-2"></i>{new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span><i className="bi bi-eye-fill me-2"></i>{blog.views || 0} Views</span>
              </div>
            </div>

            {/* Always render Blog Banner */}
            <div className="blog-banner-container mb-5 rounded overflow-hidden shadow-sm">
              <img 
                src={blog.image || 'https://via.placeholder.com/1200x600?text=No+Image+Available'} 
                alt={blog.title} 
                className="img-fluid w-100" 
                style={{ maxHeight: '550px', objectFit: 'cover' }}
              />
            </div>

            {isFullHtml ? (
              /* Render Full HTML securely inside an isolated iframe */
              <div className="iframe-wrapper rounded shadow-sm overflow-hidden bg-white border">
                <iframe
                  srcDoc={blog.description}
                  title={blog.title}
                  style={{ width: '100%', height: iframeHeight, border: 'none', display: 'block' }}
                  onLoad={handleIframeLoad}
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </div>
            ) : (
              /* Standard WYSIWYG Blog Layout */
              <div className="blog-content p-4 p-md-5 rounded">
                <div 
                  className="rich-text-container" 
                  dangerouslySetInnerHTML={{ __html: blog.description }} 
                />
              </div>
            )}
            
            <div className="mt-5 text-center">
              <Link to="/blog" className="btn btn-outline-gold px-4 py-2 fw-semibold rounded-pill">
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
  background-color: #fcfbf9; /* Soft warm light background */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #3a3a36;
  
  .content-wrapper {
    margin-top: 120px;
  }

  .breadcrumb-item a {
    color: #8c6340 !important;
    &:hover { color: #b8895a !important; }
  }

  .blog-title {
    font-size: 2.8rem;
    line-height: 1.3;
    font-family: 'Cormorant Garamond', Georgia, serif;
    color: #2c2c28 !important;
  }
  
  .meta-info span {
    font-size: 0.95rem;
    font-weight: 500;
    color: #7c7c76 !important;
  }
  
  /* Glassmorphic light mode container */
  .blog-content {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(184, 137, 90, 0.2);
    box-shadow: 0 10px 40px -10px rgba(140, 99, 64, 0.12);
    
    .rich-text-container {
      /* Typography Formatting matching premium light theme */
      h1, h2, h3 { 
        font-family: 'Cormorant Garamond', serif; 
        font-weight: 700; 
        color: #8c6340; 
        margin-top: 1.8rem; 
        margin-bottom: 0.8rem; 
      }
      h2 { 
        font-size: 1.75rem; 
        border-left: 4px solid #b8895a; 
        padding-left: 0.75rem; 
      }
      p { 
        font-family: 'Plus Jakarta Sans', sans-serif; 
        font-size: 1.1rem; 
        line-height: 1.85; 
        color: #3a3a36; 
        margin-bottom: 1.25rem; 
        text-align: justify; 
      }
      ul, ol { 
        padding-left: 1.75rem; 
        margin-bottom: 1.25rem; 
        color: #3a3a36;
        font-size: 1.1rem;
        line-height: 1.85;
      }
      ul { 
        list-style-type: disc; 
      }
      ol { 
        list-style-type: decimal; 
      }
      blockquote { 
        font-style: italic; 
        border-left: 4px solid #b8895a; 
        background: rgba(184, 137, 90, 0.06); 
        padding: 1rem 1.5rem; 
        margin: 1.5rem 0; 
        border-radius: 0 8px 8px 0; 
        color: #5c5c56;
      }
      img { 
        max-width: 100%; 
        height: auto; 
        border-radius: 12px; 
        margin: 2rem auto; 
        display: block; 
        box-shadow: 0 10px 25px rgba(140, 99, 64, 0.15); 
      }
      a { 
        color: #b8895a; 
        text-decoration: underline; 
      }
      strong {
        color: #2c2c28;
      }
    }
  }
  
  .category-badge {
    background-color: rgba(184, 137, 90, 0.1) !important;
    color: #b8895a !important;
    border: 1px solid rgba(184, 137, 90, 0.3);
    font-weight: 600;
  }

  .btn-outline-gold {
    color: #b8895a;
    border-color: #b8895a;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #b8895a;
      color: #ffffff;
    }
  }
`;
