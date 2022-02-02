import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../UserContext';

import Header from '../components/header/Header';

import MainActionButton from '../components/actionButton/MainActionButton';
import ProfileComponent from '../components/profile/Profile';
import Post from '../components/posts/Post';
import Error from '../components/error/Error';

const Profile = () => {

    // Données du profil
    const [data, setData] = useState(null);

    // Liste des postes de l'utilisateur du profil
    const [posts, setPosts] = useState(null);

    // Utilisateur actif
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {

        let urlString = window.location.href;
        let url = new URL(urlString);
        let id = url.searchParams.get('id');

        // Récupère les données de l'utilisateur du profil
        const getUserData = () => {
            fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/user/' + id, {
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
                    setData(res.user);
                    getUserPosts();
                })
                .catch(err => console.error(err.error));
        };

        // Récupère les postes de l'utilisateur du profil
        const getUserPosts = () => {

            fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/posts/user/' + id, {
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
                    if (res.posts.length < 1) throw new Error('Aucun post trouvé');
                    console.log(res.posts);
                    return setPosts(res.posts);
                })
                .catch(err => console.error(err.error));
        };

        if (!user) {
            // Tente une authentification rapide si l'utilisateur n'est pas actif
            fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/auth/login', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    email: "email",
                    password: "password",
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then((res) => {
                    if (!res.ok) throw new Error(res.json().error);
                    return res.json();
                })
                .then(res => {
                    setUser(res.user);
                    getUserData();
                })
                .catch((err) => {
                    navigate('/login');
                });
        } else {
            getUserData();
        }
    }, [setData]);

    const [popup, setPopup] = useState([]);

    // Gère les popups
    const handlePopup = (e) => {
        setPopup(e);
    };

    // Gère les postes
    const handlePosts = (e) => {
        setPosts(e);
    };

    // Gère les erreurs (Utilisateur inexistant & Aucun poste de cet utilisateur)
    const handlePostsError = () => {
        if (!data) return null;
        if (!posts) return <Error message={'Cet utilisateur n\'a encore rien posté. 😞'} />;
        return posts.map(post => (<Post key={post.id} data={post} popup={handlePopup} />));
    };

    return (
        <div>
            <Header />
            {popup ? popup : null}
            <MainActionButton posts={handlePosts} popup={handlePopup} />
            {data ? <ProfileComponent data={data} popup={handlePopup} /> : <Error message={'Utilisateur introuvable.'} />}
            {handlePostsError()}
        </div>
    );
};

export default Profile;