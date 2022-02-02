import React, { useContext, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { UserContext } from '../UserContext';

import Header from '../components/header/Header'

import Register from './Register';
import LoginForm from '../components/form/LoginForm';

// Page de connexion
const Login = () => {

    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    // Redirige l'utilisateur vers la page d'accueil si celui-ci est actif
    useEffect(() => {
        if (user) navigate('/');
    });

    return (
        <div>
            <Header />
            <div className='card'>
                <h1>Connexion</h1>
                <LoginForm />
                <span>Pas de compte ? <Link to="/register">S'inscrire</Link></span>
                <Routes>
                    <Route path="/register" element={<Register />}></Route>
                </Routes>
            </div>
        </div>
    );
};

export default Login;