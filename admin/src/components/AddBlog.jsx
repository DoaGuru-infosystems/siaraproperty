import React, { useState } from 'react';
import styled from 'styled-components';
import NavbarAd from './NavbarAd';
import Sidebar from './Sidebar';
import SiderbarMob from './SiderbarMob';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { BASE_URL } from '../config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AddBlog() {
  const { currentAdmin } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Real Estate',
    author: currentAdmin?.user?.name || 'Siara Properties',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !image) {
      cogoToast.warn('Please fill in Title, Description, and select an Image.');
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('author', formData.author);
    data.append('description', formData.description); // Rich text compatible
    data.append('image', image);

    try {
      const response = await axios.post(`${BASE_URL}/api/property/blogs/add`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${currentAdmin?.token}`
        }
      });

      if (response.data.success) {
        cogoToast.success('Blog added successfully!');
        navigate('/admin/all-blogs');
      } else {
        cogoToast.error(response.data.error || 'Failed to add blog');
      }
    } catch (error) {
      console.error(error);
      cogoToast.error(error.response?.data?.error || 'An error occurred while adding the blog');
    } finally {
      setLoading(false);
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
            <h3 className="post-heading fw-semibold mb-4 mt-5 mt-lg-3">Add New Blog</h3>
            
            <div className="card shadow-sm border-0 p-4 mb-5">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label fw-medium">Blog Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="title" 
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter blog title" 
                      required 
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">Category</label>
                    <select 
                      className="form-select border" 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="Real Estate">Real Estate</option>
                      <option value="Home Improvement">Home Improvement</option>
                      <option value="Market Trends">Market Trends</option>
                      <option value="Finance">Finance</option>
                      <option value="Lifestyle">Lifestyle</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">Author Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="author" 
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="e.g. Siara Properties" 
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <label className="form-label fw-medium">Banner Image</label>
                    <input 
                      type="file" 
                      className="form-control" 
                      accept="image/*"
                      onChange={handleImageChange}
                      required 
                    />
                  </div>

                  <div className="col-md-12 mb-4">
                    <label className="form-label fw-medium">Blog Description (HTML supported)</label>
                    <textarea 
                      className="form-control" 
                      name="description" 
                      rows="10"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Write your blog content here..." 
                      required 
                    ></textarea>
                    <small className="text-muted mt-1 d-block">You can use basic HTML tags for formatting if needed.</small>
                  </div>

                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary px-4 py-2 fw-semibold" disabled={loading}>
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Publishing...
                        </>
                      ) : (
                        'Publish Blog'
                      )}
                    </button>
                  </div>
                </div>
              </form>
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
  
  .form-select {
    border: 1px solid #ced4da !important;
  }
  
  .btn-primary {
    background-color: #b8895a;
    border-color: #b8895a;
    
    &:hover {
      background-color: #a07548;
      border-color: #a07548;
    }
  }
`;
