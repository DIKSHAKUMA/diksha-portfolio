import { y as defineSchemaOrgResolver, z as resolveRelation, L as resolvableDateToDate } from './server.mjs';
import { aggregateRatingResolver } from './index2-CWo3X_ay.mjs';
import { p as personResolver, o as organizationResolver } from './index3-WudnbR5c.mjs';
import { reviewResolver } from './index32-Bc0JdRj0.mjs';
import { videoResolver } from './index38-BO2Y5JyH.mjs';
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

const movieResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Movie"
  },
  resolve(node, ctx) {
    node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
    node.review = resolveRelation(node.review, ctx, reviewResolver);
    node.director = resolveRelation(node.director, ctx, personResolver);
    node.actor = resolveRelation(node.actor, ctx, personResolver);
    node.trailer = resolveRelation(node.trailer, ctx, videoResolver);
    node.productionCompany = resolveRelation(node.productionCompany, ctx, organizationResolver);
    if (node.dateCreated)
      node.dateCreated = resolvableDateToDate(node.dateCreated);
    return node;
  }
});

export { movieResolver };
//# sourceMappingURL=index18-BWo77dL0.mjs.map
