import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Post from '../components/posts/Post';
import MainActionButton from '../components/actionButton/MainActionButton';

import { UserContext } from '../UserContext';

const Home = () => {

    const [posts, setPosts] = useState([]);
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setFilePicked] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setFilePicked(true);
    };

    const handleSubmission = () => {
        let formData = new FormData();
        // formData.append('userId', 1);
        formData.append('post', JSON.stringify({ message: null }));
        formData.append('image', selectedFile);

        fetch('http://localhost:3000/posts', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData
        })
            .then((res) => {
                if (!res.ok) throw new Error(res.json().error);
                return res.json();
            })
            .then(res => {
                console.log(res.message);
            })
            .catch((err) => {

            });
    };

    useEffect(() => {

        const getPosts = () => {
            fetch('http://localhost:3000/posts', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then(res => {
                return res.json();
            })
            .then(res => {
                return res.posts;
            })
            .then(post => {
                console.log(post);
                setPosts(post);
            })
        }

        if (!user) {
            fetch('http://localhost:3000/auth/login', {
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

    /*useEffect(() => {
        if (!sessionStorage.getItem('jwt')) navigate('/login');
    
        fetch('http://localhost:3000/posts/', {
            method: 'GET',
            mode: 'cors',
        })
        .then(res => {
            if (!res.ok) throw new Error(res.json().error);
            return res.json();
        })
        .then(res => {
            setPosts(res);
        })
        .catch(err => {
    
        });
    });*/
    /*
    <input type="file" name="file" onChange={changeHandler} />
    <div>
        <button onClick={handleSubmission}>Submit</button>
            {posts.map(post => (
                <Post key={post.id} id={post.id} userId={post.posterId} userName={post.firstname + ' ' + post.surname} profileImg={post.pictureUrl} message={post.message} image={post.imageUrl}/>
            ))}
    </div>
    */

    return (
        <div>
            <h1>Home</h1>
            <MainActionButton></MainActionButton>
            {posts.map(data => (
                <Post key={data.id} data={data}/>
            ))}
        </div>
    );
};

export default Home;