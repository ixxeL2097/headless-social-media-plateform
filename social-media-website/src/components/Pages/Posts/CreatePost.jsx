import React, { useState } from 'react';
import './CreatePost.css';
import { usePosts } from '../../../context/PostsContext';

const CreatePost = ({ onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [media, setMedia] = useState(null); // Gestion des médias (optionnel)
    const { addPost } = usePosts(); // Accède à la fonction addPost du contexte

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && content) {
            addPost({ title, content, author: 'Anonymous', date: new Date().toISOString().split('T')[0] });
            setTitle('');
            setContent('');
            setMedia(null);
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
                        onChange={(e) => setMedia(e.target.files[0])}
                    />
                </div>
                <button className='submit' type="submit">Envoyer</button>
                <button className='cancel' type="button" onClick={onCancel}>
                    Annuler
                </button>
            </form>
        </div>
    );
};

export default CreatePost;