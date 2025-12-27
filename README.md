# 💬 YouQuote – Full Stack Quotes Management Application

## 📌 Présentation générale

**YouQuote** est une application web **full stack** dédiée à la gestion, la découverte et le partage de citations.  
Le projet est structuré en **trois parties principales** :

- **Backend – Partie 1** : API REST de base pour la gestion des citations  
- **Backend – Partie 2** : API enrichie avec authentification, rôles et fonctionnalités avancées  
- **Frontend** : Application React consommant l’API sécurisée via JWT  

L’objectif est de proposer une solution **sécurisée, modulaire et évolutive**, respectant les bonnes pratiques du développement web moderne.

---

## 🧩 Backend – Partie 1 : API de gestion des citations

### 📖 Description

La première partie du backend consiste à développer une **API RESTful en Laravel** permettant la gestion complète des citations.  
Cette version se concentre sur les **fonctionnalités fondamentales**, la performance et la structure de l’API.

### ⚙️ Fonctionnalités principales

- CRUD complet des citations (Create, Read, Update, Delete)
- Génération de citations aléatoires
- Filtrage des citations par longueur (nombre de mots)
- Suivi de la popularité des citations (nombre de requêtes)
- Génération d’images pour les citations populaires *(bonus)*
- Authentification JWT *(optionnelle)*

### 🛠️ Technologies utilisées

- Laravel  
- PHP  
- REST API  
- MySQL / PostgreSQL  
- JWT Authentication *(optionnel)*  
- Intervention Image *(génération d’images)*

Lien GitHub (de partie 1 - Backend) : [https://github.com/bouchramilo/YouQuote-api-P2](https://github.com/bouchramilo/YouQuote-api)

---

## 🔐 Backend – Partie 2 : API avancée avec authentification et permissions

### 📖 Description

La deuxième partie enrichit l’API YouQuote avec des **fonctionnalités avancées de sécurité et de gestion des utilisateurs**.  
Elle introduit une **gestion fine des rôles**, des permissions et des interactions sociales autour des citations.

### ⚙️ Fonctionnalités principales

- Authentification sécurisée avec JWT
- Gestion des rôles :
  - **Admin** : gestion globale et modération des citations
  - **User** : gestion de ses propres citations
- Ajout de catégories et tags aux citations
- Système de likes
- Gestion des favoris
- Soft deletes (suppression logique avec possibilité de restauration)
- Amélioration des endpoints existants

### 🛠️ Technologies utilisées

- Laravel  
- PHP  
- JWT Authentication  
- Eloquent ORM  
- MySQL / PostgreSQL  
- API REST sécurisée

Lien GitHub (de partie 2 - Backend) : https://github.com/bouchramilo/YouQuote-api-P2

---

## 🎨 Frontend : Application React.js

### 📖 Description

Le frontend est une **application React.js** qui consomme l’API YouQuote via des requêtes HTTP sécurisées par **JWT**.  
Il fournit une **interface utilisateur moderne, intuitive et responsive**, adaptée aux rôles utilisateur et administrateur.

### ⚙️ Fonctionnalités principales

- Inscription et connexion avec gestion du token JWT
- Affichage conditionnel selon le rôle (Admin / User)
- CRUD des citations via interface graphique
- Filtrage des citations (mot-clé, catégorie, tag, longueur)
- Génération de citations aléatoires
- Affichage des citations populaires
- Likes et favoris
- Page « Mes favoris »
- Génération et affichage d’images de citations populaires *(bonus)*

### 🛠️ Technologies utilisées

- React.js  
- JavaScript (ES6+)  
- HTML5 / CSS3  
- Axios (communication avec l’API)
- JWT (gestion de l’authentification)
- Git

Lien GitHub (de partie 3 - Frontend) : https://github.com/bouchramilo/YouQuote_Frontend

---

## 🎯 Objectifs du projet

- Mettre en pratique le **développement d’API REST sécurisées**
- Implémenter une **architecture full stack moderne**
- Appliquer les bonnes pratiques en **authentification, rôles et permissions**
- Concevoir une interface utilisateur claire et réutilisable
- Démontrer des compétences en **Laravel & React.js**

---

Fin 😊 
