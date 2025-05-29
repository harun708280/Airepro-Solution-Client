import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchUser = async (activeToken) => {
    if (!activeToken) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        "https://airepro-solution-server.vercel.app/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${activeToken}`,
          },
        }
      );
      setUser(res.data);
    } catch (err) {
      console.log("User fetch failed", err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(token);
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
