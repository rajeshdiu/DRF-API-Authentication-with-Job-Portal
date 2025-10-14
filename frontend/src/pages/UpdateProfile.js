import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "./Navbar";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    User_Type: "",
    phone_number: "",
    bio: "",
    profile_image: null
  });

  const navigate = useNavigate();

  // Fetch user profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await API.get("/auth/profile/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData({
          username: res.data.username,
          email: res.data.email,
          User_Type: res.data.User_Type,
          phone_number: res.data.phone_number || "",
          bio: res.data.bio || "",
          profile_image: null // Initial is null
        });
      } catch (err) {
        console.error(err.response?.data);
      }
    };
    fetchProfile();
  }, []);

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input (profile image)
  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_image: e.target.files[0] });
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access");
      const data = new FormData();
      for (let key in formData) {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      }

      await API.put("/auth/update-profile/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Profile updated successfully!");
      navigate("/profile"); // Redirect to profile page
    } catch (err) {
      console.error(err.response?.data);
      alert("Failed to update profile!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card shadow p-4" style={{ maxWidth: "600px", margin: "auto" }}>
          <h2 className="text-primary mb-4">Update Profile</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">User Type</label>
              <select
                name="User_Type"
                className="form-select"
                value={formData.User_Type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="Recruiter">Recruiter</option>
                <option value="Seeker">Seeker</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                className="form-control"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Bio</label>
              <textarea
                name="bio"
                className="form-control"
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Profile Image</label>
              <input
                type="file"
                name="profile_image"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Update Profile</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
