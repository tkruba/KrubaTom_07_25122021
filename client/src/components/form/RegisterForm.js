import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SForm, SLabel, SInput, SSubmit } from './style';

const RegisterForm = () => {

    const navigate = useNavigate();

    const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*.?])(?=.*[0-9])(?=.*[a-z]).{7,15}/u;

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

    const handleInputChange = (e) => {
        e.persist();

        if (e.target.id === "password" && !passwordRegex.test(e.target.value)) {
            console.log("pwd no matching regex");
        }
        if (e.target.id === "password" && passwordRegex.test(e.target.value)) {
            console.log("pwd matching regex");
        }

        if (e.target.id === "passwordConfirm" && e.target.value === password) {
            console.log("cnfm = pwd");
        }
        if (e.target.id === "passwordConfirm" && e.target.value !== password) {
            console.log("cfnm =/= pwd");
        }
        setValues((value) => ({
            ...value,
            [e.target.name]: e.target.value,
        }));
    }

    const register = () => {

        fetch('http://localhost:3000/auth/register', {
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
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    let err = res.json().error;
                    throw new Error(err);
                }
            })
            .then(res => {
                navigate('/login');
            })
            .catch((err) => {
                //console.log(err);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (nameRegex.test(firstname) &&
            nameRegex.test(surname) &&
            emailRegex.test(email) &&
            passwordRegex.test(password) &&
            passwordConfirm === password) {
            register();
        } else {
            console.log("Nop");
        }
    }

    return (
        <SForm onSubmit={handleSubmit}>
            <SLabel for="firstname">Prénom</SLabel>
            <SInput type="text" name="firstname" required="required" id="firstname" value={value.firstname} onChange={handleInputChange.bind(this)} placeholder='Robert' />

            <SLabel for="surname">Nom</SLabel>
            <SInput type="text" name="surname" required="required" id="surname" value={value.surname} onChange={handleInputChange.bind(this)} placeholder='LAPALETTE' />

            <SLabel for="email">Adresse e-mail</SLabel>
            <SInput type="email" name="email" required="required" id="email" value={value.email} onChange={handleInputChange.bind(this)} placeholder='utilisateur@groupomania.fr' />

            <SLabel for="password">Mot de passe</SLabel>
            <SInput type="password" name="password" id="password" required="required" id="password" value={value.password} onChange={handleInputChange.bind(this)} />

            <SLabel for="passwordConfirm">Confirmation du mot de passe</SLabel>
            <SInput type="password" name="passwordConfirm" id="passwordConfirm" required="required" id="passwordConfirm" value={value.passwordConfirm} onChange={handleInputChange.bind(this)} />

            <SSubmit type="submit" value="Créer un compte" />
        </SForm>
    );
}
export default RegisterForm;