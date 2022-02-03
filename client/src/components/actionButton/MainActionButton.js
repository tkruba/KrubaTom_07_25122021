import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../UserContext';

import Popup from '../popup/Popup';

import { SMainActionButton, SActiveMenu, SMenuItem } from './style';

// Bouton flottant principal
const MainActionButton = (props) => {

    // Utilisateur actif
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    // Etat du menu
    const [menuActive, setMenuState] = useState(false);

    // Changement de l'état du menu
    const changeState = () => {
        if (!menuActive) return setMenuState(true);
        return setMenuState(false);
    };

    const [canPost, setCanPost] = useState(true);

    // Redirection vers la page profil de l'utilisateur actif
    const toProfile = () => {
        navigate('/profile?id=' + user.id);
    };

    // Gère l'affichage des popups
    const handlePopup = (e) => {
        props.popup(e);
    };

    // Affiche un popup de création de poste
    const newPostForm = () => {
        handlePopup(<Popup newPost={true} posts={props.posts} popup={props.popup} />);
    };


    // Deconnexion de l'utilisateur
    const logout = () => {
        fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/auth/logout', {
            method: 'GET',
            credentials: 'include'
        })
            .then((res) => {
                if (!res.ok) return res.json().then(text => {throw new Error(text.error)});
                return res.json();
            })
            .then(res => {
                navigate('/login');
                setUser(null);
            })
            .catch(err => console.error(err.message));
    };

    // Vérifie la page et autorise la création d'un nouveau poste ou non
    useEffect(() => {

        let urlString = window.location.href;
        let url = new URL(urlString);

        if (url.pathname !== '/') return setCanPost(false);
    });

    return (
        <SMainActionButton state={menuActive} onClick={() => changeState()}>
            <img alt="Icone FAB" src={process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/images/icon.svg'}></img>
            {menuActive ?
                <SActiveMenu>
                    <SMenuItem onClick={() => toProfile()}>Voir mon profil.</SMenuItem>
                    {canPost ? <SMenuItem onClick={() => newPostForm()}>Écrire un post.</SMenuItem> : null}
                    <SMenuItem onClick={() => logout()}>Se déconnecter.</SMenuItem>
                </SActiveMenu> : null}
        </SMainActionButton>
    );
};

export default MainActionButton;