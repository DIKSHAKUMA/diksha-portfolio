import { d as defineEventHandler, a as useRuntimeConfig, c as createError } from '../../_/nitro.mjs';
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

const weather = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.openWeatherApiKey;
  const city = "Barcelona";
  try {
    const weather = await $fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},ES&units=metric&appid=${apiKey}`);
    return {
      temperature: Math.round(weather.main.temp),
      humidity: weather.main.humidity,
      condition: weather.weather[0].main.toLowerCase(),
      location: weather.name,
      timezone: weather.timezone,
      /* Format as en GB, dt is Unix timestamp */
      localTime: new Date(weather.dt * 1e3).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Madrid"
        /* Barcelona timezone */
      })
    };
  } catch (error) {
    console.error("Weather API Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch weather data: ${error.message}`
    });
  }
});

export { weather as default };
//# sourceMappingURL=weather.mjs.map
