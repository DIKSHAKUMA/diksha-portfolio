import { y as defineSchemaOrgResolver, D as resolvableDateToIso, C as resolveWithBase, z as resolveRelation } from './server.mjs';
import { aggregateRatingResolver } from './index2-CWo3X_ay.mjs';
import { p as personResolver } from './index3-WudnbR5c.mjs';
import { reviewResolver } from './index32-Bc0JdRj0.mjs';
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
import './schema-org.Ba7D0Hp1-CP40R-Ht.mjs';

const musicAlbumResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "MusicAlbum"
  },
  idPrefix: "host",
  resolve(node, ctx) {
    if (node.datePublished)
      node.datePublished = resolvableDateToIso(node.datePublished);
    if (node.url)
      node.url = resolveWithBase(ctx.meta.host, node.url);
    node.byArtist = resolveRelation(node.byArtist, ctx, personResolver);
    node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
    node.review = resolveRelation(node.review, ctx, reviewResolver);
    return node;
  }
});

export { musicAlbumResolver };
//# sourceMappingURL=index19-D6BdfSs6.mjs.map
