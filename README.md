# Fortnite Generator Bot

A Discord Fortnite account generator bot with stock management, auto-drops, subscriptions, invite tracking, and vouches.

## Features

- 🎮 **Generate** Fortnite accounts from stock via `/generate`
- 📦 **Stock management** — upload `.txt` files to add accounts per category
- 🎁 **Auto-drop system** — automatically drops accounts in a channel on a timer
- 🪙 **Token system** — give users tokens
- 📨 **Invite tracking** — track who invited who, leaderboard
- ⭐ **Vouch system** — users can leave star-rated vouches
- 💳 **Subscriptions** — assign tiers (Basic, Plus, Premium) to users
- 📊 **Beautiful embeds** — channel embed + DM with credentials on generate

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create your `.env` file

```bash
cp .env.example .env
```

Edit `.env` and fill in:
- `BOT_TOKEN` — your bot token from [Discord Developer Portal](https://discord.com/developers/applications)
- `CLIENT_ID` — your application's Client ID
- `OWNER_ID` — your personal Discord user ID (for owner-only commands)

### 3. Create your Discord bot

1. Go to [discord.com/developers/applications](https://discord.com/developers/applications)
2. Click **New Application**, give it a name
3. Go to **Bot** tab → **Reset Token** → copy the token
4. Under **Privileged Gateway Intents**, enable:
   - **Server Members Intent**
   - **Message Content Intent**
5. Go to **OAuth2 → URL Generator**, select:
   - Scopes: `bot`, `applications.commands`
   - Bot Permissions: `Send Messages`, `Embed Links`, `Create Instant Invite`, `Read Message History`, `Manage Guild`
6. Use the generated URL to invite the bot to your server

### 4. Register slash commands

```bash
npm run deploy
```

This registers all commands globally (can take up to 1 hour to propagate) or use guild commands for instant registration.

### 5. Start the bot

```bash
npm start
```

---

## Adding Stock

Use `/addstock` with a `.txt` file attached. The file should have **one account per line**:

```
email@example.com:password123
user2@example.com:hunter2
```

You can use any format — whatever you paste in the txt file is what gets sent to the user.

---

## All Commands

### 🎮 Generate
| Command | Description |
|---------|-------------|
| `/generate [category]` | Generate an account (sends DM with credentials) |

### 📦 Stock Management
| Command | Description |
|---------|-------------|
| `/addstock <category> <file>` | Add stock from a .txt file |
| `/viewstock` | View all stock counts |
| `/clearstock [category]` | Clear stock (all or one category) |
| `/adddropstock <category> <file>` | Add stock to the drop pool |
| `/viewdropstock` | View drop pool counts |
| `/cleardropstock [category]` | Clear drop pool |

### 🎁 Drop System
| Command | Description |
|---------|-------------|
| `/dropstart <channel>` | Start auto-dropping accounts |
| `/dropstop` | Stop the drop system |
| `/dropstatus` | Check if drop is running |
| `/dropcooldown <seconds>` | Set interval between drops |

### ⚙️ Configuration
| Command | Description |
|---------|-------------|
| `/setchannel [channel]` | Restrict /generate to a channel |
| `/checkchannel` | Check current gen channel |
| `/setcooldown <seconds>` | Set per-user generate cooldown |
| `/edit <setting> <value>` | Edit bot config values |
| `/sync` | *(Owner only)* Re-sync slash commands |

### 💳 Subscriptions & Tokens
| Command | Description |
|---------|-------------|
| `/setsubscription <user> <tier> [days]` | Set user subscription |
| `/checksub [user]` | Check subscription status |
| `/addtokens <user> <amount>` | Give tokens to a user |
| `/viewtokens [user]` | View token balance |

### 📨 Invite Tracking
| Command | Description |
|---------|-------------|
| `/createinvite [max_uses] [max_age]` | Create a tracked invite |
| `/invites [user]` | Check invite count |
| `/inviteleaderboard` | Top inviters leaderboard |
| `/refreshinvites` | Refresh invite cache |
| `/resetjoins <user>` | Reset join count for a user |
| `/viewjoins <user>` | View who joined via an inviter |
| `/resetplustime <user>` | Reset plus time for a user |
| `/resetallplustime` | Reset plus time for all users |

### ⭐ Vouches
| Command | Description |
|---------|-------------|
| `/vouch <message> [stars]` | Leave a vouch (1-5 stars) |
| `/vouches` | View recent vouches |
| `/deletevouch <id>` | Delete a vouch by ID |

### 📊 Stats
| Command | Description |
|---------|-------------|
| `/messages [user]` | Check message count |

---

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

> ⚠️ Make sure your `.env` file is in `.gitignore` (it is by default) — never push your bot token!

---

## File Structure

```
bot/
├── commands/          # All slash command files
├── stock/             # Stock .txt files (gitignored)
├── data/              # SQLite database (gitignored)
├── index.js           # Main bot entry point
├── database.js        # Database helpers
├── deploy-commands.js # Register slash commands
├── .env               # Your secrets (never commit this)
├── .env.example       # Template for .env
└── package.json
```
