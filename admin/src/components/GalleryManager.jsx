import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { BASE_URL } from "../config";
import NavbarAd from "./NavbarAd";
import Sidebar from "./Sidebar";
import SiderbarMob from "./SiderbarMob";

export default function GalleryManager() {
  const { currentAdmin } = useSelector((state) => state.admin);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!file) return undefined;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const fetchImages = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/property/gallery`);
      setImages(response.data.data || []);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      toast.error(error.response?.data?.error || "Failed to load gallery images");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const resetForm = () => {
    setName("");
    setFile(null);
    setPreview("");
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"].includes(selectedFile.type)) {
      toast.error("Choose a valid image file");
      event.target.value = "";
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("Gallery images must be 10 MB or smaller");
      event.target.value = "";
      return;
    }
    setFile(selectedFile);
  };

  const handleEdit = (image) => {
    setEditingId(image.id);
    setName(image.name);
    setFile(null);
    setPreview(image.image_url);
    if (fileInputRef.current) fileInputRef.current.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim()) {
      toast.warn("Please enter an image name");
      return;
    }
    if (!editingId && !file) {
      toast.warn("Please choose an image");
      return;
    }

    const data = new FormData();
    data.append("name", name.trim());
    if (file) data.append("image", file);

    setSaving(true);
    try {
      const headers = { Authorization: `Bearer ${currentAdmin?.token}` };
      const response = editingId
        ? await axios.put(`${BASE_URL}/api/property/gallery/${editingId}`, data, { headers })
        : await axios.post(`${BASE_URL}/api/property/gallery`, data, { headers });

      if (!response.data.success) {
        toast.error(response.data.error || "Failed to save gallery image");
        return;
      }

      toast.success(editingId ? "Gallery image updated" : "Gallery image added");
      resetForm();
      await fetchImages();
    } catch (error) {
      console.error("Error saving gallery image:", error);
      toast.error(error.response?.data?.error || "Failed to save gallery image");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (image) => {
    if (!window.confirm(`Delete "${image.name}" from the gallery?`)) return;

    try {
      const response = await axios.delete(
        `${BASE_URL}/api/property/gallery/${image.id}`,
        { headers: { Authorization: `Bearer ${currentAdmin?.token}` } }
      );
      if (!response.data.success) {
        toast.error(response.data.error || "Failed to delete gallery image");
        return;
      }
      toast.success("Gallery image deleted");
      setImages((currentImages) => currentImages.filter((item) => item.id !== image.id));
      if (editingId === image.id) resetForm();
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      toast.error(error.response?.data?.error || "Failed to delete gallery image");
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
          <main className="col-lg-10 pt-4 px-4">
            <h3 className="fw-semibold mb-4 mt-5 mt-lg-3">Gallery Management</h3>

            <section className="card border-0 shadow-sm p-4 mb-4">
              <h5 className="mb-3">{editingId ? "Edit gallery image" : "Add gallery image"}</h5>
              <form onSubmit={handleSubmit}>
                <div className="row align-items-end">
                  <div className="col-md-5 mb-3">
                    <label className="form-label" htmlFor="gallery-name">Image name</label>
                    <input
                      id="gallery-name"
                      className="form-control"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      maxLength={255}
                      required
                    />
                  </div>
                  <div className="col-md-5 mb-3">
                    <label className="form-label" htmlFor="gallery-file">
                      Image {editingId ? "(optional; choose to replace)" : ""}
                    </label>
                    <input
                      id="gallery-file"
                      ref={fileInputRef}
                      className="form-control"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                      onChange={handleFileChange}
                      required={!editingId}
                    />
                  </div>
                  <div className="col-md-2 mb-3 d-flex gap-2">
                    <button className="btn btn-primary flex-grow-1" type="submit" disabled={saving}>
                      {saving ? "Saving..." : editingId ? "Update" : "Add image"}
                    </button>
                    {editingId && (
                      <button className="btn btn-outline-secondary" type="button" onClick={resetForm}>
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                {preview && (
                  <div className="preview-wrap">
                    <img src={preview} alt="Selected gallery preview" />
                  </div>
                )}
              </form>
            </section>

            <section className="card border-0 shadow-sm p-4 mb-5">
              <h5 className="mb-3">Gallery images</h5>
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : images.length === 0 ? (
                <p className="text-muted mb-0 py-4">No gallery images yet.</p>
              ) : (
                <div className="gallery-grid">
                  {images.map((image) => (
                    <article className="gallery-card" key={image.id}>
                      <img src={image.image_url} alt={image.name} />
                      <div className="gallery-card-body">
                        <h6 title={image.name}>{image.name}</h6>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(image)}>
                            Edit
                          </button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(image)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;

  .btn-primary {
    background-color: #b8895a;
    border-color: #b8895a;
  }

  .preview-wrap img {
    width: 180px;
    height: 120px;
    object-fit: cover;
    border-radius: 6px;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 20px;
  }

  .gallery-card {
    overflow: hidden;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    background: white;
  }

  .gallery-card > img {
    display: block;
    width: 100%;
    height: 170px;
    object-fit: cover;
  }

  .gallery-card-body {
    padding: 12px;
  }

  .gallery-card-body h6 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 12px;
  }
`;
