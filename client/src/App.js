import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"

import { UserContext } from './UserContext';

const App = () => {

  // const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          email: "email",
          password: "password",
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error(res.json().error);
          return res.json();
        })
        .then(res => {
          setUser(res.user);
        })
        .catch((err) => {
          return <Navigate to="/login" />;
        });
    }
  }, [setUser]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;