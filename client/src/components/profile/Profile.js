import React, { useContext, useState } from 'react';
import { SProfile, SProfileUser, SProfilePicture, SProfileEmailContainer, SProfileEmail, SProfileActions, SProfileButtons } from './style';

import { UserContext } from '../../UserContext';

import Popup from '../popup/Popup';

// Profile
const Profile = (props) => {

    // Utilisateur actif
    const { user, setUser } = useContext(UserContext);

    const name = props.data.firstname.charAt(0).toUpperCase() + props.data.firstname.toLowerCase().slice(1) + ' '
        + props.data.surname.charAt(0).toUpperCase() + props.data.surname.toLowerCase().slice(1);

    const profileImgAlt = 'Photo de profil de ' + name;

    const mailto = 'mailto:' + props.data.email;

    // Gère les popups
    const handlePopup = (e) => {
        props.popup(e);
    };

    // Créer un popup de suppression de compte
    const deleteAccount = () => {
        handlePopup(<Popup deleteAccount={props.data} accountId={props.data.id} popup={props.popup}></Popup>);
    };

    // Créer un popup d'envoi d'image
    const changeProfilePicture = () => {
        handlePopup(<Popup changeProfilePicture={true} accountId={props.data.id} popup={props.popup}></Popup>);
    };

    return (
        <SProfile>
            <SProfileUser>{name}</SProfileUser>
            <SProfilePicture src={props.data.pictureUrl} alt={profileImgAlt} />
            <SProfileEmailContainer>
                Adresse e-mail: <br/>
                <SProfileEmail href={mailto}>{props.data.email}</SProfileEmail>
            </SProfileEmailContainer>
            {(props.data.id === user.id) || (user.isAdmin === 1) ?
            <SProfileActions>
                {props.data.id === user.id ? <SProfileButtons onClick={() => changeProfilePicture()}>Change d'image de profil</SProfileButtons> : null}
                <SProfileButtons onClick={() => {deleteAccount()}} admin>Supprimer mon compte</SProfileButtons>
            </SProfileActions> : null}
        </SProfile>
    );
};

export default Profile;