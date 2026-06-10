import { y as defineSchemaOrgResolver, L as resolvableDateToDate, C as resolveWithBase, z as resolveRelation } from './server.mjs';
import { p as personResolver } from './index3-WudnbR5c.mjs';
import 'vue';
import '../_/nitro.mjs';
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
import 'pinia';
import 'vue-router';
import './index16-Cx3PxEFD.mjs';
import './index28-DVyS68B_.mjs';
import './index40-CA7Mouth.mjs';
import './index39-Bv4X8BRG.mjs';

const musicGroupResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "MusicGroup"
  },
  idPrefix: "host",
  inheritMeta: [
    { meta: "host", key: "url" }
  ],
  resolve(node, ctx) {
    if (node.foundingDate)
      node.foundingDate = resolvableDateToDate(node.foundingDate);
    if (node.dissolutionDate)
      node.dissolutionDate = resolvableDateToDate(node.dissolutionDate);
    if (node.url)
      node.url = resolveWithBase(ctx.meta.host, node.url);
    node.member = resolveRelation(node.member, ctx, personResolver);
    return node;
  }
});

export { musicGroupResolver };
//# sourceMappingURL=index20-yANy3CU4.mjs.map
