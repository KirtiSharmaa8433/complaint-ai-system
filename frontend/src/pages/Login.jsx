import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login({ onAuthSuccess }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", form);
      onAuthSuccess(res.data.token);
      alert("Login successful");
      navigate("/complaints");
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Login failed");
    }
  }

  return (
    <div className="container">
      <h2>User Login</h2>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
