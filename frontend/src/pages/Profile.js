import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("access");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err.response?.data);
      }
    };

    const fetchJobs = async () => {
      try {
        const res = await API.get("/job/JobList/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const recruiterJobs = res.data.filter((job) => job.Recruiter === user.id);
        setJobs(recruiterJobs);
      } catch (err) {
        console.error(err.response?.data);
      }
    };

    fetchUser();
    if (user.User_Type === "Recruiter") fetchJobs();
  }, [user.id, user.User_Type, token]);

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await API.delete(`/job/${jobId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(jobs.filter((job) => job.id !== jobId));
        alert("Job deleted successfully!");
      } catch (err) {
        console.error(err.response?.data);
        alert("Failed to delete job!");
      }
    }
  };

  const handleEdit = (jobId) => navigate(`/edit-job/${jobId}`);
  const handleView = (jobId) => navigate(`/view-job/${jobId}`);

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="card shadow resume-card p-4">
          <div className="d-flex align-items-center mb-4">
            {user.profile_image ? (
              <img
                src={user.profile_image}
                alt="Profile"
                className="rounded-circle me-4"
                style={{ width: "120px", height: "120px", objectFit: "cover", border: "2px solid #0d6efd" }}
              />
            ) : (
              <div
                className="rounded-circle bg-secondary me-4 text-white d-flex align-items-center justify-content-center"
                style={{ width: "120px", height: "120px", fontSize: "36px" }}
              >
                {user.username?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="mb-1">{user.username}</h2>
              <p className="text-muted mb-0">{user.User_Type}</p>
              {user.email && <p className="text-muted">{user.email}</p>}
            </div>
          </div>

          <hr />

          {user.phone_number && (
            <p>
              <strong>Phone:</strong> {user.phone_number}
            </p>
          )}
          {user.bio && (
            <p>
              <strong>About Me:</strong> {user.bio}
            </p>
          )}


          
          

          {user.User_Type === "Recruiter" && (
           <div className="d-flex justify-content-end mb-4">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/add-job")}
            >
              Add Job
            </button>
          </div>
          )}

          <div className="d-flex justify-content-end mb-4">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/update-profile")}
            >
              Update Profile
            </button>
          </div>

          {user.User_Type === "Recruiter" && (
            <>
              <h4 className="text-success mb-3">My Jobs</h4>
              {jobs.length === 0 ? (
                <p>No jobs created yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((job) => (
                        <tr key={job.id}>
                          <td>{job.Job_Title}</td>
                          <td>{job.Job_Type}</td>
                          <td>{job.Job_Description}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-primary me-2"
                              onClick={() => handleView(job.id)}
                            >
                              View
                            </button>
                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => handleEdit(job.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(job.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
