import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "./Navbar";

const JobFeed = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(()=>{
    const token = localStorage.getItem("access");
    API.get("/job/JobList/", {headers:{Authorization:`Bearer ${token}`}})
      .then(res=>setJobs(res.data))
      .catch(err=>console.error(err));
  },[]);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4 text-primary">Job Feed</h2>
        <div className="row">
          {jobs.map(job=>(
            <div className="col-md-6 mb-3" key={job.id}>
              <div className="card shadow-sm p-3">
                <h5>{job.Job_Title}</h5>
                <p><strong>Type:</strong> {job.Job_Type}</p>
                <p>{job.Job_Description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JobFeed;
