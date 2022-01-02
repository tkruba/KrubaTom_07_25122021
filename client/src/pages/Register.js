import React from 'react';
import RegisterForm from '../components/register/RegisterForm';
import { Routes, Route, Link} from "react-router-dom"
import Login from "./Login"

const Register = () => {
    return (
        <div>
            <h1>Register</h1>
            <RegisterForm />
            <Link to="/login">Se connecter</Link>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </div>
    );
};

export default Register;