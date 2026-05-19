import { useEffect, useState } from "react";
import api from "../api/api";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  async function fetchComplaints() {
    try {
      let url = "/api/complaints";

      if (category) {
        url = `/api/complaints?category=${category}`;
      }

      const res = await api.get(url);
      setComplaints(res.data.complaints);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch complaints");
    }
  }

  async function searchByLocation() {
    try {
      const res = await api.get(
        `/api/complaints/search?location=${location}`
      );
      setComplaints(res.data.complaints);
    } catch (err) {
      alert(err.response?.data?.message || "Search failed");
    }
  }

  async function updateStatus(id, status) {
    try {
      await api.put(`/api/complaints/${id}`, { status });
      alert("Status updated");
      fetchComplaints();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  }

  async function deleteComplaint(id) {
    try {
      await api.delete(`/api/complaints/${id}`);
      alert("Complaint deleted");
      fetchComplaints();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  }

  useEffect(() => {
    async function loadComplaints() {
      try {
        const res = await api.get("/api/complaints");
        setComplaints(res.data.complaints);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to fetch complaints");
      }
    }

    loadComplaints();
  }, []);

  return (
    <div className="container">
      <h2>Complaint List Page</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by location"
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={searchByLocation}>Search</button>

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Water Supply">Water Supply</option>
          <option value="Electricity">Electricity</option>
          <option value="Garbage">Garbage</option>
          <option value="Road">Road</option>
        </select>

        <button onClick={fetchComplaints}>Filter</button>
      </div>

      {complaints.map((item) => (
        <div className="card" key={item._id}>
          <h3>{item.title}</h3>

          <p><b>Name:</b> {item.name}</p>
          <p><b>Email:</b> {item.email}</p>
          <p><b>Category:</b> {item.category}</p>
          <p><b>Location:</b> {item.location}</p>
          <p><b>Description:</b> {item.description}</p>
          <p><b>Status:</b> {item.status}</p>

          <div className="ai-box">
            <h4>AI Analysis</h4>
            <p><b>Priority:</b> {item.aiAnalysis?.priority}</p>
            <p><b>Department:</b> {item.aiAnalysis?.department}</p>
            <p><b>Summary:</b> {item.aiAnalysis?.summary}</p>
            <p><b>Response:</b> {item.aiAnalysis?.response}</p>
          </div>

          <select
            value={item.status}
            onChange={(e) => updateStatus(item._id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button className="delete" onClick={() => deleteComplaint(item._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Complaints;
