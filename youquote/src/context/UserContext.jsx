import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext("");

const UserContext = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const IsLogged = async () => {
    try {
      const response = await fetch("/api/islogged", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("user Authentifier info : ",result);
      
      if (result.authenticated) {
        setUser(result.user);
        setUserId(result.user.id);
        setRole(result.role);
        setIsAuthenticated(true);
        return true;
      } else {
        setUser(null);
        setUserId(null);
        setIsAuthenticated(false);
        setRole(null);
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      setUser(null);
      setUserId(null);
      setIsAuthenticated(false);
      setRole(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    const result = await response.json();

    if (result.success) {
      setIsAuthenticated({
        isAuthenticated: false,
        user: null,
      });
      navigate("/");
      window.location.reload();
    } else {
      console.error(result.message);
    }
  };

  const values = {
    user,
    setUser,
    userId,
    setUserId,
    role,
    setRole,
    isAuthenticated,
    setIsAuthenticated,
    logout: handleLogout,
  };


  useEffect(() => {
    IsLogged();
  }, []);

  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-lg text-gray-700 font-medium">Loading{dots}</p>
      </div>
    );

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export default UserContext;
