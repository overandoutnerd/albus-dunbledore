import { Hono } from "hono";

import {
  reddit,
  redis,
} from "@devvit/web/server";

import { QUOTES } from "../data/quotes";

export const triggers = new Hono();

const BOT_USERNAME =
  "albus-dunbledore";

function randomQuote() {
  return QUOTES[
    Math.floor(
      Math.random() * QUOTES.length
    )
  ];
}

triggers.post(
  "/comment-submit",
  async (c) => {
    try {
      const payload =
        await c.req.json();

      const authorName =
        payload.author?.name?.toLowerCase() ??
        "";

      const comment =
        payload.comment;

      // Ignore invalid payloads
      if (
        !comment?.id ||
        !comment?.body
      ) {
        return c.json(
          {
            status:
              "ignored-invalid",
          },
          200
        );
      }

      // Ignore bot's own comments
      if (
        authorName ===
        BOT_USERNAME
      ) {
        console.log(
          "[DumbledoreBot] 🤖 Ignoring self comment"
        );

        return c.json(
          {
            status:
              "ignored-self",
          },
          200
        );
      }

      const body =
        comment.body.toLowerCase();

      const subreddit =
        payload.subreddit?.name?.toLowerCase() ??
        "";

      const isHarryPotterOnHBO =
        subreddit ===
          "harrypottersonhbofake";

      const shouldReply =
        isHarryPotterOnHBO
          ? (
              body.includes(
                "dumbledore!"
              ) ||
              body.includes(
                "albus!"
              )
            )
          : (
              body.includes(
                "dumbledore"
              ) ||
              body.includes(
                "albus"
              )
            );

      // Only trigger if dumbledore mentioned
      if (
        !shouldReply
      ) {
        return c.json(
          {
            status: "ignored",
          },
          200
        );
      }

      // GLOBAL dedupe key
      const key = `comment:${comment.id}`;

      // Check if already processed
      const existing =
        await redis.get(key);

      if (existing) {
        console.log(
          "[DumbledoreBot] ⚠️ Duplicate ignored:",
          comment.id
        );

        return c.json(
          {
            status:
              "duplicate",
          },
          200
        );
      }

      // Lock immediately
      await redis.set(
        key,
        "processed"
      );

      console.log(
        "[DumbledoreBot] 📨 TRIGGER HIT:",
        comment.id
      );

      await reddit.submitComment({
        id: comment.id,
        text:
          `${randomQuote()}`,
      });

      console.log(
        "[DumbledoreBot] ✅ Reply sent"
      );

      return c.json(
        {
          status: "success",
        },
        200
      );
    } catch (err) {
      console.error(
        "[DumbledoreBot] ❌ ERROR:",
        err
      );

      // NEVER return 500
      // or Devvit retries events
      return c.json(
        {
          status: "error",
        },
        200
      );
    }
  }
);
