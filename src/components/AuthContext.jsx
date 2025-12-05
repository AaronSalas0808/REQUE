// context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedIdeas, setSavedIdeas] = useState([]);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('recycleUser');
    const savedIdeasData = localStorage.getItem('savedIdeas');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedIdeasData) {
      setSavedIdeas(JSON.parse(savedIdeasData));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('recycleUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('recycleUser');
  };

  const saveIdea = (idea) => {
    const updatedIdeas = [...savedIdeas, idea];
    setSavedIdeas(updatedIdeas);
    localStorage.setItem('savedIdeas', JSON.stringify(updatedIdeas));
  };

  const removeSavedIdea = (id) => {
    const updatedIdeas = savedIdeas.filter(idea => idea.id !== id);
    setSavedIdeas(updatedIdeas);
    localStorage.setItem('savedIdeas', JSON.stringify(updatedIdeas));
  };

  const addPostedIdea = (idea) => {
    if (user) {
      const updatedUser = {
        ...user,
        postedIdeas: [...(user.postedIdeas || []), idea]
      };
      setUser(updatedUser);
      localStorage.setItem('recycleUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      savedIdeas,
      saveIdea,
      removeSavedIdea,
      addPostedIdea
    }}>
      {children}
    </AuthContext.Provider>
  );
};