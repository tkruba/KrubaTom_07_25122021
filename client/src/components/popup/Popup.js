import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewPostForm from '../form/NewPostForm';

import { UserContext } from '../../UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { SPopupArea, SPopup, SPopupClose, SPopupHeader, SPopupTitle, SPopupButtons, SPopupButton } from './style';
import ProfilePictureForm from '../form/ProfilePictureForm';
import NewCommentForm from '../form/NewCommentForm';

// Popup
const Popup = (props) => {

    const navigate = useNavigate();

    // Utilisateur actif
    const { user, setUser } = useContext(UserContext);

    // Ferme le popup et dévérouille le scroll de la page
    const closePopup = () => {
        handlePopup(null);
        toggleScrollLock();
    };

    // Change l'état du scroll de la page
    const toggleScrollLock = () => {
        document.querySelector('html').classList.toggle('scroll-lock');
    };

    // Gère le popup
    const handlePopup = () => {
        props.popup(null);
    };

    // Fait une requête pour supprimer un poste au serveur
    const deletePost = () => {
        fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/posts/' + props.deletePost.id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) throw new Error(res.json());
            return res.json();
        })
        .then(() => {
            closePopup();
            window.location.reload();
        })
        .catch(err => console.error(err.error));
    };

    // Fait une requête pour supprimer un poste au serveur
    const deleteComment = () => {
        fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/comments/' + props.deleteComment.id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then(res => {
                if (!res.ok) throw new Error(res.json());
                return res.json();
            })
            .then(res => {
                closePopup();
                getComments();
            })
            .catch(err => console.error(err.error));
    };

    const getComments = () => {
        fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/comments/' + props.post.id, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => {
                if (!res.ok) throw new Error(res.json());
                return res.json();
            })
            .then(res => {
                handleComments(res.comments);
            })
            .catch(err => console.error(err.error));
    }

    const handleComments = (e) => {
        props.comments(e);
    }

    // Fait une requête pour supprimer un utilisateur au serveur
    const deleteAccount = () => {
        fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/user/' + props.deleteAccount.id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) throw new Error(res.json());
            return res.json();
        })
        .then(res => {
            console.log(res);
            if (res.logout) {
                closePopup();
                navigate('/login');
                setUser(null);
            } else {
                closePopup();
                navigate('/');
            }
        })
        .catch(err => console.error(err.error));
    };

    // Vérouille le scroll de la page à l'affichage du popup
    useEffect(() => {
        toggleScrollLock();
    });

    return (
        <SPopupArea>
            <SPopup>
                <SPopupHeader>
                    <SPopupClose onClick={() => closePopup()}>
                        <FontAwesomeIcon icon={faTimes} />
                    </SPopupClose>
                    {props.newPost ? <SPopupTitle>Nouveau post</SPopupTitle> : null}
                    {props.newComment ? <SPopupTitle>Nouveau commentaire</SPopupTitle> : null}
                    {props.deletePost ? <SPopupTitle>Supprimer ce post ?</SPopupTitle> : null}
                    {props.deleteComment ? <SPopupTitle>Supprimer ce commentaire ?</SPopupTitle> : null}
                    {props.deleteAccount ? <SPopupTitle>Supprimer ce compte ?</SPopupTitle> : null}
                    {props.changeProfilePicture ? <SPopupTitle>Changer d'image de profil</SPopupTitle> : null}
                </SPopupHeader>

                {props.newPost ? <NewPostForm posts={props.posts} popup={props.popup} /> : null}
                {props.newComment ? <NewCommentForm post={props.post} popup={props.popup} comments={props.comments} /> : null}

                {props.changeProfilePicture ? <ProfilePictureForm accountId={props.accountId} popup={props.popup}/> : null}
                {props.deletePost ? <SPopupButtons>
                    <SPopupButton onClick={() => closePopup()}>Annuler</SPopupButton>
                    <SPopupButton onClick={() => deletePost()} confirm>Confirmer</SPopupButton>
                </SPopupButtons> : null}
                
                {props.deleteComment ? <SPopupButtons>
                    <SPopupButton onClick={() => closePopup()}>Annuler</SPopupButton>
                    <SPopupButton onClick={() => deleteComment()} confirm>Confirmer</SPopupButton>
                </SPopupButtons> : null}

                {props.deleteAccount ? <SPopupButtons>
                    <SPopupButton onClick={() => closePopup()}>Annuler</SPopupButton>
                    <SPopupButton onClick={() => deleteAccount()} confirm>Confirmer</SPopupButton>
                </SPopupButtons> : null}
            </SPopup>
        </SPopupArea>
    );
};

export default Popup;