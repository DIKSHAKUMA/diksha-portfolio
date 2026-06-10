import { _ as __nuxt_component_0$1, a as __nuxt_component_1$1 } from './CommonAbstract-B-MDeIzL.mjs';
import { defineComponent, unref, useTemplateRef, mergeProps, ref, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import * as THREE from 'three';
import { _ as _export_sfc, a as useHead, o as useFolioStore, e as useNuxtApp, r as useColorMode } from './server.mjs';
import { _ as __nuxt_component_2$1 } from './CommonInfoLabel-CccTLGOM.mjs';
import { _ as __nuxt_component_0$2 } from './CommonLine-ChyYD9mX.mjs';
import __nuxt_component_5 from './ViewKnowledgeSub-D2GvHH06.mjs';
import __nuxt_component_6 from './ViewFooterSub-hJ8-aNRX.mjs';
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

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "AnimShellsThree",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMode = useColorMode();
    const container = ref();
    new THREE.Color(1, 0.98, 0.96);
    new THREE.Color(0.96, 0.98, 1);
    new THREE.Color(1, 1, 0.98);
    new THREE.Color(1, 1, 1);
    new THREE.Color(46 / 255, 139 / 255, 87 / 255);
    new THREE.Color(60 / 255, 179 / 255, 113 / 255);
    new THREE.Color(34 / 255, 139 / 255, 34 / 255);
    new THREE.Color(0 / 255, 100 / 255, 0 / 255);
    watch(() => colorMode.value, () => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "container",
        ref: container,
        class: "three-container"
      }, _attrs))} data-v-d7adaabb></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/anim/AnimShellsThree.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$5, [["__scopeId", "data-v-d7adaabb"]]), { __name: "AnimShellsThree" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ViewHeroAbout",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useFolioStore();
    const { $gsap } = useNuxtApp();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AnimShellsThree = __nuxt_component_0;
      const _component_CommonAbstract = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-3bb7d619><main class="hero-wrapper" data-v-3bb7d619>`);
      _push(ssrRenderComponent(_component_AnimShellsThree, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonAbstract, {
        class: "front-header",
        label: unref(store).data.about?.aboutHeroTitle,
        delay: 1,
        desc: "",
        "class-name": "about-intro",
        "is-hero": true,
        "is-full-width": false,
        "is-secondary": false,
        "is-page-header": false,
        author: "",
        date: "",
        "is-two-lines": false
      }, null, _parent));
      _push(`</main></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/view/ViewHeroAbout.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["__scopeId", "data-v-3bb7d619"]]), { __name: "ViewHeroAbout" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ViewParallaxAbout",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useFolioStore();
    const { $gsap } = useNuxtApp();
    useTemplateRef("parallaxWrapper");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonAbstract = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-wrapper" }, _attrs))} data-v-fe106a20><main class="about" data-v-fe106a20><div class="parallax__wrapper" data-v-fe106a20><span class="parallax__bg" data-v-fe106a20></span></div>`);
      _push(ssrRenderComponent(_component_CommonAbstract, {
        class: "about__label",
        label: unref(store).data.about?.aboutTitle,
        desc: unref(store).data.about?.aboutDesc,
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
      _push(`</main></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/view/ViewParallaxAbout.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-fe106a20"]]), { __name: "ViewParallaxAbout" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ViewTimelineAbout",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useFolioStore();
    useTemplateRef("timelineLine");
    const { $gsap } = useNuxtApp();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonAbstract = __nuxt_component_1$1;
      const _component_CommonInfoLabel = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "timeline-wrapper" }, _attrs))} data-v-28613c37>`);
      _push(ssrRenderComponent(_component_CommonAbstract, {
        label: "",
        desc: "Past",
        "class-name": "timeline-start",
        "is-page-header": false,
        delay: 0,
        "is-full-width": false,
        "is-hero": false,
        "is-secondary": false,
        author: "",
        date: "",
        "is-two-lines": false
      }, null, _parent));
      _push(`<main class="timeline" data-v-28613c37><div class="timeline__line" data-v-28613c37></div><div class="timeline__items" data-v-28613c37><!--[-->`);
      ssrRenderList(unref(store).data.about?.timelineItem, (item, index) => {
        _push(`<div class="timeline__item" data-v-28613c37><div class="timeline__item__content" data-v-28613c37><div class="timeline__item__header" data-v-28613c37><h4 class="timeline__item__heading" data-v-28613c37>${ssrInterpolate(item.heading)}</h4><div class="timeline__item__meta" data-v-28613c37><span class="timeline__item__company" data-v-28613c37>${ssrInterpolate(item.company)}</span><span class="timeline__item__period" data-v-28613c37>${ssrInterpolate(item.period)}</span></div></div><div class="timeline__item__desc" data-v-28613c37><p data-v-28613c37>${ssrInterpolate(item.description)}</p></div></div><div class="timeline__item__dot" data-v-28613c37></div></div>`);
      });
      _push(`<!--]--></div></main>`);
      _push(ssrRenderComponent(_component_CommonInfoLabel, {
        label: "Timeline",
        "class-name": "timeline-info",
        hpos: "center",
        "hover-label": "",
        "force-white": false,
        vpos: "flex-start",
        link: ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_CommonAbstract, {
        class: "timeline-end",
        label: "",
        desc: "Future",
        "is-page-header": false,
        "class-name": "timeline-end",
        delay: 0,
        "is-full-width": false,
        "is-hero": false,
        "is-secondary": false,
        author: "",
        date: "",
        "is-two-lines": false
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/view/ViewTimelineAbout.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-28613c37"]]), { __name: "ViewTimelineAbout" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ViewCodeSub",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useFolioStore();
    const { $gsap } = useNuxtApp();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLine = __nuxt_component_0$2;
      const _component_CommonAbstract = __nuxt_component_1$1;
      const _component_CommonInfoLabel = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "code-wrapper" }, _attrs))} data-v-bb2686df>`);
      _push(ssrRenderComponent(_component_CommonLine, {
        pos: "absolute",
        width: ""
      }, null, _parent));
      _push(`<main class="code" data-v-bb2686df>`);
      _push(ssrRenderComponent(_component_CommonAbstract, {
        class: "code__header",
        desc: "",
        label: unref(store).data.about?.codeTitle,
        "class-name": "code-intro",
        "is-secondary": true,
        delay: 0,
        "is-full-width": false,
        "is-hero": false,
        "is-page-header": false,
        author: "",
        date: "",
        "is-two-lines": false
      }, null, _parent));
      _push(ssrRenderComponent(_component_CommonInfoLabel, {
        label: "Values",
        "class-name": "photo-label",
        hpos: "center",
        "hover-label": "",
        "force-white": false,
        vpos: "flex-start",
        link: ""
      }, null, _parent));
      _push(`<section class="code__value" data-v-bb2686df><div class="code__value-block" data-v-bb2686df><h2 class="code__value-title split-code-w" data-v-bb2686df>${ssrInterpolate(unref(store).data.about?.codeOneTitle)}</h2><p class="code__value-desc split-code-w" data-v-bb2686df>${ssrInterpolate(unref(store).data.about?.codeOneDesc)}</p></div><div class="code__value-block" data-v-bb2686df><h2 class="code__value-title split-code-w" data-v-bb2686df>${ssrInterpolate(unref(store).data.about?.codeTwoTitle)}</h2><p class="code__value-desc split-code-w" data-v-bb2686df>${ssrInterpolate(unref(store).data.about?.codeTwoDesc)}</p></div><div class="code__value-block" data-v-bb2686df><h2 class="code__value-title split-code-w" data-v-bb2686df>${ssrInterpolate(unref(store).data.about?.codeThreeTitle)}</h2><p class="code__value-desc split-code-w" data-v-bb2686df>${ssrInterpolate(unref(store).data.about?.codeThreeDesc)}</p></div></section></main></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/view/ViewCodeSub.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-bb2686df"]]), { __name: "ViewCodeSub" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "About Thomas Thorstensson • Full-Stack Developer",
      meta: [
        { name: "description", content: "Learn about Thomas Thorstensson, a full-stack developer specializing in modern web technologies, creative coding, and innovative digital experiences." },
        { property: "og:title", content: "About Thomas Thorstensson" },
        { property: "og:description", content: "Full-stack developer specializing in modern web technologies, creative coding, and innovative digital experiences." },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "About Thomas Thorstensson" },
        { name: "twitter:description", content: "Full-stack developer specializing in modern web technologies, creative coding, and innovative digital experiences." }
      ]
    });
    useHead({
      link: [
        {
          rel: "canonical",
          href: "https://thomasthorstensson.com/about"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIMouseCursor = __nuxt_component_0$1;
      const _component_ViewHeroAbout = __nuxt_component_1;
      const _component_ViewParallaxAbout = __nuxt_component_2;
      const _component_ViewTimelineAbout = __nuxt_component_3;
      const _component_ViewCodeSub = __nuxt_component_4;
      const _component_ViewKnowledgeSub = __nuxt_component_5;
      const _component_ViewFooterSub = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-d5e806ae>`);
      _push(ssrRenderComponent(_component_UIMouseCursor, null, null, _parent));
      _push(`<div class="about-outer-wrapper" data-v-d5e806ae>`);
      _push(ssrRenderComponent(_component_ViewHeroAbout, null, null, _parent));
      _push(ssrRenderComponent(_component_ViewParallaxAbout, null, null, _parent));
      _push(ssrRenderComponent(_component_ViewTimelineAbout, null, null, _parent));
      _push(ssrRenderComponent(_component_ViewCodeSub, null, null, _parent));
      _push(ssrRenderComponent(_component_ViewKnowledgeSub, null, null, _parent));
      _push(ssrRenderComponent(_component_ViewFooterSub, {
        label: "Photography",
        link: "https://thomasthorstensson.photography",
        target: "_blank",
        "link-label": "Explore!"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d5e806ae"]]);

export { about as default };
//# sourceMappingURL=about-CnOH7hIZ.mjs.map
