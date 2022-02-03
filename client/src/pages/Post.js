import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../UserContext';

import Header from '../components/header/Header';
import Posts from '../components/posts/Post';
import Error from '../components/error/Error';


// Page d'un poste
const Post = () => {

    // Utilisateur actif
    const { user, setUser } = useContext(UserContext);

    // Données du poste
    const [data, setData] = useState();

    const navigate = useNavigate();

    useEffect(() => {

        // Récupère les données du poste
        const getPost = () => {

            let urlString = window.location.href;
            let url = new URL(urlString);
            let id = url.searchParams.get('id');

            fetch(process.env.REACT_APP_SERVER_HOST + ':' + process.env.REACT_APP_SERVER_PORT + '/posts/' + id, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then(res => {
                    if (!res.ok) return res.json().then(text => {throw new Error(text.error)});
                    return res.json();
                })
                .then(res => {
                    setData(res.post);
                })
                .catch(err => console.error(err.message));
        };

        if (!user) {
            // Tente une authentification rapide de l'utilisateur si il n'est pas actif
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
                    getPost();
                })
                .catch((err) => {
                    navigate('/login');
                });
        } else {
            getPost();
        }
    }, [setData]);
    
    return (
        <div>
            <Header />
            {data ? <Posts data={data} /> : <Error message={'Le poste n\'existe pas.'}/>}
        </div>
    );
};

export default Post;