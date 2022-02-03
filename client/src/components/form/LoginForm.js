import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../UserContext';

import { SForm, SLabel, SInput, SSubmit, SFormError } from './style';

// Formulaire de connexion
const LoginForm = () => {

    const navigate = useNavigate();

    // Utilisateur actif
    const { user, setUser } = useContext(UserContext);

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Valeurs du formulaire
    const [value, setValues] = useState({
        email: '',
        password: '',
    });

    const {
        email,
        password
    } = value;

    const [errors, setErrors] = useState([]);

    // Gère les changements de données dans le formulaire
    const handleInputChange = (e) => {
        e.persist();
        setValues((value) => ({
            ...value,
            [e.target.name]: e.target.value,
        }));
    };

    // Gère l'envoi des données du formulaire
    const handleSubmit = (event) => {
        event.preventDefault();
        let err = [];
        if (!emailRegex.test(email)) err.push('• Adresse e-mail invalide.');
        if (emailRegex.test(email)) login();
    };

    // Fait une requête d'authentification au serveur
    const login = () => {
        fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/auth/login', {
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
                if (!res.ok) return res.json().then(text => { throw new Error(text.error)});
                return res.json();
            })
            .then(res => {
                setErrors([]);
                setUser(res.user);
                navigate('/');
            })
            .catch((err) => {
                setErrors(['• ' + err.message]);
            });
    };

    return (
        <SForm onSubmit={handleSubmit}>
            <SLabel htmlFor="email">Adresse e-mail</SLabel>
            <SInput type="email" name="email" id="email" required="required" value={value.email} onChange={handleInputChange.bind(this)} placeholder='utilisateur@groupomania.fr' />

            <SLabel htmlFor="password">Mot de passe</SLabel>
            <SInput type="password" name="password" id="password" value={value.password} onChange={handleInputChange.bind(this)} required="required" />
            {errors.length > 0 ? <SFormError>{errors.map(err => (
                <span key={errors.indexOf(err)}>{err}</span>
            ))}</SFormError> : null}
            <SSubmit type="submit" value="Se connecter" />
        </SForm>
    );
};

export default LoginForm;