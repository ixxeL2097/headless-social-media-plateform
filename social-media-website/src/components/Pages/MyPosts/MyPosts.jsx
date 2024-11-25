import React, { useState } from 'react';
import './MyPosts.css';
import SinglePost from '../SinglePost/SinglePost';
import { usePosts } from '../../../context/PostsContext';

const MyPosts = () => {
    const { posts, deletePost, updatePost, addPost } = usePosts(); // Accède au contexte
    const [selectedPost, setSelectedPost] = useState(null); // Stocke le post sélectionné
    const [showCreateForm, setShowCreateForm] = useState(false); // Contrôle l'affichage du formulaire de création

    const handlePostClick = (post) => {
        setSelectedPost(post); // Met à jour le post sélectionné
    };

    return (
        <div className="myposts-container">
            {!selectedPost && !showCreateForm && <h1>Mes Posts</h1>}

            {!selectedPost && !showCreateForm && (
                <>
                    <button onClick={() => setShowCreateForm(true)} className="add-post-btn">
                        Créer un nouveau Post
                    </button>
                    <ul>
                        {posts.map((post) => (
                            <li
                                key={post.id}
                                className="myposts-list"
                                onClick={() => handlePostClick(post)} // Sélectionne le post au clic
                            >
                                <div className="top">
                                    <h2>{post.title}</h2>
                                </div>
                                <div className="bottom">
                                    <p>{post.content}</p>
                                    <p>Envoyé le {new Date(post.date).toLocaleDateString()}</p>
                                    <div className="btns">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                updatePost(post.id, prompt("Entrez le nouveau contenu :", post.content));
                                            }}
                                            className="modify"
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deletePost(post.id);
                                            }}
                                            className="delete"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {showCreateForm && (
                <CreatePost
                    onSubmit={(title, content) => {
                        addPost({ title, content, author: 'Anonymous', date: new Date().toISOString().split('T')[0] });
                        setShowCreateForm(false); // Cache le formulaire après création
                    }}
                    onCancel={() => setShowCreateForm(false)} // Annule la création
                />
            )}

            {selectedPost && (
                <SinglePost
                    post={selectedPost}
                    onBack={() => setSelectedPost(null)}
                    onDelete={() => deletePost(selectedPost.id)}
                    onModify={updatePost}
                />
            )}
        </div>
    );
};

// Composant CreatePost intégré dans le même fichier
const CreatePost = ({ onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && content) {
            onSubmit(title, content); // Passe les données au composant parent
        }
    };

    return (
        <div className="create-post">
            <h2>Créer un nouveau Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Titre</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Titre"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Contenu</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        placeholder="Contenu"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="media">Charger un média</label>
                    <input
                        type="file"
                        id="media"
                        accept="image/*, video/*"
                    />
                </div>
                <button className="submit" type="submit">
                    Envoyer
                </button>
                <button className="cancel" type="button" onClick={onCancel}>
                    Annuler
                </button>
            </form>
        </div>
    );
};

export default MyPosts;