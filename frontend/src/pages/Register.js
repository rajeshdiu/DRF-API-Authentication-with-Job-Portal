import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "../register.css"; // <-- import CSS here

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    User_Type: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        User_Type: formData.User_Type,
      };

      await API.post("/auth/register/", payload);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data);
      alert("Registration failed!");
    }
  };

  return (
    <div className="register-container">
      <div className="card register-card">
        <h2>Create an Account</h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
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

          {/* Email */}
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

          {/* User Type */}
          <div className="mb-3">
            <label className="form-label">User Type</label>
            <select
              name="User_Type"
              className="form-select"
              value={formData.User_Type}
              onChange={handleChange}
              required
            >
              <option value="">Select User Type</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Seeker">Seeker</option>
            </select>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>

        <div className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login here</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
