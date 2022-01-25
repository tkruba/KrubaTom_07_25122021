import React, { useContext, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { SDiv, SData, SProfilePic, SUser, SActions, SAction, SActionAdmin, SMessage, SImage } from './style';
import Profile from "../../pages/Profile";
import { UserContext } from '../../UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Post = (props) => {

    const { user, setUser } = useContext(UserContext);

    let userProfileUrl = '/profile?id=' + props.data.posterId;

    let name = props.data.surname.charAt(0).toUpperCase() + props.data.surname.toLowerCase().slice(1) + ' '
        + props.data.firstname.charAt(0).toUpperCase() + props.data.firstname.toLowerCase().slice(1)

    let profileImgAlt = 'Photo de profil de ' + name;

    let imgAlt = 'Photo de ' + name;

    /*
        useEffect(() => {
            console.log(this.props);
        })
    
        let profileImgAlt = 'Photo de profil de ' + this.props.userName;
        let userProfileUrl = "/profile?id=" + this.props.userId;
    
        let postImgAlt = 'Photo de ' + this.props.userName;
        <img alt={profileImgAlt} src={this.props.profileImg} className="post-user-img"/>
        <Link to={userProfileUrl} className="post-user">{this.props.userName}</Link>
        
        {this.props.message ? <span className="post-msg">{this.props.message}</span> : null}
        {this.props.image ? <img className="post-img" alt={postImgAlt} src={this.props.image}/> : null}
        <Routes>
            <Route path={userProfileUrl} element={<Profile />}></Route>
        </Routes>
    */

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href + 'post?id=' + props.data.id);
    };

    const deletePost = () => {
        fetch('http://localhost:3000/posts/' + props.data.id, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then((res) => {
            if (!res.ok) throw new Error(res.json());
            return res.json();
        })
        .then(res => {
            console.log(res.message);
        })
        .catch(err => console.error(err.error));
    }

    return (
        <SDiv className='post'>
            <SData className='post-data'>
                <SProfilePic alt={profileImgAlt} src={props.data.pictureUrl} className='post-user-img' />
                <SUser to={userProfileUrl} className='post-user'>{name}</SUser>

                <SActions className='post-actions'>
                    <SAction className='post-action' onClick={() => {copyToClipboard()}}><FontAwesomeIcon icon={faLink} /></SAction>
                    {(user.isAdmin === 1) || (user.id === props.data.posterId) ? <SActionAdmin className='post-action' onClick={() => {deletePost()}}><FontAwesomeIcon icon={faTrashAlt} /></SActionAdmin> : null}
                </SActions>
            </SData>

            {props.data.message ? <SMessage className='post-msg'>{props.data.message}</SMessage> : null}
            {props.data.imageUrl ? <SImage className='post-img' alt={imgAlt} src={props.data.imageUrl}></SImage> : null}

            <Routes>
                <Route path={userProfileUrl} element={<Profile />} />
            </Routes>
        </SDiv>
    );
};

export default Post;