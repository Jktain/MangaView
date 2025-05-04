import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav style={{
      background: "#111",
      height: "64px",                     // фіксована висота
      width: "100%",                      // тягнеться на всю ширину
      display: "flex",
      alignItems: "center",              // вирівнює вертикально по центру
      justifyContent: "space-between",   // логотип ліворуч, посилання праворуч
      padding: "0 30px",                 // горизонтальні відступи
      borderBottom: "1px solid #333",
      boxSizing: "border-box",
      position: "relative",              // або fixed/top-0, якщо хочеш прибити зверху
      zIndex: 1000
    }}>
      {/* Логотип / Назва */}
      <Link to="/" style={{ color: "white", fontSize: "22px", fontWeight: "bold", textDecoration: "none" }}>
        MangaView
      </Link>

      {/* Навігація */}
      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <Link to="/" style={linkStyle}>Каталог</Link>

        {isAuthenticated ? (
          <>
            <Link to="/add-manga" style={linkStyle}>Додати</Link>
            <button onClick={logout} style={buttonStyle}>Вийти</button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Увійти</Link>
            <Link to="/register" style={linkStyle}>Реєстрація</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px"
};

const buttonStyle = {
  background: "transparent",
  border: "none",
  color: "#f55",
  fontSize: "16px",
  cursor: "pointer"
};

export default Navbar;