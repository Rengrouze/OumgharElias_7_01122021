# Projet 7 – OpenClassrooms

Ce dépôt contient le code du projet 7 réalisé dans le cadre de ma formation OpenClassrooms.

> Ce projet a été développé avec les compétences et la vision technique que j’avais à l’époque de sa création, dans un contexte d’apprentissage. Aujourd’hui, avec plus d’expérience, je vois certains choix différemment : par exemple, l’API récupère tous les posts du réseau en une seule requête, ce qui fonctionne avec un petit volume mais peut poser problème à plus grande échelle. Cela témoigne de ma progression et de ma capacité actuelle à anticiper ce type d’enjeux. Ce dépôt reste donc une photographie fidèle de mon apprentissage à cette période.

## Prérequis

- **Node.js** (version recommandée : 14.x ou supérieure)
- **npm**
- **Prisma** & **MySQL** pour la base de données

## Installation

1. Clonez ce dépôt et l’API associée :
   ```bash
   git clone https://github.com/Rengrouze/OumgharElias_7_01122021.git
   git clone https://github.com/Rengrouze/API-pour-Projet-7-OC-Oumghar-Elias.git
   ```
2. Installez les dépendances dans chaque projet :
   ```bash
   cd OumgharElias_7_01122021
   npm ci
   ```
   Pour l’API, suivez les instructions du README du dépôt API.

3. Configurez la base de données MySQL et Prisma selon la documentation de l’API.

## Lancement du projet

Dans ce dépôt (Frontend) :
```bash
npm run dev
```
(Pensez à exécuter la commande dans le dossier `Frontend`)

L’API doit être lancée séparément, suivez le README du dépôt API.

## Liens utiles

- [Dépôt de l’API](https://github.com/Rengrouze/API-pour-Projet-7-OC-Oumghar-Elias)

## À propos

Ce projet a été conçu dans un but pédagogique et ne reflète pas forcément mes pratiques actuelles. Il illustre cependant mon parcours et la progression de mes compétences techniques.
