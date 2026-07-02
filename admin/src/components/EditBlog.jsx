import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import NavbarAd from './NavbarAd';
import Sidebar from './Sidebar';
import SiderbarMob from './SiderbarMob';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { BASE_URL } from '../config';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditBlog() {
  const { currentAdmin } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const { id } = useParams();
  const quillRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Real Estate',
    author: '',
    description: ''
  });
  const [currentImage, setCurrentImage] = useState(null);
  const [image, setImage] = useState(null);
  const [editorMode, setEditorMode] = useState('visual'); // 'visual' or 'html'
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/property/blogs/get/${id}`);
        if (response.data.success) {
          const blog = response.data.data;
          setFormData({
            title: blog.title || '',
            category: blog.category || 'Real Estate',
            author: blog.author || '',
            description: blog.description || ''
          });
          setCurrentImage(blog.image);
        } else {
          cogoToast.error('Blog not found');
          navigate('/admin/all-blogs');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        cogoToast.error('Failed to load blog data');
        navigate('/admin/all-blogs');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (content) => {
    setFormData({ ...formData, description: content });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Custom Image Handler for React-Quill
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const data = new FormData();
        data.append('image', file);

        try {
          const res = await axios.post(`${BASE_URL}/api/property/blogs/upload-image`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${currentAdmin?.token}`
            }
          });

          if (res.data.success) {
            const url = res.data.url;
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'image', url);
            quill.setSelection(range.index + 1);
          } else {
            cogoToast.error('Failed to upload image');
          }
        } catch (error) {
          console.error('Image upload failed', error);
          cogoToast.error('Image upload failed');
        }
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['blockquote'],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isDescriptionEmpty = false;
    if (editorMode === 'visual') {
      isDescriptionEmpty = formData.description.replace(/<(.|\n)*?>/g, '').trim().length === 0 && !formData.description.includes('<img');
    } else {
      isDescriptionEmpty = !formData.description.trim();
    }
    
    if (!formData.title || isDescriptionEmpty) {
      cogoToast.warn('Please fill in Title and Description.');
      return;
    }

    setSubmitting(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('author', formData.author);
    data.append('description', formData.description); 
    if (image) {
      data.append('image', image);
    }

    try {
      const response = await axios.put(`${BASE_URL}/api/property/blogs/edit/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${currentAdmin?.token}`
        }
      });

      if (response.data.success) {
        cogoToast.success('Blog updated successfully!');
        navigate('/admin/all-blogs');
      } else {
        cogoToast.error(response.data.error || 'Failed to update blog');
      }
    } catch (error) {
      console.error(error);
      cogoToast.error(error.response?.data?.error || 'An error occurred while updating the blog');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Wrapper>
        <NavbarAd />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 p-0 d-none d-lg-block"><Sidebar /></div>
            <div className="col-lg-10 pt-4 px-4 text-center mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

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
            <h3 className="post-heading fw-semibold mb-4 mt-5 mt-lg-3">Edit Blog</h3>
            
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

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">Banner Image (Leave empty to keep current)</label>
                    {currentImage && (
                      <div className="mb-2">
                        <img src={currentImage} alt="Current Banner" style={{ height: '80px', borderRadius: '4px' }} />
                      </div>
                    )}
                    <input 
                      type="file" 
                      className="form-control" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">Editor Mode</label>
                    <select 
                      className="form-select border" 
                      value={editorMode}
                      onChange={(e) => setEditorMode(e.target.value)}
                    >
                      <option value="visual">Visual Editor (WYSIWYG)</option>
                      <option value="html">Raw HTML Code (Advanced)</option>
                    </select>
                  </div>

                  <div className="col-md-12 mb-4">
                    <label className="form-label fw-medium">
                      Blog Description {editorMode === 'html' ? '(Paste raw HTML here)' : ''}
                    </label>
                    {editorMode === 'visual' ? (
                      <div className="quill-wrapper bg-white">
                        <ReactQuill 
                          ref={quillRef}
                          theme="snow"
                          modules={modules}
                          value={formData.description}
                          onChange={handleDescriptionChange}
                          placeholder="Write your professional blog content here..."
                        />
                      </div>
                    ) : (
                      <textarea
                        className="form-control code-editor"
                        name="description"
                        rows="15"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="<!-- Write or paste your custom HTML code here -->"
                        required
                      ></textarea>
                    )}
                  </div>

                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary px-4 py-2 fw-semibold" disabled={submitting}>
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Updating...
                        </>
                      ) : (
                        'Update Blog'
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

  .quill-wrapper {
    border-radius: 4px;
    overflow: hidden;
    
    .ql-toolbar {
      border: 1px solid #ced4da;
      border-bottom: none;
      background-color: #f8f9fa;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    
    .ql-container {
      border: 1px solid #ced4da;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      min-height: 300px;
      font-size: 1.1rem;
    }
    
    .ql-editor {
      min-height: 300px;
    }
  }

  .code-editor {
    font-family: 'Fira Code', 'Courier New', Courier, monospace;
    background-color: #1e1e1e;
    color: #d4d4d4;
    border: 1px solid #3c3c3c;
    border-radius: 4px;
    padding: 15px;
    font-size: 0.95rem;
    line-height: 1.5;
    
    &:focus {
      background-color: #1e1e1e;
      color: #ffffff;
      border-color: #b8895a;
      box-shadow: 0 0 0 0.2rem rgba(184, 137, 90, 0.25);
    }
  }
`;
