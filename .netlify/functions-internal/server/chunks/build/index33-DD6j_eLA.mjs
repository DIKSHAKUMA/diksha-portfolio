import { y as defineSchemaOrgResolver, I as IdentityId, A as setIfEmpty, E as idReference, J as resolveDefaultType, z as resolveRelation } from './server.mjs';
import { aggregateRatingResolver } from './index2-CWo3X_ay.mjs';
import { offerResolver } from './index23-DUN-ZVU4.mjs';
import { reviewResolver } from './index32-Bc0JdRj0.mjs';
import { d as PrimaryWebPageId } from './index3-WudnbR5c.mjs';
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
import './schema-org.F44ipjVJ-BHgRFblE.mjs';
import './schema-org.Ba7D0Hp1-CP40R-Ht.mjs';
import './index16-Cx3PxEFD.mjs';
import './index28-DVyS68B_.mjs';
import './index40-CA7Mouth.mjs';
import './index39-Bv4X8BRG.mjs';

const ServiceId = "#service";
const serviceResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Service"
  },
  inheritMeta: [
    "description",
    "image",
    { meta: "title", key: "name" }
  ],
  idPrefix: ["url", ServiceId],
  resolve(node, ctx) {
    resolveDefaultType(node, "Service");
    node.offers = resolveRelation(node.offers, ctx, offerResolver);
    node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
    node.review = resolveRelation(node.review, ctx, reviewResolver);
    return node;
  },
  resolveRootNode(service, { find }) {
    const webPage = find(PrimaryWebPageId);
    const identity = find(IdentityId);
    if (identity)
      setIfEmpty(service, "provider", idReference(identity));
    if (identity)
      setIfEmpty(service, "brand", idReference(identity));
    if (webPage)
      setIfEmpty(service, "mainEntityOfPage", idReference(webPage));
    return service;
  }
});

export { ServiceId, serviceResolver };
//# sourceMappingURL=index33-DD6j_eLA.mjs.map
