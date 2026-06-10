import { _ as __nuxt_component_0$1, a as __nuxt_component_1$1 } from './CommonAbstract-B-MDeIzL.mjs';
import { defineComponent, defineAsyncComponent, mergeProps, unref, h, shallowRef, watch, useSSRContext, hydrateOnIdle } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import * as THREE from 'three';
import { _ as _export_sfc, a as useHead, f as useSchemaOrg, e as useNuxtApp, o as useFolioStore, r as useColorMode } from './server.mjs';
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

const radius = 1.2;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AnimThreeRibbon",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMode = useColorMode();
    shallowRef(null);
    shallowRef(null);
    shallowRef(null);
    const geometry = shallowRef(null);
    shallowRef(null);
    shallowRef(null);
    shallowRef(0);
    shallowRef(true);
    const count = shallowRef(4e4);
    let positions = new Float32Array(count.value * 3);
    let colors = new Float32Array(count.value * 3);
    let strands = new Float32Array(count.value);
    const silverWarm1 = new THREE.Color(1, 0.98, 0.96);
    const silverWarm2 = new THREE.Color(0.96, 0.98, 1);
    const silverCool1 = new THREE.Color(1, 1, 0.98);
    const silverCool2 = new THREE.Color(1, 1, 1);
    const greenLight1 = new THREE.Color(46 / 255, 139 / 255, 87 / 255);
    const greenLight2 = new THREE.Color(60 / 255, 179 / 255, 113 / 255);
    const greenDark1 = new THREE.Color(34 / 255, 139 / 255, 34 / 255);
    const greenDark2 = new THREE.Color(0 / 255, 100 / 255, 0 / 255);
    const generateColors = () => {
      const isLight = colorMode.value === "light";
      const warm1 = isLight ? greenLight1 : silverWarm1;
      const warm2 = isLight ? greenLight2 : silverWarm2;
      const cool1 = isLight ? greenDark1 : silverCool1;
      const cool2 = isLight ? greenDark2 : silverCool2;
      for (let i = 0; i < count.value; i++) {
        const i3 = i * 3;
        const strand = strands[i];
        const r = Math.sqrt(
          (positions[i3 + 1] ?? 0) ** 2 + (positions[i3 + 2] ?? 0) ** 2
        );
        const t = Math.min(r / radius, 1);
        const mixedColor = strand === 0 ? warm1.clone().lerp(warm2, t) : cool1.clone().lerp(cool2, t);
        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }
      if (geometry.value?.attributes?.color) {
        geometry.value.attributes.color.needsUpdate = true;
      }
    };
    watch(
      () => colorMode.value,
      (newVal, oldVal) => {
        generateColors();
      },
      {
        immediate: true
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ribbon-container" }, _attrs))} data-v-fac7c0cc><canvas class="ribbon-canvas" data-v-fac7c0cc></canvas></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/anim/AnimThreeRibbon.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-fac7c0cc"]]), { __name: "AnimThreeRibbon" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ViewHeroHome",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useFolioStore();
    const { $gsap } = useNuxtApp();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AnimThreeRibbon = __nuxt_component_0;
      const _component_CommonAbstract = __nuxt_component_1$1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "hero-wrapper" }, _attrs))} data-v-d809f41e>`);
      _push(ssrRenderComponent(_component_AnimThreeRibbon, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonAbstract, {
        class: "front-header",
        label: unref(store).data.intro?.heroIntroTitle,
        delay: 1,
        "is-page-header": false,
        desc: unref(store).data.intro?.heroIntroDesc,
        "class-name": "home-intro",
        "is-hero": true,
        "is-full-width": false,
        "is-secondary": false,
        "is-two-lines": true,
        author: "",
        date: ""
      }, null, _parent));
      _push(`</main>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/view/ViewHeroHome.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-d809f41e"]]), { __name: "ViewHeroHome" });
