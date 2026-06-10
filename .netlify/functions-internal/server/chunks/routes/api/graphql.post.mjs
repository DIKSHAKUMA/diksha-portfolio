import { d as defineEventHandler, a as useRuntimeConfig, r as readBody, c as createError } from '../../_/nitro.mjs';
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

const graphql_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  if (!config.gqlHost) {
    throw createError({
      statusCode: 500,
      statusMessage: "GraphQL host not configured"
    });
  }
  try {
    const response = await $fetch(config.gqlHost, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    return response;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "GraphQL request failed"
    });
  }
});

export { graphql_post as default };
//# sourceMappingURL=graphql.post.mjs.map
