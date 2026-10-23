import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { FaTrash, FaPhoneAlt, FaEnvelope, FaHome, FaSync } from "react-icons/fa";
import { BASE_URL } from "../config";

function PopupLeadsTable() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/property/getPopupLeads`);
      if (res?.data?.success) {
        const data = res.data.data || [];
        setLeads(data);
        // Reset to page 1 if current page is beyond total pages
        const total = Math.ceil(data.length / leadsPerPage);
        if (currentPage > total && total > 0) {
          setCurrentPage(1);
        }
      } else {
        console.error(res?.data?.error);
      }
    } catch (err) {
      console.error("Error fetching popup leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this lead?");
    if (!isConfirmed) return;

    try {
      const res = await axios.delete(`${BASE_URL}/api/property/deletePopupLead/${id}`);
      if (res?.data?.success) {
        toast.success(res.data.message || "Lead deleted successfully");
        setLeads((prev) => {
          const updated = prev.filter((item) => item.id !== id);
          const newTotalPages = Math.ceil(updated.length / leadsPerPage);
          if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
          }
          return updated;
        });
      } else {
        toast.error(res?.data?.message || "Failed to delete lead");
      }
    } catch (err) {
      console.error("Error deleting lead:", err);
      toast.error(err?.response?.data?.message || "Failed to delete lead");
    }
  };

  // Pagination Calculations
  const totalPages = Math.ceil(leads.length / leadsPerPage);
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Wrapper>
      <div className="table-card">
        <div className="card-header-bar">
          <div className="header-left">
            <h4 className="title">Popup Form Leads</h4>
            <span className="count-badge">Total Leads: {leads.length}</span>
            {totalPages > 1 && (
              <span className="page-badge">
                Page {currentPage} of {totalPages}
              </span>
            )}
          </div>
          <button className="refresh-btn" onClick={fetchLeads} title="Refresh Leads" type="button">
            <FaSync className={loading ? "spin" : ""} /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="loading-state">Loading popup leads...</div>
        ) : leads.length === 0 ? (
          <div className="empty-state">
            <FaHome className="empty-icon" />
            <p>No popup leads received yet.</p>
            <small>When visitors fill the popup enquiry form on the website, they will appear here in real-time.</small>
          </div>
        ) : (
          <>
            {/* Desktop Table View (>= 768px) */}
            <div className="table-responsive desktop-table-view">
              <table className="leads-table">
                <thead>
                  <tr>
                    <th style={{ width: "50px" }}>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Interested In</th>
                    <th>Requirement / Message</th>
                    <th>Date & Time</th>
                    <th style={{ width: "80px", textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeads.map((lead, index) => {
                    const serialNum = indexOfFirstLead + index + 1;
                    return (
                      <tr key={lead.id}>
                        <td className="text-muted fw-bold">{serialNum}</td>
                        <td className="lead-name">{lead.name}</td>
                        <td className="lead-phone">
                          <a href={`tel:+91${lead.phone}`} className="phone-link">
                            <FaPhoneAlt className="icon" /> +91 {lead.phone}
                          </a>
                        </td>
                        <td className="lead-email">
                          {lead.email && lead.email.trim() ? (
                            <a href={`mailto:${lead.email}`} className="email-link">
                              <FaEnvelope className="icon" /> {lead.email}
                            </a>
                          ) : (
                            <span className="text-muted fst-italic">Not provided</span>
                          )}
                        </td>
                        <td>
                          <span className="type-badge">{lead.property_type || "General Enquiry"}</span>
                        </td>
                        <td className="lead-message" title={lead.message}>
                          {lead.message || "—"}
                        </td>
                        <td className="lead-date">
                          {moment(lead.created_at).format("DD MMM YYYY, hh:mm A")}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(lead.id)}
                            title="Delete this lead"
                            type="button"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View (< 768px) */}
            <div className="mobile-leads-list">
              {currentLeads.map((lead, index) => {
                const serialNum = indexOfFirstLead + index + 1;
                return (
                  <div key={lead.id} className="mobile-lead-card">
                    <div className="m-card-top">
                      <div className="m-user-info">
                        <span className="m-badge-num">#{serialNum}</span>
                        <span className="m-name">{lead.name}</span>
                      </div>
                      <span className="type-badge">{lead.property_type || "General Enquiry"}</span>
                    </div>

                    <div className="m-card-details">
                      <div className="m-row">
                        <span className="m-label">Phone:</span>
                        <a href={`tel:+91${lead.phone}`} className="phone-link">
                          <FaPhoneAlt className="icon" /> +91 {lead.phone}
                        </a>
                      </div>
                      <div className="m-row">
                        <span className="m-label">Email:</span>
                        {lead.email && lead.email.trim() ? (
                          <a href={`mailto:${lead.email}`} className="email-link">
                            <FaEnvelope className="icon" /> {lead.email}
                          </a>
                        ) : (
                          <span className="text-muted fst-italic">Not provided</span>
                        )}
                      </div>
                      {lead.message ? (
                        <div className="m-row m-row-message">
                          <span className="m-label">Message:</span>
                          <span className="m-msg-text">{lead.message}</span>
                        </div>
                      ) : null}
                    </div>

                    <div className="m-card-bottom">
                      <span className="lead-date">
                        {moment(lead.created_at).format("DD MMM YYYY, hh:mm A")}
                      </span>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(lead.id)}
                        title="Delete this lead"
                        type="button"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Bar */}
            {leads.length > 0 && (
              <div className="pagination-bar">
                <div className="pagination-info">
                  Showing <strong>{indexOfFirstLead + 1}</strong> to{" "}
                  <strong>{Math.min(indexOfLastLead, leads.length)}</strong> of{" "}
                  <strong>{leads.length}</strong> leads
                </div>

                {totalPages > 1 && (
                  <div className="pagination-controls">
                    <button
                      type="button"
                      className="page-btn prev-btn"
                      onClick={prevPage}
                      disabled={currentPage === 1}
                    >
                      ← Previous
                    </button>

                    <div className="page-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <button
                          key={num}
                          type="button"
                          className={`page-num ${currentPage === num ? "active" : ""}`}
                          onClick={() => setCurrentPage(num)}
                        >
                          {num}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="page-btn next-btn"
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Wrapper>
  );
}

export default PopupLeadsTable;

/* ─── STYLED COMPONENTS ───────────────────────────────────────────────────────── */

const Wrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
  margin-left: 7rem;
  padding-right: 2rem;

  @media screen and (min-width: 1020px) and (max-width: 1600px) {
    margin-left: 8rem;
    padding-right: 3rem;
  }

  @media screen and (max-width: 768px) {
    margin-left: -2rem;
    margin-right: 0;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    margin-top: 1rem;
    width: 95%;
  }

  @media screen and (max-width: 480px) {
    margin-left: -2rem;
    width: 96%;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }

  .table-card {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
    border: 1px solid #ede8e0;
    overflow: hidden;
  }

  .card-header-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 24px;
    border-bottom: 1px solid #f0ece4;
    background: #faf8f5;
    flex-wrap: wrap;
    gap: 12px;

    @media (max-width: 576px) {
      padding: 12px 14px;
    }
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;

    @media (max-width: 576px) {
      gap: 8px;
    }
  }

  .title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: #2c2c28;
    letter-spacing: -0.01em;

    @media (max-width: 576px) {
      font-size: 1.05rem;
    }
  }

  .count-badge {
    background: #eef2ff;
    color: #4338ca;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 20px;
    border: 1px solid #c7d2fe;

    @media (max-width: 576px) {
      font-size: 11px;
      padding: 3px 8px;
    }
  }

  .page-badge {
    background: #fdf4e7;
    color: #b8895a;
    font-size: 11.5px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 14px;
    border: 1px solid #e8d7be;

    @media (max-width: 576px) {
      font-size: 10.5px;
      padding: 2px 7px;
    }
  }

  .refresh-btn {
    background: #ffffff;
    border: 1px solid #dcd7ce;
    color: #4b5563;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (max-width: 576px) {
      padding: 5px 10px;
      font-size: 12px;
    }

    &:hover {
      background: #f3f4f6;
      color: #111827;
      border-color: #9ca3af;
    }

    .spin {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  }

  /* Desktop Table */
  .desktop-table-view {
    display: block;
    overflow-x: auto;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .leads-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13.5px;

    thead tr {
      background: #fdfcfb;
      border-bottom: 2px solid #eae5dc;
    }

    th {
      padding: 12px 16px;
      text-align: left;
      font-weight: 600;
      color: #4b5563;
      white-space: nowrap;
      text-transform: uppercase;
      font-size: 11.5px;
      letter-spacing: 0.04em;
    }

    tbody tr {
      border-bottom: 1px solid #f1ece4;
      transition: background 0.15s ease;

      &:hover {
        background: #fbf9f6;
      }

      &:last-child {
        border-bottom: none;
      }
    }

    td {
      padding: 12px 16px;
      vertical-align: middle;
      color: #374151;
    }
  }

  .lead-name {
    font-weight: 600;
    color: #1f2937;
  }

  .phone-link {
    color: #0284c7;
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 6px;

    .icon {
      font-size: 11px;
      color: #0ea5e9;
    }

    &:hover {
      text-decoration: underline;
      color: #0369a1;
    }
  }

  .email-link {
    color: #4b5563;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;

    .icon {
      font-size: 11px;
      color: #9ca3af;
    }

    &:hover {
      text-decoration: underline;
      color: #111827;
    }
  }

  .type-badge {
    background: #fef3c7;
    color: #92400e;
    font-size: 12px;
    font-weight: 500;
    padding: 3px 9px;
    border-radius: 6px;
    display: inline-block;
    white-space: nowrap;
  }

  .lead-message {
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #6b7280;
  }

  .lead-date {
    white-space: nowrap;
    font-size: 12.5px;
    color: #6b7280;
  }

  .delete-btn {
    background: #fee2e2;
    border: 1px solid #fecaca;
    color: #dc2626;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 13px;

    &:hover {
      background: #dc2626;
      color: #ffffff;
      border-color: #dc2626;
      transform: scale(1.05);
    }
  }

  /* Mobile Lead Cards List */
  .mobile-leads-list {
    display: none;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 14px;
    }
  }

  .mobile-lead-card {
    background: #ffffff;
    border: 1px solid #eee8df;
    border-radius: 10px;
    padding: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    transition: transform 0.15s ease;

    &:active {
      background: #faf8f5;
    }
  }

  .m-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2ede5;
    padding-bottom: 10px;
    margin-bottom: 10px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .m-user-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .m-badge-num {
    background: #f3f4f6;
    color: #6b7280;
    font-size: 11px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 4px;
  }

  .m-name {
    font-size: 15px;
    font-weight: 700;
    color: #1f2937;
  }

  .m-card-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 13.5px;
  }

  .m-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .m-row-message {
    align-items: flex-start;
  }

  .m-label {
    font-size: 11.5px;
    font-weight: 600;
    color: #8b7d6b;
    min-width: 65px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .m-msg-text {
    color: #374151;
    line-height: 1.4;
    word-break: break-word;
    flex: 1;
  }

  .m-card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f2ede5;
    padding-top: 10px;
    margin-top: 10px;
  }

  /* Pagination Bar */
  .pagination-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 24px;
    border-top: 1px solid #f0ece4;
    background: #faf8f5;
    flex-wrap: wrap;
    gap: 12px;

    @media (max-width: 576px) {
      padding: 12px 14px;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
  }

  .pagination-info {
    font-size: 13px;
    color: #6b7280;

    strong {
      color: #1f2937;
    }
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .page-numbers {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .page-btn {
    background: #ffffff;
    border: 1px solid #dcd7ce;
    color: #374151;
    font-size: 13px;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: #f3f4f6;
      border-color: #9ca3af;
      color: #111827;
    }

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      background: #f9fafb;
    }
  }

  .page-num {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    color: #4b5563;
    font-size: 13px;
    font-weight: 600;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(.active) {
      background: #f3f4f6;
      color: #111827;
    }

    &.active {
      background: #b8895a;
      border-color: #b8895a;
      color: #ffffff;
      box-shadow: 0 2px 4px rgba(184, 137, 90, 0.25);
    }
  }

  .loading-state,
  .empty-state {
    padding: 48px 20px;
    text-align: center;
    color: #6b7280;
  }

  .empty-state {
    .empty-icon {
      font-size: 38px;
      color: #d1d5db;
      margin-bottom: 12px;
    }

    p {
      font-size: 16px;
      font-weight: 600;
      color: #374151;
      margin: 0 0 6px;
    }

    small {
      font-size: 13px;
      color: #9ca3af;
    }
  }
`;
