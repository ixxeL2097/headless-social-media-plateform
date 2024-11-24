import React, { useState } from 'react';
import './MyPosts.css';

const MyPosts = () => {
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
        <div className='myposts-container'>
            <h1>Mes Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id} className='myposts-list'>
                        <div className="top">
                            {post.content}
                        </div>
                        <div className="bottom">
                            <button className='modify' onClick={() => handleModify(post.id)}>Modifier</button>
                            <button className='delete' onClick={() => handleDelete(post.id)}>Suprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyPosts;