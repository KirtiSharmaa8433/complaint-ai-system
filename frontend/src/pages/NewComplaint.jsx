import { useState } from "react";
import api from "../api/api";

function NewComplaint() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    category: "Water Supply",
    location: ""
  });

  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await api.post("/api/complaints", form);
      setResult(res.data.complaint);
      alert("Complaint submitted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Complaint failed");
    }
  }

  return (
    <div className="container">
      <h2>Complaint Registration Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Complaint Title"
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Complaint Description"
          required
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>

        <select
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="Water Supply">Water Supply</option>
          <option value="Electricity">Electricity</option>
          <option value="Garbage">Garbage</option>
          <option value="Road">Road</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          required
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <button type="submit">Submit Complaint</button>
      </form>

      {result && (
        <div className="ai-box">
          <h3>AI Analysis Result</h3>
          <p><b>Priority:</b> {result.aiAnalysis?.priority}</p>
          <p><b>Department:</b> {result.aiAnalysis?.department}</p>
          <p><b>Summary:</b> {result.aiAnalysis?.summary}</p>
          <p><b>Response:</b> {result.aiAnalysis?.response}</p>
        </div>
      )}
    </div>
  );
}

export default NewComplaint;