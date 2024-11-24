import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  const menuItems = [
    { text: 'Accueil', link: '/', class: 'logo' },
    { text: 'Créer un Post', link: '/content/create', class: 'create-post' },
    { text: 'Mes Posts', link: '/content/my-posts', class: 'my-posts' },
    { text: 'Explorer', link: '/content/explore', class: 'explore' },
    { text: 'Charger un media', link: '/media/upload', class: 'upload-media' },
    { text: 'Mes medias', link: '/media/my-media', class: 'my-media' },
    { text: 'Mon profil', class: 'profile' },
  ];

  const profileItems = [
    { text: 'Inscription', link: '/auth/register' },
    { text: 'Connexion', link: '/auth/login' },
    { text: 'Mon profil', link: '/profile/999' },
    { text: 'Déconnexion', link: '/auth/logout' }
  ];

  const toggleProfileMenu = () => {
    setProfileOpen((prevState) => !prevState);
  };

  return (
    <header>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li
              className={item.class}
              key={index}
              onClick={item.class === 'profile' ? toggleProfileMenu : undefined} // Applique toggle uniquement sur "Mon profil"
            >
              <Link to={item.link}>{item.text}</Link>
            </li>
          ))}
        </ul>
        {profileOpen && (
          <div className="profile-menu">
            <ul>
              {profileItems.map((item, index) => (
                <li key={index} onClick={toggleProfileMenu}>
                  <Link to={item.link}>{item.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
