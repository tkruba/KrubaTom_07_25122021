import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from './pages/Profile';
import Post from './pages/Post';
import NotFound from "./pages/NotFound";

import { UserContext } from './UserContext';

const App = () => {

  // Utilisateur actif
  const [user, setUser] = useState(null);

  // Initie le rafraichissement du cookie d'accès
  useEffect(() => {
    if (user) {
      setInterval(refreshToken, 14 * 60 * 1000);
    }
  });

  // Rafraichis le cookie d'accès
  const refreshToken = () => {
    fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/auth/refresh', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;