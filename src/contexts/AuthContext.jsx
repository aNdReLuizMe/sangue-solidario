import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('sangueVoluntario_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('sangueVoluntario_users') || '[]');
        const userFound = users.find(u => u.email === email && u.password === password);
        
        if (userFound) {
          const { password, ...userWithoutPassword } = userFound;
          setUser(userWithoutPassword);
          localStorage.setItem('sangueVoluntario_user', JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Email ou senha incorretos'));
        }
      }, 1000);
    });
  };

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = JSON.parse(localStorage.getItem('sangueVoluntario_users') || '[]');
          
          if (users.find(u => u.email === userData.email)) {
            reject(new Error('Email já cadastrado'));
            return;
          }

          const newUser = {
            id: Date.now().toString(),
            ...userData,
            createdAt: new Date().toISOString(),
            donationCount: 0,
            appointments: []
          };

          users.push(newUser);
          localStorage.setItem('sangueVoluntario_users', JSON.stringify(users));
          
          const { password, ...userWithoutPassword } = newUser;
          setUser(userWithoutPassword);
          localStorage.setItem('sangueVoluntario_user', JSON.stringify(userWithoutPassword));
          
          resolve(userWithoutPassword);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sangueVoluntario_user');
  };

  const updateUser = (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = JSON.parse(localStorage.getItem('sangueVoluntario_users') || '[]');
          const userIndex = users.findIndex(u => u.id === user.id);
          
          if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...userData };
            localStorage.setItem('sangueVoluntario_users', JSON.stringify(users));
            
            const { password, ...userWithoutPassword } = users[userIndex];
            setUser(userWithoutPassword);
            localStorage.setItem('sangueVoluntario_user', JSON.stringify(userWithoutPassword));
            resolve(userWithoutPassword);
          } else {
            reject(new Error('Usuário não encontrado'));
          }
        } catch (error) {
          console.error('Erro ao atualizar usuário:', error);
          reject(error);
        }
      }, 500);
    });
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
