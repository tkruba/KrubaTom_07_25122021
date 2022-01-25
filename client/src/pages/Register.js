import React, { useContext, useEffect, useState } from 'react';
import RegisterForm from '../components/form/RegisterForm';
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import Login from "./Login"
import { UserContext } from '../UserContext';

const Register = () => {

    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    
    useEffect(() => {
        if (user) navigate('/');
    });

    return (
        <div className='card'>
            <h1>S'inscrire</h1>
            <RegisterForm />
            <span>Déjà inscrit ? <Link to="/login">Se connecter</Link></span>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </div>
    );
};

export default Register;