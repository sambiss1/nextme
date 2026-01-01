# Configuration Rapide pour Tester les Emails

## 1. Créer le fichier `.env.local`

Créez un fichier `.env.local` à la racine du projet avec cette configuration minimale :

```env
# MongoDB (optionnel pour tester uniquement les emails)
MONGODB_URI=mongodb://localhost:27017/prochainmoi

# Configuration SMTP - GMAIL (Recommandé pour les tests)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-application
SMTP_FROM=votre-email@gmail.com

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Cron Secret
CRON_SECRET=test-secret-123

# R2 (optionnel pour tester uniquement les emails)
R2_ENDPOINT=https://fake.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=fake
R2_SECRET_ACCESS_KEY=fake
R2_BUCKET_NAME=fake
```

## 2. Configuration Gmail (Recommandé)

### Étape 1 : Activer l'authentification à 2 facteurs
1. Allez sur https://myaccount.google.com/security
2. Activez "Validation en deux étapes"

### Étape 2 : Créer un mot de passe d'application
1. Allez sur https://myaccount.google.com/apppasswords
2. Sélectionnez "Autre (nom personnalisé)"
3. Tapez "ProchainMoi" et cliquez sur "Générer"
4. Copiez le mot de passe de 16 caractères
5. Utilisez ce mot de passe dans `SMTP_PASS`

### Configuration finale
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASS=abcd efgh ijkl mnop  # Le mot de passe d'application (sans espaces)
SMTP_FROM=votre-email@gmail.com
```

## 3. Autres Providers SMTP

### Mailtrap (Pour les tests - emails ne sont pas vraiment envoyés)
```env
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=votre-username-mailtrap
SMTP_PASS=votre-password-mailtrap
SMTP_FROM=test@prochainmoi.com
```
Créez un compte gratuit sur https://mailtrap.io

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=votre-api-key-sendgrid
SMTP_FROM=votre-email-verifie@domaine.com
```

### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@votre-domaine.mailgun.org
SMTP_PASS=votre-password-mailgun
SMTP_FROM=noreply@votre-domaine.com
```

## 4. Tester l'envoi d'emails

1. Démarrez le serveur :
```bash
npm run dev
```

2. Ouvrez votre navigateur :
```
http://localhost:3000/test-email
```

3. Entrez votre email et testez :
   - **Email de confirmation** : Pour voir le design de l'email avec le lien du tableau de bord
   - **Message futur** : Pour voir le design de l'email de message futur

4. Vérifiez votre boîte de réception !

## 5. Dépannage

### Erreur "Invalid login"
- Vérifiez que vous utilisez un mot de passe d'application (pas votre mot de passe Gmail)
- Vérifiez que l'authentification à 2 facteurs est activée

### Erreur "ECONNREFUSED"
- Vérifiez que `SMTP_HOST` et `SMTP_PORT` sont corrects
- Vérifiez votre connexion internet

### Email non reçu
- Vérifiez vos spams
- Attendez quelques minutes (parfois il y a un délai)
- Vérifiez les logs dans le terminal

### Erreur MongoDB
- Pour tester uniquement les emails, vous pouvez ignorer MongoDB
- Ou installez MongoDB localement : https://www.mongodb.com/try/download/community

## 6. Design des Emails

Les emails sont conçus avec :
- ✅ HTML responsive
- ✅ Design moderne et épuré
- ✅ Compatible avec tous les clients email
- ✅ Boutons CTA bien visibles
- ✅ Couleurs cohérentes avec le thème blanc de l'application

Vous pouvez personnaliser les templates dans `/lib/email.ts`
