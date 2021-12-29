import React from 'react';

const RegisterForm = () => {
    return (
        <div>
            <form>
                <label for="firstname">Prénom</label>
                <input type="text" name="firstname" placeholder='Robert' />

                <label for="surname">Prénom</label>
                <input type="text" name="surname" placeholder='LAPALETTE' />

                <label for="email">Addresse e-mail</label>
                <input type="email" name="email" placeholder='utilisateur@groupomania.fr' />

                <label for="password">Mot de passe</label>
                <input type="password" name="password" />

                <label for="passwordConfirm">Confirmation du mot de passe</label>
                <input type="password" name="passwordConfirm" />

                <input type="submit" value="Connexion" />
            </form>
        </div>
    );
};

export default RegisterForm;