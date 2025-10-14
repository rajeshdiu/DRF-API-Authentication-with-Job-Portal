import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import Navbar from "./Navbar";

const EditJob = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ Job_Title: "", Job_Type: "", Job_Description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await API.get(`/job/${id}/`, { headers: { Authorization: `Bearer ${token}` } });
        setFormData(res.data);
      } catch (err) {
        console.error(err.response?.data);
        alert("Failed to fetch job!");
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access");
      await API.put(`/job/${id}/`, formData, { headers: { Authorization: `Bearer ${token}` } });
      alert("Job updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error(err.response?.data);
      alert("Failed to update job!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card shadow p-4" style={{ maxWidth: "600px", margin: "auto" }}>
          <h2 className="text-primary mb-4">Edit Job</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Job Title</label>
              <input type="text" name="Job_Title" className="form-control" value={formData.Job_Title} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Job Type</label>
              <select name="Job_Type" className="form-select" value={formData.Job_Type} onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="FULLTIME">Full-Time</option>
                <option value="PARTTIME">Part-Time</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Job Description</label>
              <textarea name="Job_Description" className="form-control" value={formData.Job_Description} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Update Job</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditJob;
