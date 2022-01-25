import React, { useContext, useState, useEffect } from 'react';
import LoginForm from '../components/form/LoginForm';
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import Register from './Register';
import { UserContext } from '../UserContext';

const Login = () => {

    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) navigate('/');
    });

    return (
        <div className='card'>
            <h1>Connexion</h1>
            <LoginForm />
            <span>Pas de compte ? <Link to="/register">S'inscrire</Link></span>
            <Routes>
                <Route path="/register" element={<Register />}></Route>
            </Routes>
        </div>
    );
};

export default Login;