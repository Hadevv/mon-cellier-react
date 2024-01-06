import { useState, useEffect } from "react";

function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticateUser = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUser({ name: "John Doe", email: "john@example.com" });
      setLoading(false);
    };
    authenticateUser();
  }, []);

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = (updatedProfile) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedProfile }));
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login: (credentials) => {
      setUser({ name: "John Doe", email: "john@example.com" });
    },
    logout,
    updateUserProfile,
  };
}

export default useAuth;
