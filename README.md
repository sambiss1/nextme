# ProchainMoi

Plateforme permettant d'envoyer des messages à son futur soi, inspirée de FutureMe.

## Fonctionnalités

- ✉️ Écriture de messages futurs commençant par "Cher prochain moi,"
- 📅 Sélection de la date d'envoi future
- 🔒 Messages publics ou privés
- 📎 Pièces jointes (images/PDF, max 5 Mo)
- 🚫 Aucun compte requis
- 📧 Validation par email avec lien sécurisé
- 📊 Tableau de bord pour suivre le statut des messages
- ⏰ Envoi automatique via cron job quotidien

## Stack Technique

- **Framework**: Next.js 16 (App Router)
- **Base de données**: MongoDB avec Mongoose
- **Emails**: Nodemailer
- **Stockage**: Cloudflare R2 (S3-compatible)
- **Cron**: Vercel Cron Jobs
- **Styling**: Tailwind CSS
- **State Management**: React Query

## Installation

1. Cloner le repository
```bash
git clone <repository-url>
cd nextme
```

2. Installer les dépendances
```bash
npm install
```

3. Créer un fichier `.env.local` avec les variables suivantes:
```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/prochainmoi

# SMTP Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
SMTP_FROM=noreply@prochainmoi.com

# Cloudflare R2
R2_ENDPOINT=https://account-id.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET_NAME=prochainmoi-attachments

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Cron Secret (générer un token aléatoire)
CRON_SECRET=your-random-secret-token
```

4. Lancer le serveur de développement
```bash
npm run dev
```

5. Ouvrir [http://localhost:3000](http://localhost:3000)

## Configuration MongoDB

Créer une base de données MongoDB et configurer les index:
```javascript
db.messages.createIndex({ email: 1 })
db.messages.createIndex({ accessToken: 1 })
db.messages.createIndex({ sendDate: 1, status: 1 })
```

## Configuration Cloudflare R2

1. Créer un bucket R2 dans Cloudflare
2. Générer des clés d'accès API
3. Configurer les variables d'environnement R2

## Cron Job

Le cron job s'exécute quotidiennement à 8h00 (configuré dans `vercel.json`).

Pour tester manuellement:
```bash
curl -X GET http://localhost:3000/api/cron/send-messages \
  -H "Authorization: Bearer your-cron-secret"
```

## Structure du Projet

```
nextme/
├── app/
│   ├── api/
│   │   ├── messages/          # API pour créer et récupérer les messages
│   │   └── cron/
│   │       └── send-messages/ # Cron job pour l'envoi automatique
│   ├── tableau-de-bord/       # Page du tableau de bord
│   ├── layout.tsx
│   ├── page.tsx               # Page d'accueil
│   └── globals.css
├── components/
│   └── MessageForm/           # Formulaire de création de message
├── lib/
│   ├── mongodb.ts             # Connexion MongoDB
│   ├── email.ts               # Service d'envoi d'emails
│   └── r2.ts                  # Service Cloudflare R2
├── models/
│   └── Message.ts             # Modèle Mongoose
└── types/
    ├── message.ts             # Types TypeScript
    └── global.d.ts            # Déclarations globales
```

## Déploiement sur Vercel

1. Pusher le code sur GitHub
2. Importer le projet dans Vercel
3. Configurer toutes les variables d'environnement
4. Le cron job sera automatiquement configuré via `vercel.json`

## Critères de Livraison MVP

✅ Un utilisateur peut écrire un message futur commençant par "Cher prochain moi,"
✅ Il reçoit un email de confirmation avec un lien sécurisé
✅ Le message + pièces jointes partent automatiquement à la date prévue
✅ Le mini tableau de bord liste ses messages sans afficher le contenu

## Licence

MIT
