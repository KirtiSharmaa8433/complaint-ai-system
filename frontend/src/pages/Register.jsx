import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Register({ onAuthSuccess }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/signup", form);
      onAuthSuccess(res.data.token);
      alert("Signup successful");
      navigate("/complaints");
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Signup failed");
    }
  }

  return (
    <div className="container">
      <h2>User Signup</h2>

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
          type="password"
          placeholder="Password"
          required
          minLength={6}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Register;
