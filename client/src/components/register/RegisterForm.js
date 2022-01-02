import React from 'react';

const RegisterForm = () => {
    return (
        <div>
            <form>
                <label for="firstname">Prénom</label>
                <input type="text" name="firstname" required="required" placeholder='Robert' />

                <label for="surname">Nom</label>
                <input type="text" name="surname" required="required" placeholder='LAPALETTE' />

                <label for="email">Addresse e-mail</label>
                <input type="email" name="email" required="required" placeholder='utilisateur@groupomania.fr' />

                <label for="password">Mot de passe</label>
                <input type="password" name="password" required="required" />

                <label for="passwordConfirm">Confirmation du mot de passe</label>
                <input type="password" name="passwordConfirm" required="required" />

                <input type="submit" value="Connexion" />
            </form>
        </div>
    );
};

export default RegisterForm;