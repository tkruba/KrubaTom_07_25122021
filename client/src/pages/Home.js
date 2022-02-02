import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

import Header from '../components/header/Header';

import Post from '../components/posts/Post';
import MainActionButton from '../components/actionButton/MainActionButton';


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
                if (!res.ok) throw new Error(res.json());
                return res.json();
            })
            .then(res => {
                return res.posts;
            })
            .then(post => {
                setPosts(post);
                console.log(post);
            })
            .catch(err => console.error(err.error));
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
                    if (!res.ok) throw new Error(res.json().error);
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
            {posts.map(data => (
                <Post key={data.id} data={data} popup={handlePopup}/>
            ))}
        </div>
    );
};

export default Home;