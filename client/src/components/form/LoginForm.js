import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';

import { SForm, SLabel, SInput, SSubmit } from './style';

const LoginForm = () => {

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [value, setValues] = useState({
        email: '',
        password: '',
    });

    const {
        email,
        password
    } = value;

    const handleInputChange = (e) => {
        e.persist();
        setValues((value) => ({
            ...value,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!emailRegex.test(email)) return console.log("Email invalide.");
        login();
    }

    const login = () => {
        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error(res.json().error);
                return res.json();
            })
            .then(res => {
                setUser(res.user);
                navigate('/');
            })
            .catch((err) => {

            });
    }

    return (
        <SForm onSubmit={handleSubmit}>
            <SLabel for="email">Adresse e-mail</SLabel>
            <SInput type="email" name="email" required="required" value={value.email} onChange={handleInputChange.bind(this)} placeholder='utilisateur@groupomania.fr' />

            <SLabel for="password">Mot de passe</SLabel>
            <SInput type="password" name="password" value={value.password} onChange={handleInputChange.bind(this)} required="required" />

            <SSubmit type="submit" value="Se connecter" />
        </SForm>
    );
};

export default LoginForm;