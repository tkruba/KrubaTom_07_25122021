import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SLabel, SNewPostForm, SNewPostFileInput, SNewPostText, SNewPostFileName, SSubmit } from './style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Formulaire de création de poste
const NewPostForm = (props) => {

    const navigate = useNavigate();

    // Valeur du texte du formulaire
    const [value, setValues] = useState({
        comment: ''
    });

    // Fichier du formulaire
    const [selectedFile, setSelectedFile] = useState(null);

    const {
        comment,
    } = value;

    // Gère les changements des valeurs du formulaire
    const handleInputChange = (e) => {
        e.persist();
        setValues((value) => ({
            ...value,
            [e.target.name]: e.target.value,
        }));
    };

    // Supprime le fichier du formulaire
    const deleteAttachement = (e) => {
        e.preventDefault();
        setSelectedFile(false);
    };

    // Gère l'envoi des données du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('post', JSON.stringify({ message: comment }));
        formData.append('image', selectedFile);

        // Fait une requête de création de poste au serveur
        fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/posts', {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
            .then(res => {
                if (!res.ok) throw new Error(res.json());
                return res.json();
            })
            .then(res => {
                refreshPosts();
                handlePopup();
                toggleScrollLock();
            })
            .catch(err => console.error(err));
    };

    // Dévérouille la possibilité de scroller dans la page web
    const toggleScrollLock = () => {
        document.querySelector('html').classList.toggle('scroll-lock');
    };

    // Gère l'affichage des posts
    const handlePosts = (e) => {
        props.posts(e);
    };

    // Gère l'affichage des popups
    const handlePopup = () => {
        props.popup(null);
    };

    // Fait une requête de récuperation des postes au serveur
    const refreshPosts = () => {

        fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/posts', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(res => {
                if (!res.ok) throw new Error(res.json());
                return res.json();
            })
            .then(res => {
                return res.posts;
            })
            .then(post => {
                handlePosts(post);
                let urlString = window.location.href;
                let url = new URL(urlString);
                if (!url.pathname === '/') navigate('/');
            })
            .catch(err => console.error(err.error));
    };

    return (
        <SNewPostForm onSubmit={handleSubmit.bind(this)}>
            <SLabel htmlFor='comment' hidden>Dites ce qui vous passe par la tête</SLabel>
            <SNewPostText type="text" name="comment" id="comment" placeholder='Dites ce qui vous passe par la tête' value={value.comment} onChange={handleInputChange.bind(this)} />

            {selectedFile ? <SLabel htmlFor='attachement' onClick={(e) => deleteAttachement(e)}><FontAwesomeIcon icon={faTrashAlt} /> Supprimer une image ?</SLabel> : <SLabel htmlFor='attachement'><FontAwesomeIcon icon={faFileImage} /> Ajouter une image ?</SLabel>}
            <SNewPostFileInput type="file" accept=".png, .jpeg, .jpg" name="attachement" id="attachement" onChange={(e) => setSelectedFile(e.target.files[0])} />
            {selectedFile ? <SNewPostFileName>{selectedFile.name}</SNewPostFileName> : null}
            {selectedFile || comment ? <SSubmit type="submit" value="Poster"></SSubmit> : null}
        </SNewPostForm>
    );
};

export default NewPostForm;