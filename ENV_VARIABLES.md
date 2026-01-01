# Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes:

## MongoDB
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/prochainmoi
```
- Créer un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Créer un cluster gratuit
- Obtenir la chaîne de connexion

## Configuration SMTP
```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
SMTP_FROM=noreply@prochainmoi.com
```

### Providers SMTP recommandés:
- **Gmail**: smtp.gmail.com (port 587)
- **SendGrid**: smtp.sendgrid.net (port 587)
- **Mailgun**: smtp.mailgun.org (port 587)
- **AWS SES**: email-smtp.region.amazonaws.com (port 587)

## Cloudflare R2
```env
R2_ENDPOINT=https://account-id.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET_NAME=prochainmoi-attachments
```

### Configuration R2:
1. Aller sur [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Naviguer vers R2 Object Storage
3. Créer un nouveau bucket
4. Générer des clés d'accès API
5. Copier l'endpoint et les clés

## Application
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
- En production: `https://votre-domaine.com`

## Sécurité Cron
```env
CRON_SECRET=your-random-secret-token
```
- Générer un token aléatoire sécurisé
- Exemple: `openssl rand -base64 32`

## Exemple Complet

```env
# MongoDB
MONGODB_URI=mongodb+srv://prochainmoi:SecurePass123@cluster0.mongodb.net/prochainmoi?retryWrites=true&w=majority

# SMTP (exemple avec Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-app
SMTP_FROM=noreply@prochainmoi.com

# Cloudflare R2
R2_ENDPOINT=https://abc123.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=1234567890abcdef
R2_SECRET_ACCESS_KEY=abcdef1234567890
R2_BUCKET_NAME=prochainmoi-attachments

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Cron Secret
CRON_SECRET=super-secret-token-123456
```

## Notes de Sécurité

⚠️ **Ne jamais committer le fichier `.env.local`**
⚠️ **Utiliser des mots de passe forts**
⚠️ **Changer le CRON_SECRET en production**
⚠️ **Activer l'authentification à deux facteurs sur MongoDB Atlas**
