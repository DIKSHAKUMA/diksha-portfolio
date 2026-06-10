import { _ as _export_sfc, e as useNuxtApp, b as __nuxt_component_3$2 } from './server.mjs';
import { _ as __nuxt_component_2 } from './NuxtImg-WBgrsq8O.mjs';
import { defineComponent, computed, useTemplateRef, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { ExtensionType, Texture } from 'pixi.js';
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

function useHygraphParser() {
  const hygraphLDR = {
    extension: ExtensionType.LoadParser,
    name: "hygraphLDR",
    test: (url) => url.startsWith("https://eu-west-2.graphassets.com"),
    async load(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const canvas = (void 0).createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          resolve(Texture.from(canvas));
        };
        img.onerror = reject;
        img.src = src;
      });
    }
  };
  return { hygraphLDR };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UIProjectStepper",
  __ssrInlineRender: true,
  props: {
    prevImg: { default: "" },
    nextImg: { default: "" },
    prev: { default: "" },
    next: { default: "" },
    prevName: { default: "" },
    nextName: { default: "" },
    prevSynop: { default: () => [] },
    nextSynop: { default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const { $gsap } = useNuxtApp();
    useHygraphParser();
    const prevPath = computed(() => `/project/${props.prev}`);
    const nextPath = computed(() => `/project/${props.next}`);
    const prevCanvas = useTemplateRef("prevCanvas");
    const nextCanvas = useTemplateRef("nextCanvas");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_3$2;
      const _component_NuxtImg = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "project-stepper-wrapper" }, _attrs))} data-v-d98b2560><h1 data-v-d98b2560>Explore Archive</h1><main class="project-stepper" data-v-d98b2560><div class="project-stepper__prev" data-v-d98b2560><div class="project-stepper-image-reveal" data-v-d98b2560>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(prevPath),
        class: "action",
        "data-name": "proj",
        "data-text": "Prev"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: __props.prevImg,
              provider: "hygraph",
              alt: "Project image",
              format: "png",
              sizes: "sm:100vw md:40vw lg:35vw xl:80vw",
              densities: "x1 x2"
            }, null, _parent2, _scopeId));
            _push2(`<canvas class="prev-pixi-canvas pixi-overlay" data-v-d98b2560${_scopeId}></canvas>`);
          } else {
            return [
              createVNode(_component_NuxtImg, {
                src: __props.prevImg,
                provider: "hygraph",
                alt: "Project image",
                format: "png",
                sizes: "sm:100vw md:40vw lg:35vw xl:80vw",
                densities: "x1 x2"
              }, null, 8, ["src"]),
              createVNode("canvas", {
                ref_key: "prevCanvas",
                ref: prevCanvas,
                class: "prev-pixi-canvas pixi-overlay"
              }, null, 512)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><h3 class="project-stepper__name" data-v-d98b2560>${ssrInterpolate(__props.prevName)}</h3><p class="project-stepper__synop" data-v-d98b2560>${ssrInterpolate(__props.prevSynop[0])}</p></div><div class="project-stepper__next" data-v-d98b2560><div class="project-stepper-image-reveal" data-v-d98b2560>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(nextPath),
        class: "action",
        "data-name": "proj",
        "data-text": "Next"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: __props.nextImg,
              provider: "hygraph",
              alt: "Project image",
              format: "png",
              sizes: "sm:100vw md:40vw lg:35vw xl:80vw",
              densities: "x1 x2"
            }, null, _parent2, _scopeId));
            _push2(`<canvas class="next-pixi-canvas pixi-overlay" data-v-d98b2560${_scopeId}></canvas>`);
          } else {
            return [
              createVNode(_component_NuxtImg, {
                src: __props.nextImg,
                provider: "hygraph",
                alt: "Project image",
                format: "png",
                sizes: "sm:100vw md:40vw lg:35vw xl:80vw",
                densities: "x1 x2"
              }, null, 8, ["src"]),
              createVNode("canvas", {
                ref_key: "nextCanvas",
                ref: nextCanvas,
                class: "next-pixi-canvas pixi-overlay"
              }, null, 512)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><h4 class="project-stepper__name" data-v-d98b2560>${ssrInterpolate(__props.nextName)}</h4><p class="project-stepper__synop" data-v-d98b2560>${ssrInterpolate(__props.nextSynop[0])}</p></div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/UIProjectStepper.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const UIProjectStepper = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-d98b2560"]]), { __name: "UIProjectStepper" });

export { UIProjectStepper as default };
//# sourceMappingURL=UIProjectStepper-C-MZSjo0.mjs.map
