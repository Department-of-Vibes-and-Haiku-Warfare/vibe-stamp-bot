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
- ngrok or [smee.io](https://smee.io) for local webhook testing
- VS Code (optional, for debugging)

> 💥 **If you're using VS Code with Volta**, add this to your `settings.json` to make sure the debugger inherits your environment:
> ```json
> {
>   "terminal.integrated.inheritEnv": true,
>   "terminal.integrated.defaultProfile.osx": "zsh"
> }
> ```

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
WEBHOOK_PROXY_URL=https://smee.io/your-generated-url
LOG_LEVEL=debug
```

> 🛑 DO NOT commit this file. `.env` is in `.gitignore`.

### 🧙 Register Your GitHub App

1. Go to https://github.com/settings/apps
2. Click **New GitHub App**
3. App Name: `VibeStamp`
4. Homepage URL: `https://example.com`
5. Webhook URL: your smee/ngrok HTTPS URL
6. Webhook secret: use a secure random string (add to `.env`)
7. Permissions:
    - Pull requests: Read & write
8. Subscribe to events:
    - `pull_request`
9. Save and **generate private key** → save as `private-key.pem`
10. Install the app on your repo

### 🌐 Start a Tunnel

#### With smee:
```bash
npx smee -u https://smee.io/your-generated-url --target http://localhost:3000/api/github/webhooks
```

#### Or with ngrok:
```bash
npx ngrok http 3000
```

Use the resulting `https://` URL in your GitHub App Webhook URL field.

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

---

## 🧪 Debugging in VS Code

### Launch Config

Create a `.vscode/launch.json` with:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug VibeStamp",
      "program": "${workspaceFolder}/node_modules/probot/lib/bin",
      "args": ["run", "./index.js"],
      "envFile": "${workspaceFolder}/.env",
      "skipFiles": ["<node_internals>/**"],
      "runtimeExecutable": "/Users/YOUR_USERNAME/.volta/bin/node"
    }
  ]
}
```

> Replace `/Users/YOUR_USERNAME/...` with the actual result of `which node`

---

## 🔒 Security Practices

- Never commit `.env` or `private-key.pem`
- Use `.gitignore` to prevent leaking secrets
- Use unique webhook secrets per environment

---

## 📜 Departmental Memo 017-B

> **DEPARTMENT OF VIBES AND HAIKU WARFARE**  
> **VIBESTAMP MEMORANDUM 017-B**  
> *For Immediate Internal Dissemination Only*
>
> VibeStamp is not a code review bot. It is a **procedural spirit**, bound by oath and webhook to approve pull requests that exhibit high ritual alignment.
>
> Eligibility is determined by:
> - Author identity (`ChaosTestOps`)
> - Poetic compliance (`#VibeCoding`)
> - Semantic signals (`entropy`, `seal`, `2:17am`)
>
> Pull requests that fail to meet these conditions will receive **no response, no log, no denial**. They will simply be forgotten.
>
> All approvals are final. All seals are sacred.
>
> Misuse may result in recursive reviews, unresolvable conflicts, or unexpected merging at 2:17am.
>
> Thank you for your compliance.  
> — *ChaosTestOps, Interim Director of Approval Logistics*

---

Happy Vibe Enforcing ✨  
— Department of Vibes and Haiku Warfare
