import { defineComponent, provide, computed, onErrorCaptured, createVNode } from 'vue';
import { viewDepthKey } from 'vue-router';
import { i as islandComponents, c as createError, p as pageIslandRoutes, u as useRoute } from './server.mjs';
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

const PAGE_ISLAND_PREFIX = "page_";
const IslandRenderer = defineComponent({
  name: "IslandRenderer",
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const name = props.context.name;
    const component = Object.hasOwn(islandComponents, name) ? islandComponents[name] : void 0;
    if (!component) {
      throw createError({
        status: 404,
        statusText: `Island component not found: ${props.context.name}`
      });
    }
    if (props.context.name.startsWith(PAGE_ISLAND_PREFIX)) {
      const expectedIslandKey = pageIslandRoutes[props.context.name];
      const route = useRoute();
      provide(viewDepthKey, computed(() => {
        const depth = route.matched.findIndex((m) => m.components?.default?.__nuxt_island === expectedIslandKey);
        return depth === -1 ? 0 : depth + 1;
      }));
    }
    onErrorCaptured((e) => {
      console.log(e);
    });
    return () => createVNode(component || "span", { ...props.context.props, "data-island-uid": "" });
  }
});

export { IslandRenderer as default };
//# sourceMappingURL=island-renderer-cKg6mQvC.mjs.map
