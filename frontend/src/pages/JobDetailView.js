import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import Navbar from "./Navbar";

const JobDetailView = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await API.get(`/job/${id}/`, { headers: { Authorization: `Bearer ${token}` } });
        setJob(res.data);
      } catch (err) {
        console.error(err.response?.data);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card shadow p-4" style={{ maxWidth: "600px", margin: "auto" }}>
          <h2 className="text-primary mb-3">{job.Job_Title}</h2>
          <p><strong>Type:</strong> {job.Job_Type}</p>
          <p><strong>Description:</strong></p>
          <p>{job.Job_Description}</p>
        </div>
      </div>
    </>
  );
};

export default JobDetailView;
