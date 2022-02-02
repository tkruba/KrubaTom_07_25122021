import React, { useState } from 'react';

import { SLabel, SNewPostForm, SNewPostText, SSubmit } from './style';

// Formulaire de création de commentaire
const NewCommentForm = (props) => {

    // Valeur du texte du formulaire
    const [value, setValues] = useState({
        comment: ''
    });

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

    // Gère l'envoi des données du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        // Fait une requête de création de commentaire au serveur
        fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/comments/' + props.post.id, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ comment: comment })
        })
            .then(res => {
                if (!res.ok) throw new Error(res.json());
                return res.json();
            })
            .then(res => {
                refreshComments();
                handlePopup();
                toggleScrollLock();
            })
            .catch(err => console.error(err));
    };

    // Dévérouille la possibilité de scroller dans la page web
    const toggleScrollLock = () => {
        document.querySelector('html').classList.toggle('scroll-lock');
    };

    // Gère l'affichage des commentaires
    const handleComments = (e) => {
        props.comments(e);
    };

    // Gère l'affichage des popups
    const handlePopup = () => {
        props.popup(null);
    };

    // Fait une requête de récuperation des commentaires au serveur
    const refreshComments = () => {

        fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/comments/' + props.post.id, {
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
                return res.comments;
            })
            .then(comments => {
                handleComments(comments);
            })
            .catch(err => console.error(err.error));
    };

    return (
        <SNewPostForm onSubmit={handleSubmit.bind(this)}>
            <SLabel htmlFor='comment' hidden>Dites ce qui vous passe par la tête</SLabel>
            <SNewPostText type="text" name="comment" id="comment" placeholder='Dites ce qui vous passe par la tête' value={value.comment} onChange={handleInputChange.bind(this)} />

            {comment ? <SSubmit type="submit" value="Commenter"></SSubmit> : null}
        </SNewPostForm>
    );
};

export default NewCommentForm;