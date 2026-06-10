import { _ as __nuxt_component_0 } from './CommonLine-ChyYD9mX.mjs';
import { a as __nuxt_component_1 } from './CommonAbstract-B-MDeIzL.mjs';
import { _ as __nuxt_component_2 } from './CommonInfoLabel-CccTLGOM.mjs';
import { defineComponent, mergeProps, unref, shallowRef, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, o as useFolioStore, e as useNuxtApp, r as useColorMode } from './server.mjs';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AnimSkills",
  __ssrInlineRender: true,
  setup(__props) {
    const { $gsap } = useNuxtApp();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tech-wrapper" }, _attrs))} data-v-0521819c><div class="text" data-v-0521819c><span class="quote" data-v-0521819c>TypeScript</span><span class="quote" data-v-0521819c>Nuxt / Vue</span><span class="quote" data-v-0521819c>Svelte</span><span class="quote" data-v-0521819c>SvelteKit</span><span class="quote" data-v-0521819c>SSR</span><span class="quote" data-v-0521819c>Pixi.js</span><span class="quote" data-v-0521819c>Three.js</span><span class="quote" data-v-0521819c>GraphQL</span><span class="quote" data-v-0521819c>GSAP</span><span class="quote" data-v-0521819c>UI/UX</span><span class="quote" data-v-0521819c>Figma</span><span class="quote" data-v-0521819c>Turborepo</span><span class="quote" data-v-0521819c>Web Performance</span><span class="quote" data-v-0521819c>Problem Solving</span></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/anim/AnimSkills.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-0521819c"]]), { __name: "AnimSkills" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AnimDynamic",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMode = useColorMode();
    const containerRef = shallowRef(null);
    const updateColors = () => {
    };
    watch(() => colorMode.value, updateColors);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "containerRef",
        ref: containerRef,
        class: "anim-wrapper"
      }, _attrs))} data-v-70f58123><div class="anim-bg" data-v-70f58123></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/anim/AnimDynamic.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-70f58123"]]), { __name: "AnimDynamic" });
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ui-wrapper" }, _attrs))} data-v-3c20d30d><div class="ui" data-v-3c20d30d><div class="arrow-next-row" data-v-3c20d30d><div class="next-text" data-v-3c20d30d>NEXT</div><div class="arrows" data-v-3c20d30d><span data-v-3c20d30d></span><span data-v-3c20d30d></span><span data-v-3c20d30d></span></div></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/anim/AnimUX.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5$1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-3c20d30d"]]), { __name: "AnimUX" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ViewKnowledgeSub",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useFolioStore();
    const { $gsap } = useNuxtApp();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLine = __nuxt_component_0;
      const _component_CommonAbstract = __nuxt_component_1;
      const _component_CommonInfoLabel = __nuxt_component_2;
      const _component_AnimSkills = __nuxt_component_3;
      const _component_AnimDynamic = __nuxt_component_4;
      const _component_AnimUX = __nuxt_component_5$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "know-wrapper" }, _attrs))} data-v-6f0d56ff>`);
      _push(ssrRenderComponent(_component_CommonLine, {
        pos: "absolute",
        width: ""
      }, null, _parent));
      _push(`<main class="know" data-v-6f0d56ff>`);
      _push(ssrRenderComponent(_component_CommonAbstract, {
        class: "know__label",
        desc: "",
        label: unref(store).data.intro?.knowIntroTitle,
        "is-page-header": false,
        "class-name": "know-intro",
        "is-secondary": true,
        delay: 0,
        "is-full-width": false,
        "is-hero": false,
        author: "",
        date: "",
        "is-two-lines": false
      }, null, _parent));
      _push(ssrRenderComponent(_component_CommonInfoLabel, {
        label: "Interactive Developer",
        "class-name": "photo-label",
        hpos: "center",
        "hover-label": "",
        "force-white": false,
        vpos: "flex-start",
        link: ""
      }, null, _parent));
      _push(`<section class="know__demo" data-v-6f0d56ff><div class="know__demo-wrapper" data-v-6f0d56ff><div class="know__demo-block" data-v-6f0d56ff><h2 class="know__demo-title" data-v-6f0d56ff>${ssrInterpolate(unref(store).data.intro?.knowOneTitle)}</h2><p class="know__demo-desc" data-v-6f0d56ff>${ssrInterpolate(unref(store).data.intro?.knowOneDesc)}</p>`);
      _push(ssrRenderComponent(_component_AnimSkills, { class: "know__demo-comp" }, null, _parent));
      _push(`</div><div class="know__demo-block" data-v-6f0d56ff><h2 class="know__demo-title" data-v-6f0d56ff>${ssrInterpolate(unref(store).data.intro?.knowTwoTitle)}</h2><p class="know__demo-desc" data-v-6f0d56ff>${ssrInterpolate(unref(store).data.intro?.knowTwoDesc)}</p>`);
      _push(ssrRenderComponent(_component_AnimDynamic, { class: "know__demo-comp" }, null, _parent));
      _push(`</div><div class="know__demo-block" data-v-6f0d56ff><h2 class="know__demo-title" data-v-6f0d56ff>${ssrInterpolate(unref(store).data.intro?.knowThreeTitle)}</h2><p class="know__demo-desc" data-v-6f0d56ff>${ssrInterpolate(unref(store).data.intro?.knowThreeDesc)}</p>`);
      _push(ssrRenderComponent(_component_AnimUX, { class: "know__demo-comp" }, null, _parent));
      _push(`</div></div></section></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/view/ViewKnowledgeSub.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-6f0d56ff"]]), { __name: "ViewKnowledgeSub" });

export { __nuxt_component_5 as default };
//# sourceMappingURL=ViewKnowledgeSub-D2GvHH06.mjs.map
