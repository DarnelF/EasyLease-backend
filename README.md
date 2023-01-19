EasyLease

EasyLease est une application web de gestion de portefeuille de clients pour les commerciaux du domaine du financement. Elle permet de gérer les clients de manière efficace et agréable, avec une interface moderne et facile à utiliser.
Installation

Pour installer et utiliser EasyLease, vous aurez besoin de :

    Node.js et npm (ou yarn) installés sur votre ordinateur
    Une connexion à une base de données MongoDB
    Un environnement de développement pour éditer le code

    Clonez le dépôt Github sur votre ordinateur : git clone https://github.com/votre_nom_dutilisateur/easy-lease.git
    Installez les dépendances en utilisant la commande npm install ou yarn install
    Créez un fichier .env à la racine du projet et ajoutez la variable d'environnement CONNECTION_STRING avec votre chaîne de connexion à la base de données MongoDB.
    Démarrez le serveur en utilisant la commande npm start ou yarn start
    Ouvrez votre navigateur web à l'adresse http://localhost:3000 pour accéder à l'application

Utilisation

Pour utiliser l'application, vous devrez vous inscrire en utilisant une adresse email valide et un mot de passe. Une fois connecté, vous pourrez gérer votre portefeuille de clients en ajoutant, modifiant et supprimant des clients. Vous pourrez également suivre les performances de vos clients en visualisant les contrats et les scénarios.

L'application utilise une architecture de base de données MongoDB pour stocker les informations sur les clients et les utilisateurs. Nous avons également utilisé le framework Redux pour gérer l'état global de l'application.
