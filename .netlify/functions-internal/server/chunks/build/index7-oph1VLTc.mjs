import { y as defineSchemaOrgResolver, J as resolveDefaultType, z as resolveRelation, D as resolvableDateToIso } from './server.mjs';
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

const PrimaryDatasetId = "#dataset";
const datasetResolver = defineSchemaOrgResolver({
  defaults: {
    "@type": "Dataset"
  },
  inheritMeta: [
    "description",
    "url",
    "dateModified",
    "datePublished",
    { meta: "title", key: "name" }
  ],
  idPrefix: ["url", PrimaryDatasetId],
  resolve(node, ctx) {
    resolveDefaultType(node, "Dataset");
    node.creator = resolveRelation(node.creator, ctx, personResolver, {
      root: true
    });
    node.dateModified = resolvableDateToIso(node.dateModified);
    node.datePublished = resolvableDateToIso(node.datePublished);
    return node;
  }
});

export { PrimaryDatasetId, datasetResolver };
//# sourceMappingURL=index7-oph1VLTc.mjs.map
