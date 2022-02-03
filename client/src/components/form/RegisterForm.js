import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SForm, SLabel, SInput, SFormError, SSubmit } from './style';

// Formulaire d'enregistrement d'utilisateur
const RegisterForm = () => {

    const navigate = useNavigate();

    // Expressions régulières
    const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*.?])(?=.*[0-9])(?=.*[a-z]).{7,15}/u;

    // Valeurs du formulaire
    const [value, setValues] = useState({
        firstname: '',
        surname: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const {
        firstname,
        surname,
        email,
        password,
        passwordConfirm
    } = value;

    const [errors, setErrors] = useState([]);

    // Gère les changements de valeurs du formulaire
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
        if (!nameRegex.test(firstname)) err.push('• Prénom invalide.');
        if (!nameRegex.test(surname)) err.push('• Nom invalide.');
        if (!emailRegex.test(email)) err.push('• Adresse e-mail invalide.');
        if (!passwordRegex.test(password)) err.push('• Mot de passe invalide (doit contenir entre 7 et 15 caractère avoir 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et 1 caractère spécial minimum).');
        if (passwordConfirm !== password) err.push('• Confirmation de mot de passe invalide.');

        setErrors(err);
        if (nameRegex.test(firstname) &&
            nameRegex.test(surname) &&
            emailRegex.test(email) &&
            passwordRegex.test(password) &&
            passwordConfirm === password) {
            register();
        }
    };

    // Fait une requête d'enregistrement d'utilisateur au serveur
    const register = () => {

        fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({
                firstname: firstname,
                surname: surname,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm
            }),
        })
            .then(res => {
                if (!res.ok) return res.json().then(text => {throw new Error(text.error)});
                return res.json();
            })
            .then(res => {
                setErrors([]);
                navigate('/login');
            })
            .catch(err => {
                setErrors(['• ' + err.message]);
            });
    };


    return (
        <SForm onSubmit={handleSubmit}>
            <SLabel htmlFor="firstname">Prénom</SLabel>
            <SInput type="text" name="firstname" required="required" id="firstname" value={value.firstname} onChange={handleInputChange.bind(this)} placeholder='Robert' />

            <SLabel htmlFor="surname">Nom</SLabel>
            <SInput type="text" name="surname" required="required" id="surname" value={value.surname} onChange={handleInputChange.bind(this)} placeholder='LAPALETTE' />

            <SLabel htmlFor="email">Adresse e-mail</SLabel>
            <SInput type="email" name="email" required="required" id="email" value={value.email} onChange={handleInputChange.bind(this)} placeholder='utilisateur@groupomania.fr' />

            <SLabel htmlFor="password">Mot de passe</SLabel>
            <SInput type="password" name="password" id="password" required="required" id="password" value={value.password} onChange={handleInputChange.bind(this)} />

            <SLabel htmlFor="passwordConfirm">Confirmation du mot de passe</SLabel>
            <SInput type="password" name="passwordConfirm" id="passwordConfirm" required="required" id="passwordConfirm" value={value.passwordConfirm} onChange={handleInputChange.bind(this)} />
            {errors.length > 0 ? <SFormError>{errors.map(err => (
                <span key={errors.indexOf(err)}>{err}</span>
            ))}</SFormError> : null}
            <SSubmit type="submit" value="Créer un compte" />
        </SForm>
    );
}
export default RegisterForm;