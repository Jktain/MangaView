import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Паролі не співпадають.");
      return;
    }

    try {
      await axios.post("/auth/register", {
        email: form.email,
        username: form.username,
        password: form.password
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Помилка при реєстрації.");
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
      <h2>Реєстрація</h2>
      <form onSubmit={handleSubmit} style={{ width: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} />
        <input type="username" name="username" placeholder="Username" required value={form.username} onChange={handleChange} />
        <input type="password" name="password" placeholder="Пароль" required value={form.password} onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="Повторіть пароль" required value={form.confirmPassword} onChange={handleChange} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
};

export default RegisterPage;