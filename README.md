
# OpenClassrooms Projet 7 - Créez un réseau social d’entreprise

Code du 7ème projet de la formation [développeur web de openclassrooms](https://openclassrooms.com/fr/paths/185-developpeur-web).
## Scénario
Vous êtes développeur depuis plus d'un an chez **CONNECT-E**, une petite agence web regroupant une douzaine d'employés.

Votre directrice, Stéphanie, invite toute l'agence à prendre un verre pour célébrer une bonne nouvelle ! Elle vient de signer un contrat pour un nouveau projet ambitieux ! 🥂

Le client en question est Groupomania, un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence.

Le projet consiste à construire un réseau social interne pour les employés de **Groupomania**. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.
## Technologies utilisées

* Frontend
    * Bibliothèque **React**

* Backend
    * Serveur **Node.js** avec le framework **Express**
    * Base de Données **MariaDB**
## Base de données

* **Groupomania.sql**: Permet de créer la base de données MariaDB intiale. *(Contient l'utilisateur administrateur)*

#### Users

*Liste des utilisateurs*
| Field      | Type         | Key     | Autre                     |
|------------|--------------|---------|---------------------------|
| id         | INT          | PRIMARY | auto_increment            |
| firstname  | VARCHAR(255) | -       | -                         |
| surname    | VARCHAR(255) | -       | -                         |
| email      | VARCHAR(255) | UNIQUE  | -                         |
| password   | VARCHAR(255) | -       | -                         |
| pictureUrl | VARCHAR(255) | -       | default: user-default.png |
| isAdmin    | TINYINT      | -       | default: 0                |

#### Posts

*Liste des postes*
| Field         | Type         | Key                | Autre                        |
|---------------|--------------|--------------------|------------------------------|
| id            | INT          | PRIMARY            | auto_increment               |
| posterId      | INT          | FOREIGN (users.id) | -                            |
| message       | VARCHAR(255) | -                  | default: null                |
| imageUrl      | VARCHAR(255) | -                  | default: null                |
| datePublished | DATETIME     | -                  | default: current_timestamp() |

#### Comments

*Liste des commentaires*
| Field         | Type         | Key                | Autre                        |
|---------------|--------------|--------------------|------------------------------|
| id            | INT          | PRIMARY            | auto_increment               |
| posterId      | INT          | FOREIGN (users.id) | -                            |
| postId        | INT          | FOREIGN (posts.id) | -                            |
| comment       | VARCHAR(255) | -                  | -                            |
| datePublished | DATETIME     | -                  | default: current_timestamp() |

## Spécification de l'API

| Type   | Point d'accès        | Request body                                                                                   | Type de réponse attendue            | Fonction                                                                                                                                   |
|--------|----------------------|------------------------------------------------------------------------------------------------|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| GET    | /auth/logout         | -                                                                                              | {message: String}                   | Nettoie les cookies de du client et le deconnecte.                                                                                         |
| GET    | /auth/refresh        | -                                                                                              | -                                   | Actualise le cookie d'accès du client.                                                                                                     |
| POST   | /auth/login          | {email: String, password: String}                                                              | {message: String, user: [userData]} | Vérification des informations d'identification de l'utilisateur. Renvoie les données de l'utilisateur depuis la base de données au client. |
| POST   | /auth/register       | {firstname: String, surname: String, email: String, password: String, passwordConfirm: String} | {message: String}                   | Hachage du mot de passe de l'utilisateur, ajout de l'utilisateur à la base de données.                                                     |
| GET    | /posts/              | -                                                                                              | {message: String, posts: [posts]}   | Renvoie un tableau de tous les postes dans la base de données.                                                                             |
| GET    | /posts/:postId       | -                                                                                              | {message: String, post: post}       | Renvoie le poste avec l'id fourni.                                                                                                         |
| GET    | /posts/user/:userId  | -                                                                                              | {message: String, posts: [posts]}   | Renvoie un tableau de tous les postes d'un utilisateur avec l'id fourni.                                                                   |
| POST   | /posts/              | {post: {message: String}, image: File} OR {post: {message: String}} OR {image: File}           | {message: String}                   | Enregistre l'image si il y'en a une. Ajoute le poste dans la base de données.                                                              |
| DELETE | /posts/:postId       | -                                                                                              | {message: String}                   | Supprime un poste et ses commentaires avec l'id fourni. Supprime l'image liée au poste si il y'en a une.                                   |
| GET    | /comments/:postId    | -                                                                                              | {comments: [comments]}              | Renvoi un tableau de commentaire d'un poste avec l'id fourni.                                                                              |
| POST   | /comments/:postId    | {comment: String}                                                                              | {message: String}                   | Ajoute un commentaire dans la base de données.                                                                                             |
| DELETE | /comments/:commentID | -                                                                                              | {message: String}                   | Supprime un commentaire avec l'id fourni.                                                                                                  |
| GET    | /user/:userId        | -                                                                                              | {user: [userData]}                  | Renvoi un tableau contenant les données d'un utilisateur avec l'id fourni.                                                                 |
| POST   | /user/:userId        | {image: File}                                                                                  | {message: String}                   | Enregistre l'image et met à jour *users.pictureUrl* d'un utilisateur avec l'id fourni.                                                           |
| DELETE | /user/:userId        | -                                                                                              | {message: String}                   | Supprime un utilisateur avec l'id fourni. Supprime également son image de profil, ses postes et ses commentaires.                          |

## Installation

1. Cloner le dépot
```
git clone https://github.com/tkruba/KrubaTom_07_25122021.git
```
2. Préparer la base de données
* Se connecter à **MySQL**

```
mysql -u root -p    # Assumant que root est votre utilisateur par défaut.
```

* Créer la base de données
```
CREATE DATABASE groupomania;
```

* Créer un utilisateur MySQL et lui accorder les droits sur la nouvelle base de données
```
CREATE USER 'groupomania'@'localhost' IDENTIFIED BY 'mot_de_passe';
GRANT ALL PRIVILEGES ON groupomania.* TO 'groupomania'@'localhost';
```

* Ajouter la base de données grâce au fichier **Groupomania.sql**
```
mysql -u groupomania -p groupomania --password=mot_de_passe < path/to/groupomania.sql  # Remplacer path/to/ par le chemin d'accès vers le dossier contenant le fichier .sql
```

3. Backend
* Configurer les variables d'environnement du fichier **.env** dans le dossier **server/**
```
DB_HOST=localhost                    # Adresse mysql
DB_USER=root                                # Utilisateur mysql
DB_PASSWORD=example                         # Mot de passe mysql
DB_DATABASE=groupomania                     # Base de données mysql

JWT_ACCESS_TOKEN=ElFamosoAccessSecret       # Clé de cryptage du JsonWebToken d'accès
JWT_REFRESH_TOKEN=ElFamosoRefreshSecret     # Clé de cryptage du JsonWebToken de rafraîchissement

SERVER_PORT=8000                            # Port du serveur

CLIENT_HOST=http://localhost                # Adresse du client
CLIENT_PORT=3000                            # Port du client
```

* Initialiser et démarrer le serveur Backend
```
cd server       # Naviguer dans le dossier "server/"
npm install     # Installer les dépendances de Node
npm run start   # Démarrer le serveur
```

4. Frontend
* Ouvrir un nouveau terminal
* Configurer les variables d'environnement des fichiers **.env** et **.env.local** dans le dossier **client/**
```
REACT_APP_SERVER_HOST=http://localhost  # Adresse du serveur
REACT_APP_SERVER_PORT=8000              # Port du serveur
```

* Initialiser et démarrer le client Frontend
```
cd client       # Naviguer dans le dossier "client/"
npm install     # Installer les dépendances de Node
npm run start   # Démarrer le client
``` 

5. Utiliser le réseau social
* Le site est normalement accessible via l'url suivante: http://localhost:3000/ *Assumant que les configurations utilisées sont celles par défaut*
* Les identifiants de l'utilisateur Administrateur sont:
    * Adresse e-mail: admin@groupomania.fr
    * Mot de passe: groupOMANIA10..