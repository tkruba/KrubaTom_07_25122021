import React, { useContext, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { UserContext } from '../UserContext';

import Header from '../components/header/Header';

import Login from "./Login";
import RegisterForm from '../components/form/RegisterForm';

// Page d'enregistrement
const Register = () => {

    const navigate = useNavigate();

    // Utilisateur actif
    const { user } = useContext(UserContext);

    // Redirige l'utilisateur vers la page d'accueil si celui-ci est actif
    useEffect(() => {
        if (user) navigate('/');
    });

    return (
        <div>
            <Header />
            <div className='card'>
                <h1>S'inscrire</h1>
                <RegisterForm />
                <span>Déjà inscrit ? <Link to="/login">Se connecter</Link></span>
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                </Routes>
            </div>
        </div>
    );
};

export default Register;