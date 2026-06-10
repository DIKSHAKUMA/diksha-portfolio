import { y as defineSchemaOrgResolver, z as resolveRelation, D as resolvableDateToIso } from './server.mjs';
import { aggregateRatingResolver } from './index2-CWo3X_ay.mjs';
import { p as personResolver, o as organizationResolver } from './index3-WudnbR5c.mjs';
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

const podcastSeasonResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "PodcastSeason"
  },
  resolve(node, ctx) {
    node.actor = resolveRelation(node.actor, ctx, personResolver);
    node.director = resolveRelation(node.director, ctx, personResolver);
    node.productionCompany = resolveRelation(node.productionCompany, ctx, organizationResolver);
    node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
    if (node.datePublished)
      node.datePublished = resolvableDateToIso(node.datePublished);
    if (node.startDate)
      node.startDate = resolvableDateToIso(node.startDate);
    if (node.endDate)
      node.endDate = resolvableDateToIso(node.endDate);
    return node;
  }
});

export { podcastSeasonResolver };
//# sourceMappingURL=index26-DdN3yJY0.mjs.map
