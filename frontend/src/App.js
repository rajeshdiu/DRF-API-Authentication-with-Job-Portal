import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import JobFeed from "./pages/JobFeed";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import JobDetailView from "./pages/JobDetailView";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job-feed" element={<JobFeed />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        
      </Routes>

      <Routes>
        <Route path="/edit-job/:id" element={<EditJob />} />
        <Route path="/job/:id" element={<JobDetailView />} />
      </Routes>
    </Router>
  );
}

export default App;
