import React from 'react';
import './SinglePost.css';

const SinglePost = ({ post, onBack, onDelete, onModify }) => {
    const handleModify = () => {
        const newContent = prompt("Entrez le nouveau contenu :", post.content);
        if (newContent) {
            onModify(post.id, newContent); // Passe l'ID et le nouveau contenu au parent
        }
    };

    return (
        <>
            <button className="back-button" onClick={onBack}>Retour</button>
            <div className="single-post">
                <h1>{post.title}</h1>
                <p>{post.content}</p>
                <div className="post-meta">
                    <span>Par {post.author}</span> | <span>Créer le {new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="post-actions">
                    <button className="modify" onClick={handleModify}>Modifier</button>
                    <button className="delete" onClick={() => onDelete(post.id)}>Supprimer</button>
                </div>
            </div>
        </>
    );
};

export default SinglePost;