import React from 'react';
import { Routes, Route, Link} from "react-router-dom"

const Comments = () => {

    let profileImgAlt = 'Photo de profil de ' + this.props.userName;
    let userProfileUrl = "/profile?id=" + this.props.userId;
    
    return (
        <div className='comment'>
            <img alt={profileImgAlt} className="comment-user-img"/>
            <Link to={userProfileUrl} className="comment-user">{this.props.userName}</Link>
            <span className="comment-msg">{this.props.message}</span>
            <Routes>
                <Route path={userProfileUrl} element={<Profile />}></Route>
            </Routes>
        </div>
    );
};

export default Comments;