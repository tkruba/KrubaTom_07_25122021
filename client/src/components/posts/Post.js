import React, { useContext, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { SDiv, SData, SProfilePic, SUser, SActions, SAction, SActionAdmin, SMessage, SImage, SCommentsControl, SComments, SComment, SCommentMessage } from './style';
import Profile from "../../pages/Profile";
import Popup from '../popup/Popup';
import { UserContext } from '../../UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faTrashAlt, faComments, faPen } from '@fortawesome/free-solid-svg-icons';

// Poste
const Post = (props) => {

    const { user, setUser } = useContext(UserContext);

    const [comments, setComments] = useState([]);
    const [commentsShown, setCommentsShown] = useState(false);

    let userProfileUrl = '/profile?id=' + props.data.posterId;

    let name = props.data.firstname.charAt(0).toUpperCase() + props.data.firstname.toLowerCase().slice(1) + ' '
        + props.data.surname.charAt(0).toUpperCase() + props.data.surname.toLowerCase().slice(1);

    let profileImgAlt = 'Photo de profil de ' + name;

    let imgAlt = 'Photo de ' + name;

    // Copie le lien du poste dans le presse papier
    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.origin + '/post?id=' + props.data.id);
    };

    // Gère les popups
    const handlePopup = (e) => {
        props.popup(e);
    }

    // Créer un popup de suppression de poste
    const deletePost = () => {
        handlePopup(<Popup deletePost={props.data} postId={props.data.id} popup={props.popup}></Popup>);
    }

    // Récupère les commentaires du poste
    const getComments = () => {
        fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/comments/' + props.data.id, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => {
                if (!res.ok) return res.json().then(text => {throw new Error(text.error)});
                return res.json();
            })
            .then(res => {
                props.data.comments = res.comments.length;
                if (!res.comments.length > 0) setCommentsShown(false);
                handleComments(res.comments);
            })
            .catch(err => console.error(err.message));
    }

    // Gère les commentaires
    const handleComments = (e) => {
        props.data.comments = e.length;
        setComments(e);
    }

    // Change l'état d'affichage des commentaires
    const toggleComments = () => {
        if (!commentsShown) {
            getComments();
            setCommentsShown(true);
        } else {
            setCommentsShown(false);
        }
    }

    // Fait apparaître le formulaire de création de commentaire
    const newCommentForm = () => {
        handlePopup(<Popup newComment={true} post={props.data} popup={props.popup} comments={handleComments} />);
    }

    // Gère le bouton des commentaires
    const commentSectionHandler = () => {
        if (!props.data.comments > 0) return <SAction onClick={() => newCommentForm()}><FontAwesomeIcon icon={faPen} /> Ajouter un commentaire</SAction>;
        if (!commentsShown) return <SAction onClick={() => toggleComments()}><FontAwesomeIcon icon={faComments} /> Afficher les {props.data.comments} commentaires</SAction>;
        return <SAction onClick={() => toggleComments()}><FontAwesomeIcon icon={faComments} /> Masquer les commentaires</SAction>
    }

    // Affiche le confirmation de suppression d'un commentaire
    const deleteComment = (e) => {
        handlePopup(<Popup deleteComment={e} post={props.data} comments={handleComments} popup={props.popup}></Popup>);
    }

    return (
        <SDiv>
            <SData>
                <SProfilePic alt={profileImgAlt} src={props.data.pictureUrl} />
                <SUser to={userProfileUrl}>{name}</SUser>

                <SActions>
                    <SAction onClick={() => { copyToClipboard() }}><FontAwesomeIcon icon={faLink} /></SAction>
                    {(user.isAdmin === 1) || (user.id === props.data.posterId) ? <SActionAdmin onClick={() => deletePost()}><FontAwesomeIcon icon={faTrashAlt} /></SActionAdmin> : null}
                </SActions>
            </SData>

            {props.data.message ? <SMessage>{props.data.message}</SMessage> : null}
            {props.data.imageUrl ? <SImage alt={imgAlt} src={props.data.imageUrl}></SImage> : null}
            <SCommentsControl>
                {commentSectionHandler()}
            </SCommentsControl>

            {commentsShown && comments.length > 0 ? <SComments>{comments.map(comment => (
                <SComment key={comment.id}>
                    <SProfilePic alt={'Photo de profil de ' + comment.firstname.charAt(0).toUpperCase() + comment.firstname.toLowerCase().slice(1) + ' '
                        + comment.surname.charAt(0).toUpperCase() + comment.surname.toLowerCase().slice(1)} src={comment.pictureUrl} comment />
                    <SUser to={'/profile?id=' + comment.posterId} comment>{comment.firstname.charAt(0).toUpperCase() + comment.firstname.toLowerCase().slice(1) + ' '
                        + comment.surname.charAt(0).toUpperCase() + comment.surname.toLowerCase().slice(1)}</SUser>
                    {(user.isAdmin === 1) || (user.id === comment.posterId) ? <SActionAdmin onClick={() => deleteComment(comment)} comment><FontAwesomeIcon icon={faTrashAlt} /></SActionAdmin> : null}
                    <SCommentMessage>{comment.comment}</SCommentMessage>
                </SComment>
            ))}<SAction onClick={() => newCommentForm()}><FontAwesomeIcon icon={faPen} /> Ajouter un commentaire</SAction></SComments> : null}
            <Routes>
                <Route path={userProfileUrl} element={<Profile />} />
            </Routes>
        </SDiv>
    );
};

export default Post;