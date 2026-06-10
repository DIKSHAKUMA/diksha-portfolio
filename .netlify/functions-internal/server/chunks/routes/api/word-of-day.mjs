import { d as defineEventHandler } from '../../_/nitro.mjs';
import 'lru-cache';
import '@unocss/core';
import '@unocss/preset-wind3';
import 'devalue';
import 'consola';
import 'unhead';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue';
import '@iconify/utils';
import 'node:crypto';
import 'fast-xml-parser';
import 'unhead/server';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';

const wordOfDay = defineEventHandler(async (event) => {
  try {
    const response = await $fetch("https://www.merriam-webster.com/wotd/feed/rss2", {
      parseResponse: (txt) => txt
    });
    const itemMatch = response.match(/<item>.*?<\/item>/s);
    if (!itemMatch) {
      throw new Error("No item found in RSS feed");
    }
    const item = itemMatch[0];
    const wordMatch = item.match(/<title><!\[CDATA\[(.+?)\]\]><\/title>/);
    const descriptionMatch = item.match(/<description><!\[CDATA\[([\s\S]+?)\]\]><\/description>/);
    if (wordMatch && descriptionMatch) {
      const fullTitle = wordMatch[1];
      const word = fullTitle.split(":")[0].trim();
      let definition = descriptionMatch[1];
      const defMatch = definition.match(/<p>([^<]*(?:is to|means to|refers to)[^<]*)<\/p>/);
      if (defMatch) {
        definition = defMatch[1];
      } else {
        const paragraphMatch = definition.match(/<p>([^<]{20,})<\/p>/);
        if (paragraphMatch) {
          definition = paragraphMatch[1];
        } else {
          definition = definition.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, "").split(".")[0] + ".";
        }
      }
      definition = definition.replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&#149;/g, "\u2022").trim();
      return {
        word,
        definition: definition.substring(0, 200) + (definition.length > 200 ? "..." : ""),
        date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        })
      };
    }
    throw new Error("Could not parse word data");
  } catch (error) {
    console.error("Word of day API error:", error);
    return {
      word: "Serendipity",
      definition: "The occurrence and development of events by chance in a happy or beneficial way.",
      date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    };
  }
});

export { wordOfDay as default };
//# sourceMappingURL=word-of-day.mjs.map
