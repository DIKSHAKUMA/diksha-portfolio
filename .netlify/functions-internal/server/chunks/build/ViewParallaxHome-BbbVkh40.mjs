import { a as __nuxt_component_1 } from './CommonAbstract-B-MDeIzL.mjs';
import { _ as __nuxt_component_2 } from './CommonInfoLabel-CccTLGOM.mjs';
import { defineComponent, useTemplateRef, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, o as useFolioStore, e as useNuxtApp } from './server.mjs';
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
  __name: "ViewParallaxHome",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useFolioStore();
    const { $gsap } = useNuxtApp();
    useTemplateRef("parallaxWrapper");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonAbstract = __nuxt_component_1;
      const _component_CommonInfoLabel = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-wrapper" }, _attrs))} data-v-baa7636c><main class="about" data-v-baa7636c><div class="parallax__wrapper" data-v-baa7636c><span class="parallax__bg" data-v-baa7636c></span></div>`);
      _push(ssrRenderComponent(_component_CommonAbstract, {
        class: "about__label",
        label: unref(store).data.intro?.aboutIntroTitle,
        desc: unref(store).data.intro?.aboutIntroDesc,
        "is-page-header": false,
        "class-name": "about-intro",
        "is-secondary": true,
        delay: 0,
        "is-full-width": false,
        "is-hero": false,
        author: "",
        date: "",
        "is-two-lines": false
      }, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_CommonInfoLabel, {
        label: "THE MOON",
        "class-name": "project-label",
        hpos: "right",
        "hover-label": "",
        "force-white": true,
        vpos: "flex-start",
        link: "",
        style: { "z-index": "100" }
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/view/ViewParallaxHome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ViewParallaxHome = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-baa7636c"]]), { __name: "ViewParallaxHome" });

export { ViewParallaxHome as default };
//# sourceMappingURL=ViewParallaxHome-BbbVkh40.mjs.map
