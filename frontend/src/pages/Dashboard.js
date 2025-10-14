import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ total_users: 0, total_recruiters: 0 });
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("access");
    if(!token) return navigate("/login");

    API.get("/auth/profile/", {headers:{Authorization:`Bearer ${token}`}})
      .then(res=>setUser(res.data)).catch(()=>{ localStorage.clear(); navigate("/login"); });

    API.get("/auth/dashboard-stats/", {headers:{Authorization:`Bearer ${token}`}})
      .then(res=>setStats(res.data)).catch(err=>console.error(err));
  },[navigate]);

  if(!user) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row mb-4">
          <div className="col-md-6"><div className="card shadow p-4 text-center"><h5>Total Users</h5><h3>{stats.total_users}</h3></div></div>
          <div className="col-md-6"><div className="card shadow p-4 text-center"><h5>Total Recruiters</h5><h3>{stats.total_recruiters}</h3></div></div>
        </div>
        <div className="card shadow p-4" style={{maxWidth:"600px", margin:"auto"}}>
          <h2 className="text-primary mb-4">Welcome {user.username}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User Type:</strong> {user.User_Type}</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
