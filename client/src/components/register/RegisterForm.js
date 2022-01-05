import React, { useState } from 'react';


const RegisterForm = () => {

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

        if (e.target.id === "password" && !passwordValidate.test(e.target.value)) {
            console.log("pwd no matching regex");
        }
        if (e.target.id === "password" && passwordValidate.test(e.target.value)) {
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

    const passwordValidate = new RegExp('(?=.*[A-Z])(?=.*[!@#$&*.?])(?=.*[0-9])(?=.*[a-z]).{7,15}');

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
                    let err = res.json();
                    throw new Error(err);
                }
            })
            .then(res => {
                console.log(res);
            })
            .catch((err) => {
                console.log("Error:", err);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*.?])(?=.*[0-9])(?=.*[a-z]).{7,15}/u;

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
        <div>
            <form onSubmit={handleSubmit}>
                <label for="firstname">Prénom</label>
                <input type="text" name="firstname" required="required" value={value.firstname} onChange={handleInputChange.bind(this)} placeholder='Robert' />

                <label for="surname">Nom</label>
                <input type="text" name="surname" required="required" value={value.surname} onChange={handleInputChange.bind(this)} placeholder='LAPALETTE' />

                <label for="email">Addresse e-mail</label>
                <input type="email" name="email" required="required" value={value.email} onChange={handleInputChange.bind(this)} placeholder='utilisateur@groupomania.fr' />

                <label for="password">Mot de passe</label>
                <input type="password" name="password" id="password" required="required" value={value.password} onChange={handleInputChange.bind(this)} />

                <label for="passwordConfirm">Confirmation du mot de passe</label>
                <input type="password" name="passwordConfirm" id="passwordConfirm" required="required" value={value.passwordConfirm} onChange={handleInputChange.bind(this)} />

                <input type="submit" value="Connexion" />
            </form>
        </div>
    );
}
export default RegisterForm;