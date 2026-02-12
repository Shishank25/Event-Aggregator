import { createContext, useContext, useState, useEffect } from "react";
import { API } from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data on mount if token exists
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Fetch user details from your backend
        const response = await API.get("/auth/me");
        setUser(response.data.user); // Adjust based on your API response structure
        setError(null);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        
        // If token is invalid, clear it
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          setUser(null);
        }
        
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function - call after successful OAuth or OTP verification
  const login = async (token) => {
    localStorage.setItem("token", token);
    
    try {
      const response = await API.get("/auth/me");
      setUser(response.data.user);
      setError(null);
      return { success: true };
    } catch (err) {
      console.error("Login failed:", err);
      localStorage.removeItem("token");
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setError(null);
  };

  // Update user profile
  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};