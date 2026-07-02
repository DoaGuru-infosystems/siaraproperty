import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavbarAd from './NavbarAd';
import Sidebar from './Sidebar';
import SiderbarMob from './SiderbarMob';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { BASE_URL } from '../config';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function AllBlogs() {
  const { currentAdmin } = useSelector((state) => state.admin);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/property/blogs/all`);
      if (response.data.success) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      cogoToast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id, title) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the blog: "${title}"? This action cannot be undone.`);
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`${BASE_URL}/api/property/blogs/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${currentAdmin?.token}`
        }
      });

      if (response.data.success) {
        cogoToast.success('Blog deleted successfully');
        setBlogs(blogs.filter((blog) => blog.id !== id));
      } else {
        cogoToast.error(response.data.error || 'Failed to delete blog');
      }
    } catch (error) {
      console.error('Delete error:', error);
      cogoToast.error(error.response?.data?.error || 'An error occurred while deleting');
    }
  };

  return (
    <Wrapper>
      <NavbarAd />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 p-0 d-none d-lg-block">
            <Sidebar />
          </div>
          <div className="col-12 p-0 d-lg-none">
            <SiderbarMob />
          </div>
          <div className="col-lg-10 pt-4 px-4">
            <div className="d-flex justify-content-between align-items-center mb-4 mt-5 mt-lg-3">
              <h3 className="post-heading fw-semibold mb-0">All Blogs</h3>
              <Link to="/admin/add-blog" className="btn btn-primary fw-medium px-4">
                + Add New Blog
              </Link>
            </div>
            
            <div className="card shadow-sm border-0 p-4 mb-5">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <h5>No blogs found.</h5>
                  <p>Click "Add New Blog" to create your first post.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Category</th>
                        <th scope="col">Views</th>
                        <th scope="col">Published Date</th>
                        <th scope="col" className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((blog, index) => (
                        <tr key={blog.id}>
                          <td>{index + 1}</td>
                          <td>
                            <img 
                              src={blog.image || 'https://via.placeholder.com/60x40?text=No+Image'} 
                              alt="thumbnail" 
                              className="rounded"
                              style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                            />
                          </td>
                          <td className="fw-medium text-truncate" style={{ maxWidth: '250px' }}>
                            {blog.title}
                          </td>
                          <td>
                            <span className="badge bg-secondary rounded-pill px-3">
                              {blog.category}
                            </span>
                          </td>
                          <td>{blog.views || 0}</td>
                          <td>{new Date(blog.created_at).toLocaleDateString()}</td>
                          <td className="text-end">
                            <button 
                              onClick={() => handleDelete(blog.id, blog.title)} 
                              className="btn btn-sm btn-outline-danger"
                              title="Delete Blog"
                            >
                              <i className="bi bi-trash3-fill"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  
  .btn-primary {
    background-color: #b8895a;
    border-color: #b8895a;
    
    &:hover {
      background-color: #a07548;
      border-color: #a07548;
    }
  }

  table td {
    vertical-align: middle;
  }
`;
