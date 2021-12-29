import React from 'react';

const LoginForm = () => {
    return (
        <div>
            <form>
                <label for="email">Addresse e-mail</label>
                <input type="email" name="email" placeholder='utilisateur@groupomania.fr' />
                
                <label for="password">Mot de passe</label>
                <input type="password" name="password" />

                <input type="submit" value="Connexion" />
            </form>
        </div>
    );
};

export default LoginForm;