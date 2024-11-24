import React from 'react';
import './Profile.css';

const Profile = () => {
    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src="https://picsum.photos/200" alt="Profile" className="profile-picture" />
                <h1 className="profile-name">User Name</h1>
            </div>
            <div className="profile-details">
                <p><strong>Email:</strong> user@example.com</p>
                <p><strong>Location:</strong> City, Country</p>
                <p><strong>Bio:</strong> This is a short bio about the user.</p>
            </div>
            <div className="profile-posts">
                <h2>User's Posts</h2>
                {/* List of user's posts will go here */}
            </div>
        </div>
    );
};

export default Profile;