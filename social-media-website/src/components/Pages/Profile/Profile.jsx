import React from 'react';
import { useState } from 'react';
import './Profile.css';
import MyPosts from '../MyPosts/MyPosts';

const Profile = () => {

    const [posts, setPosts] = useState([
        { id: 1, content: 'This is my first post!' },
        { id: 2, content: 'Hello world!' },
        { id: 3, content: 'React is awesome!' },
    ]);

    const handleModify = (id) => {
        const newContent = prompt('Enter new content:');
        if (newContent) {
            setPosts(posts.map(post => post.id === id ? { ...post, content: newContent } : post));
        }
    };

    const handleDelete = (id) => {
        setPosts(posts.filter(post => post.id !== id));
    };

    return (
        <div className="profile-container">
            <div className="profile-wrapper">
                <div className="profile-header">
                    <img src="https://picsum.photos/200" alt="Profile" className="profile-picture" />
                    <h1 className="profile-name">User Name</h1>
                </div>
                <div className="profile-details">
                    <p><strong>Email:</strong> user@example.com</p>
                    <p><strong>Location:</strong> City, Country</p>
                    <p><strong>Bio:</strong> This is a short bio about the user.</p>
                </div>
            </div>
            <div className="profile-posts">
                <MyPosts posts={posts} onModify={handleModify} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default Profile;