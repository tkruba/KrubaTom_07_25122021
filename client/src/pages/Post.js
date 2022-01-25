import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostComponents from '../components/posts/Post';


const Post = () => {

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) navigate('/login');

        let urlString = window.location.href;
        let url = new URL(urlString);
        let id = url.searchParams.get('id');

        fetch('http://localhost:3000/posts/' + id, {
            method: 'GET',
            mode: 'cors',
        })
        .then(res => {
            if (!res.ok) throw new Error(res.json().error);
            return res.json();
        })
        .then(res => {
            setData(res);
        })
        .catch(err => {

        });
    }), [];

    return (
        <div>
            <PostComponents userId={data.userId} userName={data.userName} message={data.message} image={data.imageUrl}/>
        </div>
    );
};

export default Post;