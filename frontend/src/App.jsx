import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewComplaint from "./pages/NewComplaint";
import Complaints from "./pages/Complaints";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  function handleAuthSuccess(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Register Complaint</Link>
        <Link to="/complaints">Complaints</Link>

        {token ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Signup</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<NewComplaint />} />
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/complaints" />
            ) : (
              <Login onAuthSuccess={handleAuthSuccess} />
            )
          }
        />
        <Route
          path="/register"
          element={
            token ? (
              <Navigate to="/complaints" />
            ) : (
              <Register onAuthSuccess={handleAuthSuccess} />
            )
          }
        />
        <Route
          path="/complaints"
          element={token ? <Complaints /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