function defineLazyComponent(props, defineStrategy) {
  return (id, loader) => defineComponent({
    inheritAttrs: false,
    props,
    emits: ["hydrated"],
    setup(props2, ctx) {
      {
        const nuxtApp = useNuxtApp();
        nuxtApp.hook("app:rendered", ({ ssrContext }) => {
          ssrContext["~lazyHydratedModules"] ||= /* @__PURE__ */ new Set();
          ssrContext["~lazyHydratedModules"].add(id);
        });
      }
      const child = defineAsyncComponent({ loader });
      const comp = defineAsyncComponent({
        hydrate: defineStrategy(props2),
        loader: () => Promise.resolve(child)
      });
      const onVnodeMounted = () => {
        ctx.emit("hydrated");
      };
      return () => h(comp, mergeProps(ctx.attrs, { onVnodeMounted }), ctx.slots);
    }
  });
}
const createLazyIdleComponent = defineLazyComponent(
  {
    hydrateOnIdle: {
      type: [Number, Boolean],
      required: false,
      default: true
    }
  },
  (props) => props.hydrateOnIdle === 0 ? void 0 : hydrateOnIdle(props.hydrateOnIdle === true ? void 0 : props.hydrateOnIdle)
);
const __nuxt_component_2_lazy = defineAsyncComponent(() => import('./ViewParallaxHome-BbbVkh40.mjs').then((c) => c.default || c));
const __nuxt_component_3_lazy = defineAsyncComponent(() => import('./ViewProjectsHome-CZJOvH_U.mjs').then((c) => c.default || c));
const __nuxt_component_4_lazy = defineAsyncComponent(() => import('./ViewAwardsHome-CMPpzMf0.mjs').then((c) => c.default || c));
const __nuxt_component_5_lazy = defineAsyncComponent(() => import('./ViewKnowledgeSub-D2GvHH06.mjs').then((c) => c.default || c));
const __nuxt_component_6_lazy = defineAsyncComponent(() => import('./ViewTechSub-9y5upnP-.mjs').then((c) => c.default || c));
const __nuxt_component_7_lazy_idle = createLazyIdleComponent("components/view/ViewFooterSub.vue", () => import('./ViewFooterSub-hJ8-aNRX.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      meta: [
        { name: "description", content: "Creative developer and designer crafting digital experiences with modern web technologies. Specializing in Vue.js, Nuxt.js, and interactive code." },
        { name: "keywords", content: "Thomas Thorstensson, creative developer, web designer, Vue.js, Nuxt.js, Svelte, APIs, frontend developer, portfolio, interactive design" },
        { name: "author", content: "Thomas Thorstensson" },
        { name: "robots", content: "index, follow" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0, viewport-fit=cover" },
        { property: "og:title", content: "Thomas Thorstensson • Creative Dev." },
        { property: "og:description", content: "Creative developer and designer crafting digital experiences with modern web technologies." },
        { property: "og:image", content: "/og-image.jpg" },
        { property: "og:image:alt", content: "Thomas Thorstensson Portfolio" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://thomasthorstensson.com" },
        { property: "og:site_name", content: "Thomas Thorstensson • Creative Dev." }
      ]
    });
    useSchemaOrg([
      {
        "@type": "Person",
        name: "Thomas Thorstensson",
        jobTitle: "Creative Developer & Designer",
        url: "https://thomasthorstensson.com",
        sameAs: [
          "https://https://github.com/thorstensson",
          "https://linkedin.com/in/thomasthorstensson",
          "https://bsky.app/profile/thorstensson.bsky.social"
        ],
        knowsAbout: [
          "Web Development",
          "Vue.js",
          "Nuxt.js",
          "Creative Coding",
          "UI/UX Design",
          "APIs",
          "Svelte"
        ]
      },
      {
        "@type": "WebSite",
        name: "Thomas Thorstensson Portfolio",
        url: "https://thomasthorstensson.com",
        description: "Creative developer. I express content through motion and interactivity.",
        author: {
          "@type": "Person",
          name: "Thomas Thorstensson"
        }
      }
    ]);
    const { $lenis } = useNuxtApp();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIMouseCursor = __nuxt_component_0$1;
      const _component_ViewHeroHome = __nuxt_component_1;
      const _component_LazyViewParallaxHome = __nuxt_component_2_lazy;
      const _component_LazyViewProjectsHome = __nuxt_component_3_lazy;
      const _component_LazyViewAwardsHome = __nuxt_component_4_lazy;
      const _component_LazyViewKnowledgeSub = __nuxt_component_5_lazy;
      const _component_LazyViewTechSub = __nuxt_component_6_lazy;
      const _component_LazyIdleViewFooterSub = __nuxt_component_7_lazy_idle;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-fa221c5b>`);
      _push(ssrRenderComponent(_component_UIMouseCursor, null, null, _parent));
      _push(`<div class="home-wrapper" data-v-fa221c5b>`);
      _push(ssrRenderComponent(_component_ViewHeroHome, null, null, _parent));
      _push(ssrRenderComponent(_component_LazyViewParallaxHome, null, null, _parent));
      _push(ssrRenderComponent(_component_LazyViewProjectsHome, null, null, _parent));
      _push(ssrRenderComponent(_component_LazyViewAwardsHome, null, null, _parent));
      _push(ssrRenderComponent(_component_LazyViewKnowledgeSub, null, null, _parent));
      _push(ssrRenderComponent(_component_LazyViewTechSub, null, null, _parent));
      _push(ssrRenderComponent(_component_LazyIdleViewFooterSub, {
        "hydrate-on-idle": "",
        label: "Projects",
        link: "/projects",
        target: "_self",
        linkLabel: "View"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa221c5b"]]);

export { index as default };
//# sourceMappingURL=index-4qjJDxtW.mjs.map
