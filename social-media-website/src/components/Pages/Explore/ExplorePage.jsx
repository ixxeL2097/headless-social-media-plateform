import React, { useState } from 'react';
import './ExplorePage.css';
import { usePosts } from '../../../context/PostsContext';

const ExplorePage = () => {
    const { posts } = usePosts(); // Accède au contexte
    const [searchQuery, setSearchQuery] = useState(''); // Stocke la requête de recherche
    const [selectedPost, setSelectedPost] = useState(null); // Stocke le post sélectionné

    // Met à jour la requête de recherche
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase()); // Conserve la recherche en minuscules
    };

    // Filtre les posts en fonction de la recherche
    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery) || // Recherche par titre
        post.content.toLowerCase().includes(searchQuery) // Recherche par contenu
    );

    const handlePostClick = (post) => {
        setSelectedPost(post); // Met à jour le post sélectionné
    };

    return (
        <div className="explore-page">
            <h1>Explorer</h1>
            <div className="filters">
                {/* Barre de recherche */}
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={handleSearchChange} // Met à jour la recherche
                />
                <select>
                    <option value="">All Tags</option>
                    <option value="Technology">Technology</option>
                    <option value="Cooking">Cooking</option>
                    <option value="Travel">Travel</option>
                </select>
                <select>
                    <option value="date">By Date</option>
                    <option value="popularity">By Popularity</option>
                </select>
            </div>
            <div className="explore-container">
                {/* Affiche les posts filtrés */}
                <ul>
                    {filteredPosts.map((post) => (
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
                                <span>{post.comments?.length || 0} commentaires</span>
                            </div>
                        </li>
                    ))}
                </ul>
                {/* Message si aucun résultat */}
                {filteredPosts.length === 0 && <p>Aucun post trouvé.</p>}
            </div>
        </div>
    );
};

export default ExplorePage;