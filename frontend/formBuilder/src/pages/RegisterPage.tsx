import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { email, password });
      setSuccess(true);
      setError("");
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
      setSuccess(false);
    }
  };

  return (
    <div style={{ width: 300, margin: "80px auto" }}>
      <h2>Register</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={handleRegister}>Register</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Registration successful! Redirecting...</p>}

      <p style={{ marginTop: 20 }}>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
};

export default RegisterPage;
