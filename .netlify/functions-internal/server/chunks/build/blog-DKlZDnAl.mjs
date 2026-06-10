import { _ as __nuxt_component_0$1, a as __nuxt_component_1$1 } from './CommonAbstract-B-MDeIzL.mjs';
import { defineComponent, computed, mergeProps, unref, ref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, shallowRef, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import * as THREE from 'three';
import { _ as _export_sfc, o as useFolioStore, d as useBlogStore, b as __nuxt_component_3$2, r as useColorMode } from './server.mjs';
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
  __name: "AnimThreeWords",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMode = useColorMode();
    const silverWarm1 = new THREE.Color(0.94, 0.92, 0.9);
    const silverWarm2 = new THREE.Color(0.98, 0.96, 0.94);
    const silverCool1 = new THREE.Color(0.9, 0.92, 0.96);
    const silverCool2 = new THREE.Color(0.96, 0.98, 1);
    const greenLight1 = new THREE.Color(24 / 255, 24 / 255, 27 / 255);
    const greenLight2 = new THREE.Color(32 / 255, 32 / 255, 35 / 255);
    const greenDark1 = new THREE.Color(16 / 255, 16 / 255, 19 / 255);
    const greenDark2 = new THREE.Color(8 / 255, 8 / 255, 11 / 255);
    shallowRef(null);
    shallowRef(null);
    const scene = shallowRef(null);
    shallowRef(null);
    shallowRef(0);
    shallowRef(true);
    let wordSprites = [];
    let wordMaterials = [];
    const selectedWords = ref([]);
    const getCurrentColor = (index, distance) => {
      const isLight = colorMode.value === "light";
      const warm1 = isLight ? greenLight1 : silverWarm1;
      const warm2 = isLight ? greenLight2 : silverWarm2;
      const cool1 = isLight ? greenDark1 : silverCool1;
      const cool2 = isLight ? greenDark2 : silverCool2;
      const t = Math.min(distance / 8, 1);
      const useWarm = index % 2 === 0;
      const mixedColor = useWarm ? warm1.clone().lerp(warm2, t) : cool1.clone().lerp(cool2, t);
      return `rgb(${Math.floor(mixedColor.r * 255)}, ${Math.floor(mixedColor.g * 255)}, ${Math.floor(mixedColor.b * 255)})`;
    };
    const createTextTexture = (text, color) => {
      const canvas = (void 0).createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Could not get canvas context");
      const baseSize = 48;
      const lengthFactor = Math.max(0.8, 1.5 - text.length * 0.03);
      const fontSize = Math.floor(baseSize * lengthFactor);
      context.font = `${fontSize}px 'Switzer', -apple-system, BlinkMacSystemFont, sans-serif`;
      const metrics = context.measureText(text);
      const padding = 60;
      canvas.width = Math.ceil(metrics.width * 3) + padding * 2;
      canvas.height = Math.ceil(fontSize * 2) + padding * 2;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.font = `${fontSize}px 'Switzer', -apple-system, BlinkMacSystemFont, sans-serif`;
      context.fillStyle = color;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(text, canvas.width / 2, canvas.height / 2);
      return new THREE.CanvasTexture(canvas);
    };
    watch(
      () => colorMode.value,
      () => {
        if (!scene.value || wordSprites.length === 0) return;
        wordSprites.forEach((sprite, i) => {
          const position = sprite.position;
          const distance = Math.sqrt(
            position.x * position.x + position.y * position.y + position.z * position.z
          );
          const color = getCurrentColor(i, distance);
          const word = selectedWords.value[i];
          if (word && wordMaterials[i]) {
            const newTexture = createTextTexture(word, color);
            newTexture.needsUpdate = true;
            wordMaterials[i].map = newTexture;
            wordMaterials[i].needsUpdate = true;
          }
        });
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "words-container" }, _attrs))} data-v-985d0bc5><canvas class="words-canvas" data-v-985d0bc5></canvas></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/anim/AnimThreeWords.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-985d0bc5"]]), { __name: "AnimThreeWords" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ViewHeroBlog",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useFolioStore();
    computed(
      () => store.data.intro?.blogTitle || ""
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AnimThreeWords = __nuxt_component_0;
      const _component_CommonAbstract = __nuxt_component_1$1;
      _push(`<main${ssrRenderAttrs(mergeProps({
        ref: "main",
        class: "hero-wrapper"
      }, _attrs))} data-v-d7e0409e>`);
      _push(ssrRenderComponent(_component_AnimThreeWords, null, null, _parent));
      _push(ssrRenderComponent(_component_CommonAbstract, {
        class: "front-header",
        label: unref(store).data.intro?.blogTitle,
        desc: "",
        "is-page-header": false,
        delay: 0,
        "class-name": "blog-intro",
        "is-hero": true,
        "is-full-width": false,
        "is-secondary": false,
        author: "",
        date: "",
        "is-page-title": false,
        "is-two-lines": false
      }, null, _parent));
      _push(`</main>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/view/ViewHeroBlog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-d7e0409e"]]), { __name: "ViewHeroBlog" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ViewBlogExcerpts",
  __ssrInlineRender: true,
  setup(__props) {
    const blogStore = useBlogStore();
    const store = useFolioStore();
    const isDesktop = ref(false);
    const dateSorted = computed(() => {
      if (!blogStore.data?.posts) return [];
      return [...blogStore.data.posts].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonAbstract = __nuxt_component_1$1;
      const _component_NuxtLink = __nuxt_component_3$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "excerpts-wrapper" }, _attrs))} data-v-62dabe8f><div class="excerpts-wrapper__inner" data-v-62dabe8f>`);
      _push(ssrRenderComponent(_component_CommonAbstract, {
        class: "blog__header",
        label: unref(store).data.intro?.blogDesc,
        desc: "",
        "class-name": "blog-intro",
        "is-secondary": true,
        delay: 0,
        "is-full-width": false,
        "is-hero": false,
        "is-page-header": false,
        author: "",
        date: "",
        "is-page-title": false,
        "is-two-lines": false
      }, null, _parent));
      _push(`<main class="excerpts" data-v-62dabe8f><!--[-->`);
      ssrRenderList(unref(dateSorted), (post) => {
        _push(`<div class="excerpts__info" data-v-62dabe8f>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/blog-post/${post.slug}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="excerpts__item action" data-name="menu" data-v-62dabe8f${_scopeId}><div class="excerpts__item__title" data-v-62dabe8f${_scopeId}>${ssrInterpolate(post.date)}</div><div class="excerpts__item__title" data-v-62dabe8f${_scopeId}>${ssrInterpolate(post.title)}</div>`);
              if (unref(isDesktop)) {
                _push2(`<div class="excerpts__item__title excerpts__item__title-subject" data-v-62dabe8f${_scopeId}>${ssrInterpolate(post.subject)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="excerpts__item__title" data-v-62dabe8f${_scopeId}>${ssrInterpolate(post.length)}</div></div>`);
            } else {
              return [
                createVNode("div", {
                  class: "excerpts__item action",
                  "data-name": "menu"
                }, [
                  createVNode("div", { class: "excerpts__item__title" }, toDisplayString(post.date), 1),
                  createVNode("div", { class: "excerpts__item__title" }, toDisplayString(post.title), 1),
                  unref(isDesktop) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "excerpts__item__title excerpts__item__title-subject"
                  }, toDisplayString(post.subject), 1)) : createCommentVNode("", true),
                  createVNode("div", { class: "excerpts__item__title" }, toDisplayString(post.length), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--><div class="excerpts__quote" data-v-62dabe8f><q data-v-62dabe8f>${ssrInterpolate(unref(store).data.intro?.blogExcerptsQuote.split("—")[0])}</q><span data-v-62dabe8f>—</span> ${ssrInterpolate(unref(store).data.intro?.blogExcerptsQuote.split("—")[1])}</div></main></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/view/ViewBlogExcerpts.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-62dabe8f"]]), { __name: "ViewBlogExcerpts" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "blog",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIMouseCursor = __nuxt_component_0$1;
      const _component_ViewHeroBlog = __nuxt_component_1;
      const _component_ViewBlogExcerpts = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-0d4d35bb>`);
      _push(ssrRenderComponent(_component_UIMouseCursor, null, null, _parent));
      _push(`<div class="blog-outer-wrapper" data-v-0d4d35bb>`);
      _push(ssrRenderComponent(_component_ViewHeroBlog, null, null, _parent));
      _push(ssrRenderComponent(_component_ViewBlogExcerpts, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const blog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0d4d35bb"]]);

export { blog as default };
//# sourceMappingURL=blog-DKlZDnAl.mjs.map
