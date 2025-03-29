# 🔏 VibeStamp Bot

This is the official automated CI agent of the Department of Vibes and Haiku Warfare.

It exists solely to judge your pull requests by their poetic merit and vibe compliance.

---

> A GitHub App built with [Probot](https://github.com/probot/probot) that enforces poetic entropy and procedural approval rituals.

---

## 🛰️ Setup Guide

Welcome to the Department of Vibes and Haiku Warfare. This guide will help you get `vibe-stamp-bot` running locally for development and testing.

### ⚙️ Requirements

- Node.js (recommended via [Volta](https://volta.sh))
- npm (comes with Node)
- GitHub account
- A GitHub App (instructions below)
- ngrok or another tunnel service for local development

### 📦 Project Structure

```
vibe-stamp-bot/
├── index.js                # Main Probot logic
├── .env                    # Environment variables (DO NOT COMMIT)
├── private-key.pem         # GitHub App private key (DO NOT COMMIT)
├── package.json
└── README.md
```

### 🔐 .env File Format

Create a `.env` file in the root:

```env
APP_ID=your_github_app_id
PRIVATE_KEY_PATH=./private-key.pem
WEBHOOK_SECRET=your_webhook_secret
```

> 🛑 DO NOT commit this file. `.env` is in `.gitignore`.

### 🧙 Register Your GitHub App

1. Go to https://github.com/settings/apps
2. Click **New GitHub App**
3. App Name: `VibeStamp`
4. Homepage URL: `https://example.com`
5. Webhook URL: use your ngrok HTTPS URL (see below)
6. Webhook secret: choose a random passphrase (set in `.env`)
7. Permissions:
    - Pull requests: Read & write
8. Subscribe to events:
    - `pull_request`
9. Save and **generate private key** → save as `private-key.pem`
10. Install the app on your target repo

### 🌐 Start a Tunnel

Use ngrok to expose your local bot server to GitHub:

```bash
npx ngrok http 3000
```

Use the `https://` URL in your GitHub App Webhook URL field.

### 🚀 Run the Bot

```bash
npm install
npm start
```

You should see:
```
VibeStamp Bot is running.
```

### ✅ Vibe Conditions

The bot will auto-approve a pull request if:
- Author is `ChaosTestOps`
- PR title includes `#VibeCoding`
- PR body includes **one or more** of:
  - `entropy`
  - `2:17am`
  - `seal`

If conditions are met, VibeStamp leaves a review comment:
> 🔏 VibeStamp has affixed its mark. Proceed.

### 🔒 Security Practices

- `.env` and `private-key.pem` are ignored via `.gitignore`
- Never commit secrets
- Use secure random webhook secrets

---

Happy Vibe Enforcing ✨  
— Department of Vibes and Haiku Warfare
