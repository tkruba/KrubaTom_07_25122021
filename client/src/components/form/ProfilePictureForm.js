import React, { useState } from 'react';

import { SLabel, SNewPostForm, SNewPostFileInput, SNewPostFileName, SSubmit } from './style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Formulaire d'envoi d'une nouvelle image de profil
const ProfilePictureForm = (props) => {

    // Fichier du formulaire
    const [selectedFile, setSelectedFile] = useState(null);

    // Supprime le fichier du formulaire
    const deleteAttachement = (e) => {
        e.preventDefault();
        setSelectedFile(false);
    };

    // Gère l'envoi des données du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('image', selectedFile);

        // Fait une requête de changement d'image de profil au serveur
        fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/user/' + props.accountId, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
            .then(res => {
                if (!res.ok) return res.json().then(text => {throw new Error(text.error)});
                return res.json();
            })
            .then(res => {
                handlePopup();
                toggleScrollLock();
                window.location.reload();
            })
            .catch(err => console.error(err.message));
    };

    // Dévérouille la possibilité de scroller dans la page web
    const toggleScrollLock = () => {
        document.querySelector('html').classList.toggle('scroll-lock');
    };

    // Gère l'affichage des popups
    const handlePopup = () => {
        props.popup(null);
    };

    return (
        <SNewPostForm onSubmit={handleSubmit.bind(this)}>

            {selectedFile ? <SLabel htmlFor='attachement' onClick={(e) => deleteAttachement(e)}><FontAwesomeIcon icon={faTrashAlt} /> Supprimer une image ?</SLabel> : <SLabel htmlFor='attachement'><FontAwesomeIcon icon={faFileImage} /> Ajouter une image ?</SLabel>}
            <SNewPostFileInput type="file" accept=".png, .jpeg, .jpg" name="attachement" id="attachement" onChange={(e) => setSelectedFile(e.target.files[0])} />
            {selectedFile ? <SNewPostFileName>{selectedFile.name}</SNewPostFileName> : null}
            {selectedFile ? <SSubmit type="submit" value="Poster"></SSubmit> : null}
        </SNewPostForm>
    );
};

export default ProfilePictureForm;