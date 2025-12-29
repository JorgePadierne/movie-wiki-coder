import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulación de login
  const login = async (email, password) => {
    setLoading(true);
    // Simular retraso de red
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simular un usuario con datos básicos y una foto de ejemplo
    const mockUser = {
      uid: "12345",
      displayName: "Cinephile User",
      email: email,
      photoURL:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop",
    };

    setUser(mockUser);
    setLoading(false);
    return mockUser;
  };

  // Simulación de registro
  const register = async (name, email, password, photoURL) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newUser = {
      uid: Math.random().toString(36).substring(7),
      displayName: name,
      email: email,
      photoURL:
        photoURL ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop",
    };

    setUser(newUser);
    setLoading(false);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
