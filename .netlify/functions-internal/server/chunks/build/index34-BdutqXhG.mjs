import { y as defineSchemaOrgResolver, J as resolveDefaultType, z as resolveRelation } from './server.mjs';
import { aggregateRatingResolver } from './index2-CWo3X_ay.mjs';
import { offerResolver } from './index23-DUN-ZVU4.mjs';
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
import './schema-org.F44ipjVJ-BHgRFblE.mjs';
import './index3-WudnbR5c.mjs';
import './index16-Cx3PxEFD.mjs';
import './index28-DVyS68B_.mjs';
import './index40-CA7Mouth.mjs';
import './index39-Bv4X8BRG.mjs';
import './schema-org.Ba7D0Hp1-CP40R-Ht.mjs';

const softwareAppResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "SoftwareApplication"
  },
  resolve(node, ctx) {
    resolveDefaultType(node, "SoftwareApplication");
    node.offers = resolveRelation(node.offers, ctx, offerResolver);
    node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
    node.review = resolveRelation(node.review, ctx, reviewResolver);
    return node;
  }
});

export { softwareAppResolver };
//# sourceMappingURL=index34-BdutqXhG.mjs.map
