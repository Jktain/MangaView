import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserId(parseInt(payload.nameid)); // якщо в токені nameid (ASP.NET default)
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Token decode error", err);
        logout();
      }
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, userId, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
