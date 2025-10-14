import React, { useState } from "react";
import API from "../api"; // your axios setup
import { useNavigate } from "react-router-dom";
import "../login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        username: formData.username,
        password: formData.password,
      };

      const res = await API.post("/auth/login/", payload);

      // Save tokens to localStorage
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      alert("Login successful!");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error(error.response?.data);
      alert("Invalid credentials or login failed!");
    }
  };

  return (
    
    <div className="login-container">
      <div className="card login-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username or Email</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username or email"
              required
            />
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
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary mt-2">
            Login
          </button>
        </form>

        <div className="login-links">
          <span onClick={() => navigate("/forgot-password")}>Forgot Password?</span> |{" "}
          <span onClick={() => navigate("/register")}>Register here</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
