# Albus Dumbledore Bot

A simple Reddit bot built with Devvit that replies with random Dumbledore quotes whenever someone mentions “Albus” or “Dumbledore” in a comment.

The goal was to make something lightweight, fun, and easy to maintain app.

---

## Features

- Replies to comments containing:
  - `albus`
  - `dumbledore`
- Random quote selection
- Case-insensitive matching
- Basic self-reply protection
- Lightweight TypeScript codebase
- Built using Reddit Devvit

---

## Example

**User comment:**

```txt
Dumbledore would probably say something wise here
```

**Bot reply:**

```txt
“Happiness can be found even in the darkest of times, if one remembers to turn on the light.”
```

---

## Tech Stack

- TypeScript
- Reddit Devvit
- Hono
- Node.js

---

## How It Works

The bot listens for new Reddit comments.

When a comment contains either:

- `albus`
- `dumbledore`

the bot selects a random quote from a predefined quote list and posts it as a reply.

---

## Safety

The bot includes basic protections to avoid:

- replying to itself and creating loops
- replying to same comment more than one

---

## Quotes

Quotes are stored in:

```txt
src/data/quotes.ts
```

Example:

```ts
export const QUOTES = [
  "Nitwit. Blubber. Oddment. Tweak.",
  "Happiness can be found even in the darkest of times.",
];
```
---

## License

MIT
