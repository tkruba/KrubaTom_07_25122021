import React, { useState } from 'react';

const LoginForm = () => {
    
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleEmailInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            email: event.target.value,
        }));
    }
    
    const handlePasswordInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            password: event.target.value,
        }));
    }

    const login = () => {
        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: values,
            }),
        })
            .then((res) => res.json())
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login();
        setSubmitted(true);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {submitted ? <div className="success-message">Succes !</div> : null}
                <label for="email">Addresse e-mail</label>
                <input type="email" name="email" required="required" value={values.email} onChange={handleEmailInputChange} placeholder='utilisateur@groupomania.fr' />
                
                <label for="password">Mot de passe</label>
                <input type="password" name="password" value={values.password} onChange={handlePasswordInputChange} required="required" />

                <input type="submit" value="Connexion" />
            </form>
        </div>
    );
};

export default LoginForm;