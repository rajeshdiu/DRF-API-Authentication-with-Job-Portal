import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/dashboard">MyPortal</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/job-feed">Job Feed</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>

            <li className="nav-item"><Link className="nav-link" to="/add-job">Add Job</Link></li>
            <li className="nav-item">
              <a className="nav-link" href="/update-profile">Update Profile</a>
            </li>


            <li className="nav-item">
              <span className="nav-link text-danger" style={{ cursor: "pointer" }} onClick={handleLogout}>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
