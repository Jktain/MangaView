import { useState, useContext } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/auth/login", form);
      login(response.data.token); // збереження токена в контекст
      navigate("/"); // редірект на головну
    } catch (err) {
      setError(err.response?.data?.message || "Помилка при вході.");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h2>Вхід</h2>
      <form onSubmit={handleSubmit} style={{ width: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Пароль" required value={form.password} onChange={handleChange} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
};

export default LoginPage;