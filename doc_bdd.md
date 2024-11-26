# Schéma de la Base de Données

## 1. Table `users`
Stocke les informations des utilisateurs.

| Colonne       | Type                 | Description                              |
|---------------|----------------------|------------------------------------------|
| `user_id`     | BIGINT (PK)          | Identifiant unique de l'utilisateur.     |
| `email`       | VARCHAR(255)         | Adresse email unique.                    |
| `password_hash` | VARCHAR(255)       | Hash du mot de passe.                    |
| `name`        | VARCHAR(255)         | Nom de l'utilisateur.                    |
| `bio`         | TEXT                 | Biographie de l'utilisateur (optionnelle). |
| `role`        | ENUM('creator', 'admin') | Rôle de l'utilisateur.              |
| `created_at`  | TIMESTAMP            | Date de création du compte.              |
| `updated_at`  | TIMESTAMP            | Date de dernière mise à jour.            |

---

## 2. Table `profiles`
Stocke des informations additionnelles sur le profil utilisateur.

| Colonne         | Type                 | Description                              |
|-----------------|----------------------|------------------------------------------|
| `profile_id`    | BIGINT (PK)          | Identifiant unique du profil.            |
| `user_id`       | BIGINT (FK)          | Référence vers la table `users`.         |
| `privacy_level` | ENUM('public', 'private') | Niveau de confidentialité du profil. |
| `avatar_url`    | TEXT                 | URL de l'avatar de l'utilisateur.        |
| `social_links`  | JSON                 | Liens vers les réseaux sociaux (optionnel). |

---

## 3. Table `posts`
Stocke les publications des utilisateurs.

| Colonne       | Type                 | Description                              |
|---------------|----------------------|------------------------------------------|
| `post_id`     | BIGINT (PK)          | Identifiant unique de la publication.    |
| `user_id`     | BIGINT (FK)          | Référence vers la table `users`.         |
| `title`       | VARCHAR(255)         | Titre de la publication.                 |
| `body`        | TEXT                 | Contenu de la publication.               |
| `created_at`  | TIMESTAMP            | Date de création de la publication.      |
| `updated_at`  | TIMESTAMP            | Date de dernière modification.           |

---

## 4. Table `media`
Stocke les fichiers multimédias associés aux publications.

| Colonne       | Type                 | Description                              |
|---------------|----------------------|------------------------------------------|
| `media_id`    | BIGINT (PK)          | Identifiant unique du média.             |
| `post_id`     | BIGINT (FK)          | Référence vers la table `posts`.         |
| `user_id`     | BIGINT (FK)          | Référence vers la table `users`.         |
| `file_url`    | TEXT                 | URL du fichier média.                    |
| `media_type`  | ENUM('image', 'video') | Type du média.                         |
| `uploaded_at` | TIMESTAMP            | Date d'ajout du média.                   |

---

## 5. Table `comments`
Stocke les commentaires sur les publications.

| Colonne       | Type                 | Description                              |
|---------------|----------------------|------------------------------------------|
| `comment_id`  | BIGINT (PK)          | Identifiant unique du commentaire.       |
| `post_id`     | BIGINT (FK)          | Référence vers la table `posts`.         |
| `user_id`     | BIGINT (FK)          | Référence vers la table `users`.         |
| `body`        | TEXT                 | Contenu du commentaire.                  |
| `created_at`  | TIMESTAMP            | Date de création du commentaire.         |

---

## 6. Table `notifications`
Stocke les notifications envoyées aux utilisateurs.

| Colonne          | Type       | Description                              |
|------------------|------------|------------------------------------------|
| `notification_id`| BIGINT (PK)| Identifiant unique de la notification.   |
| `user_id`        | BIGINT (FK)| Référence vers la table `users`.         |
| `message`        | TEXT       | Contenu de la notification.              |
| `is_read`        | BOOLEAN    | Indique si la notification a été lue.    |
| `created_at`     | TIMESTAMP  | Date de création de la notification.     |

---

## 7. Table `tags`
Stocke les tags associés aux publications.

| Colonne       | Type        | Description                              |
|---------------|-------------|------------------------------------------|
| `tag_id`      | BIGINT (PK) | Identifiant unique du tag.               |
| `name`        | VARCHAR(50) | Nom du tag.                              |
| `created_at`  | TIMESTAMP   | Date de création du tag.                 |

---

## 8. Table `post_tags`
Table pivot pour relier les publications aux tags.

| Colonne       | Type       | Description                              |
|---------------|------------|------------------------------------------|
| `post_id`     | BIGINT (FK)| Référence vers la table `posts`.         |
| `tag_id`      | BIGINT (FK)| Référence vers la table `tags`.          |

---

# Relations Entre les Tables

- **`users ↔ profiles`** : Relation **1:1** (chaque utilisateur a un profil).
- **`users ↔ posts`** : Relation **1:N** (un utilisateur peut avoir plusieurs publications).
- **`posts ↔ media`** : Relation **1:N** (une publication peut avoir plusieurs médias).
- **`posts ↔ comments`** : Relation **1:N** (une publication peut avoir plusieurs commentaires).
- **`posts ↔ tags`** : Relation **M:N** via la table `post_tags`.
- **`users ↔ notifications`** : Relation **1:N** (un utilisateur peut recevoir plusieurs notifications).










