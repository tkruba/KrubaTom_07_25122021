import React, { useState } from 'react';

const LoginForm = () => {
    
    const [value, setValues] = useState({
        email: '',
        password: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        e.persist();
        setValues((value) => ({
            ...value,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login();
        setSubmitted(true);
    }
    
    const login = () => {
        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({
                user: value,
            }),
        })
            .then((res) => res.json())
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {submitted ? <div className="success-message">Succes !</div> : null}
                <label for="email">Addresse e-mail</label>
                <input type="email" name="email" required="required" value={value.email} onChange={handleInputChange.bind(this)} placeholder='utilisateur@groupomania.fr' />
                
                <label for="password">Mot de passe</label>
                <input type="password" name="password" value={value.password} onChange={handleInputChange.bind(this)} required="required" />

                <input type="submit" value="Connexion" />
            </form>
        </div>
    );
};

export default LoginForm;