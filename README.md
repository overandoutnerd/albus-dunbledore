# Albus Dumbledore Bot

A Reddit Devvit bot inspired by Albus Dumbledore from the Harry Potter universe.

Whenever someone mentions `dumbledore` in a Reddit comment, the bot replies with a random Dumbledore quote.

Built using Devvit, Hono, TypeScript, and Redis.

---

# Features

- Automatically detects mentions of `dumbledore`
- Replies with random quotes
- Ignores its own comments to prevent loops
- Redis-powered duplicate protection
- Lightweight and fast
- Works on subreddit comment submissions
- Private/unlisted deployment supported

---

# Example

## User Comment

```txt
Dumbledore was right about everything.
```

## Bot Reply

```txt
Happiness can be found even in dark times.
```

---

# Tech Stack

- TypeScript
- Devvit
- Hono
- Node.js
- Redis

---

# Project Structure

```txt
src/
├── data/
│   └── quotes.ts
│
├── routes/
│   └── triggers.ts
│
├── server/
│   └── index.ts
│
└── devvit.json
```

---

# How It Works

When a new Reddit comment is submitted:

1. Devvit sends a trigger event.
2. The bot checks if the comment contains the word `dumbledore`.
3. The bot ignores comments made by itself.
4. Redis checks whether the comment has already been processed.
5. If not processed:
   - A random quote is selected.
   - The bot replies.
   - The comment ID is stored in Redis.
6. Duplicate events are ignored safely.

---

# Why Redis Is Used

Devvit can occasionally deliver the same event multiple times.

Without Redis:

- Multiple runtimes may process the same comment.
- The bot may send duplicate replies.
- Reddit may trigger rate limits.

Redis acts as shared persistent storage between runtimes.

This guarantees:

```txt
One comment = One reply
```

---

# Installation

## Clone Repository

```bash
git clone <your-repo-url>
cd albus-dunbledore
```

---

## Install Dependencies

```bash
npm install
```

---

# Development

Run development mode:

```bash
npm run dev
```

Build project:

```bash
npm run build
```

---

# Production Deployment

Publish app:

```bash
npx devvit publish
```

Install app:

```bash
npx devvit install r/YOUR_SUBREDDIT
```

---

# Configuration

## devvit.json

```json
{
  "$schema": "https://developers.reddit.com/schema/config-file.v1.json",
  "name": "albus-dunbledore",

  "server": {
    "entry": "index.cjs"
  },

  "permissions": {
    "reddit": {
      "enable": true
    },
    "redis": true
  },

  "triggers": {
    "onCommentSubmit": "/internal/triggers/comment-submit"
  },

  "dev": {
    "subreddit": "YOUR_SUBREDDIT"
  },

  "media": {
    "dir": "assets"
  },

  "marketingAssets": {
    "icon": "icon.png"
  }
}
```

---

# Quote Storage

Quotes are stored inside:

```txt
src/data/quotes.ts
```

Example:

```ts
export const QUOTES = [
  "Happiness can be found even in dark times.",
  "One can never have enough socks.",
];
```

---

# Trigger Logic

Main trigger route:

```txt
src/routes/triggers.ts
```

Responsibilities:

- Handle comment submit events
- Detect keywords
- Ignore self comments
- Prevent duplicate replies
- Submit Reddit replies

---

# Duplicate Protection

Each processed comment is stored in Redis using:

```txt
comment:<comment_id>
```

Example:

```txt
comment:t1_abc123
```

If another runtime receives the same event:

```txt
Duplicate ignored
```

---

# Rate Limiting

Reddit rate limits bots aggressively during development.

This app avoids replay storms by:

- Never returning HTTP 500
- Gracefully handling errors
- Using Redis deduplication

---

# Common Issues

## Duplicate Replies

Cause:

- Event replay
- Multiple runtimes
- Missing deduplication

Solution:

- Redis locking

---

## Bot Replies To Itself

Cause:

- Missing username check

Solution:

```ts
if (authorName === BOT_USERNAME)
```

---

## App Not Responding

Check:

- App installed correctly
- Trigger route configured
- Redis permission enabled
- `dumbledore` exists in comment

---

# Assets

App icons and media files are stored inside:

```txt
assets/
```

Example:

```txt
assets/icon.png
```

---

# Future Ideas

Potential improvements:

- Subreddit-specific quotes
- Quote categories
- Admin controls
- Mod-only configuration
- Different personalities
- Reply formatting styles

---

# License

This project is a fan-made bot inspired by the Harry Potter universe.

Harry Potter and related characters belong to their respective copyright holders.

---

# Author

Built by al.

> "Nitwit! Blubber! Oddment! Tweak!"
