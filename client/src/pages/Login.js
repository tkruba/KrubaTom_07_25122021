import React from 'react';
import LoginForm from '../components/login/LoginForm';
import { Routes, Route, Link} from "react-router-dom"
import Register from './Register';

const Login = () => {

    return (
        <div>
           <h1>Login</h1>
           <LoginForm />
            <Link to="/register">S'enregistrer</Link>
            <Routes>
                <Route path="/register" element={<Register />}></Route>
            </Routes>
        </div>
    );
};

export default Login;