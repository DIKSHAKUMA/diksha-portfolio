import { _ as __nuxt_component_0 } from './CommonLine-ChyYD9mX.mjs';
import { a as __nuxt_component_1 } from './CommonAbstract-B-MDeIzL.mjs';
import { _ as __nuxt_component_2 } from './CommonInfoLabel-CccTLGOM.mjs';
import { _ as _export_sfc, o as useFolioStore, e as useNuxtApp, b as __nuxt_component_3$2 } from './server.mjs';
import { defineComponent, useTemplateRef, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import './chevron-right-Db8GHSH0.mjs';
import './up-arrow-1M6ebW3K.mjs';
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
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';
import 'pinia';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ViewTechSub",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useFolioStore();
    const { $gsap } = useNuxtApp();
    useTemplateRef("pixi");
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLine = __nuxt_component_0;
      const _component_CommonAbstract = __nuxt_component_1;
      const _component_CommonInfoLabel = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_3$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "meta-wrapper" }, _attrs))} data-v-7f08d9a5><main class="meta" data-v-7f08d9a5>`);
      _push(ssrRenderComponent(_component_CommonLine, {
        pos: "absolute",
        width: ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_CommonAbstract, {
        class: "meta__header",
        label: unref(store).data.intro?.metaIntroTitle,
        desc: "",
        "is-page-header": false,
        "class-name": "meta-intro",
        "is-secondary": true,
        delay: 0,
        "is-full-width": false,
        "is-hero": false,
        author: "",
        date: "",
        "is-two-lines": false
      }, null, _parent));
      _push(ssrRenderComponent(_component_CommonInfoLabel, {
        label: "Code + Paper",
        "class-name": "meta-label",
        hpos: "center",
        "hover-label": "",
        "force-white": false,
        vpos: "flex-start",
        link: ""
      }, null, _parent));
      _push(`<div class="meta__canvas" data-v-7f08d9a5><div class="meta__tech" data-v-7f08d9a5><h5 class="split-skills-w" data-v-7f08d9a5>${ssrInterpolate(unref(store).data.intro?.metaTechTitle)}</h5><p class="meta__tech-item split-skills-w" data-v-7f08d9a5>${ssrInterpolate(unref(store).data.intro?.metaTechDesc)}</p><h5 class="split-skills-w" data-v-7f08d9a5>${ssrInterpolate(unref(store).data.intro?.metaCreativeTitle)}</h5><p class="meta__tech-item split-skills-w" data-v-7f08d9a5>${ssrInterpolate(unref(store).data.intro?.metaCreativeDesc)}</p><h5 class="split-skills-w" data-v-7f08d9a5>${ssrInterpolate(unref(store).data.intro?.metaIdeTitle)}</h5><p class="meta__tech-item split-skills-w" data-v-7f08d9a5>${ssrInterpolate(unref(store).data.intro?.metaIdeDesc)}</p><h5 class="split-skills-w" data-v-7f08d9a5>${ssrInterpolate(unref(store).data.intro?.metaPublishTitle)}</h5><p class="meta__tech-item split-skills-w" data-v-7f08d9a5>${ssrInterpolate(unref(store).data.intro?.metaPublishDesc)}</p><h5 class="split-skills-w" data-v-7f08d9a5>${ssrInterpolate(unref(store).data.intro?.metaRepoTitle)}</h5><p class="meta__tech-item split-skills-w action" data-name="menu" data-v-7f08d9a5>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(store).data.intro?.metaRepoUrl
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Folio`);
          } else {
            return [
              createTextVNode("Folio")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div><div class="canvas-container" data-v-7f08d9a5><div class="canvas-wrapper" data-v-7f08d9a5><canvas class="meta__img" data-v-7f08d9a5></canvas></div></div></div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/view/ViewTechSub.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ViewTechSub = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-7f08d9a5"]]), { __name: "ViewTechSub" });

export { ViewTechSub as default };
//# sourceMappingURL=ViewTechSub-9y5upnP-.mjs.map
