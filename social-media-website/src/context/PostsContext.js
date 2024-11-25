import React, { createContext, useState, useContext } from 'react';

// Crée le contexte
const PostsContext = createContext();

// Provider pour englober les composants
export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([
        {
            id: 1, title: 'First Post', content: 'This is my first post!', author: 'John Doe', date: '2023-01-01', comments: [
                { id: 1, content: 'Great post!', author: 'Alice' },
                { id: 2, content: 'Nice!', author: 'Bob' },
                { id: 3, content: 'Awesome!', author: 'Charlie' }
            ]
        },
        {
            id: 2, title: 'Hello World', content: 'Hello world!', author: 'Jane Doe', date: '2023-01-02', comments: [
                { id: 1, content: 'Great post!', author: 'Alice' },
                { id: 2, content: 'Nice!', author: 'Bob' },
                { id: 3, content: 'Awesome!', author: 'Charlie' }]
        },
        {
            id: 3, title: 'React', content: 'React is awesome!', author: 'John Smith', date: '2023-01-03', comments: [
                { id: 1, content: 'Great post!', author: 'Alice' },
                { id: 2, content: 'Nice!', author: 'Bob' },
                { id: 3, content: 'Awesome!', author: 'Charlie' }]
        },
    ]);

    // Ajout d'une fonction pour ajouter un post
    const addPost = (newPost) => {
        setPosts((prevPosts) => [
            ...prevPosts,
            { ...newPost, id: prevPosts.length > 0 ? prevPosts[prevPosts.length - 1].id + 1 : 1 },
        ]);
    };

    // Suppression d'un post
    const deletePost = (id) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    };

    // Mise à jour d'un post
    const updatePost = (id, updatedContent) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) => (post.id === id ? { ...post, content: updatedContent } : post))
        );
    };

    // Fournit les données et fonctions aux enfants
    return (
        <PostsContext.Provider value={{ posts, addPost, deletePost, updatePost }}>
            {children}
        </PostsContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte plus facilement
export const usePosts = () => useContext(PostsContext);