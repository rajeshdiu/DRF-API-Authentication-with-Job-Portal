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
    // Fetch user info
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

    // Fetch jobs if recruiter
    const fetchJobs = async () => {
      try {
        const res = await API.get("/job/JobList/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Filter jobs by recruiter
        const recruiterJobs = res.data.filter(
          (job) => job.Recruiter === user.id
        );
        setJobs(recruiterJobs);
      } catch (err) {
        console.error(err.response?.data);
      }
    };

    fetchUser();
    if (user.User_Type === "Recruiter") fetchJobs();
  }, [user.id, user.User_Type, token]);

  // Handle job actions
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

  const handleEdit = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  const handleView = (jobId) => {
    navigate(`/view-job/${jobId}`);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card shadow p-4 mb-4" style={{ maxWidth: "600px", margin: "auto" }}>
          <h2 className="text-primary mb-4">Profile</h2>
          {user.profile_image && (
            <img
              src={user.profile_image}
              alt="Profile"
              className="img-thumbnail mb-3"
              style={{ width: "150px" }}
            />
          )}
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User Type:</strong> {user.User_Type}</p>
          {user.phone_number && <p><strong>Phone:</strong> {user.phone_number}</p>}
          {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
        </div>

        {user.User_Type === "Recruiter" && (
          <div className="card shadow p-4">
            <h3 className="text-success mb-4">My Jobs</h3>
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
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
