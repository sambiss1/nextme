# ProchainMoi

Développer une plateforme inspirée de FutureMe, baptisée ProchainMoi, permettant à un utilisateur d’écrire un message qu’il recevra dans le futur.
L’utilisateur peut soumettre plusieurs messages, joindre des fichiers, et définir si son message est public ou privé. L’envoi se fera automatiquement à la date prévue.

Aucune création de compte.
À la place : après soumission, l’utilisateur reçoit un email de confirmation avec un lien. Ce lien lui permet aussi d’accéder à un mini tableau de bord listant uniquement ses messages (sans afficher leur contenu).

## Fonctionnalités clés (sans compte)

Formulaire de rédaction commençant obligatoirement par :
"Cher prochain moi,"

Champs :

email du destinataire

message

date d’envoi future

visiblité : public ou privé

pièces jointes (images / PDF, max 5 Mo)

Après soumission :

enregistrement du message

envoi d’un mail de confirmation 

📬 Validation & gestion

Pas de mot de passe

Pas de tableau de bord connecté

L’utilisateur accède à ses messages via :

un lien sécurisé reçu par email

affichage des dates et statuts uniquement :

en attente / envoyé

Il ne peut pas relire le contenu pour respecter le principe FutureMe

🕒 Envoi automatique

Une tâche planifiée (cron) vérifie quotidiennement les messages

Si la date d’envoi est atteinte → email envoyé automatiquement avec pièces jointes

Le statut passe à “envoyé”

## Stack & contraintes techniques (MVP)

Domaine	Choix
Framework	Next.js (App Router)
Base de données	MongoDB
Emails	Nodemailer + SMTP
Pièces jointes	Cloudflare R2 (je veux setup les services R2)
Cron	Vercel Cron (08:00 chaque jour)
Sans compte	validation par lien/code envoyé par email

## 🚫 Ce qu’on ne veut pas

Pas de création de compte ni d’inscription

Pas de login/mot de passe

Pas de lecture du contenu après soumission

Pas de modification ni édition des messages
Du contenu en anglais

## ✔️ Critère de livraison

Le MVP est acceptable si :

Un utilisateur peut écrire un message futur → "Cher prochain moi,"

Il reçoit un mail de confirmation → lien

Le message + pièces jointes partent automatiquement à la date prévue

Le mini tableau de bord liste ses messages sans en afficher le contenu