import { y as defineSchemaOrgResolver, D as resolvableDateToIso, C as resolveWithBase, z as resolveRelation } from './server.mjs';
import { aggregateRatingResolver } from './index2-CWo3X_ay.mjs';
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

const musicRecordingResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "MusicRecording"
  },
  idPrefix: "host",
  resolve(node, ctx) {
    if (node.datePublished)
      node.datePublished = resolvableDateToIso(node.datePublished);
    if (node.url)
      node.url = resolveWithBase(ctx.meta.host, node.url);
    if (node.audio)
      node.audio = resolveWithBase(ctx.meta.host, node.audio);
    node.byArtist = resolveRelation(node.byArtist, ctx, personResolver);
    node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
    return node;
  }
});

export { musicRecordingResolver };
//# sourceMappingURL=index22-BlhOGFSL.mjs.map
