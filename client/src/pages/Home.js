import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

import Header from '../components/header/Header';

import Post from '../components/posts/Post';
import MainActionButton from '../components/actionButton/MainActionButton';
import Error from '../components/error/Error';


// Page d'accueil
const Home = () => {

    // Liste des postes
    const [posts, setPosts] = useState([]);

    // Utilisateur actif
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {

        // Récupère la liste des postes auprès du serveur
        const getPosts = () => {
            fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/posts', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then(res => {
                if (!res.ok) return res.json().then(text => {throw new Error(text.error)});
                return res.json();
            })
            .then(res => {
                return res.posts;
            })
            .then(post => {
                setPosts(post);
            })
            .catch(err => console.error(err.message));
        };

        if (!user) {
            // Demande une authentification rapide au serveur si aucun utilisateur n'est actif
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
                    if (!res.ok) return res.json().then(text => {throw new Error(text.error)});
                    return res.json();
                })
                .then(res => {
                    setUser(res.user);
                    getPosts();
                })
                .catch((err) => {
                    navigate('/login');
                });
        } else {
            getPosts();
        }
    }, [setPosts]);

    const [popup, setPopup] = useState([]);

    // Gère les popups
    const handlePopup = (e) => {
        setPopup(e);
    };

    // Gère les postes
    const handlePosts = (e) => {
        setPosts(e);
    };

    return (
        <div>
            <Header />
            {popup ? popup : null}
            <MainActionButton posts={handlePosts} popup={handlePopup} />
            
            {posts.length > 0 ? posts.map(data => (
                <Post key={data.id} data={data} popup={handlePopup}/>
            )) : <Error message={'Aucun poste n\'a été publié. 😞 \rN\'hésitez pas a corriger ce problème !'}/>}
        </div>
    );
};

export default Home;