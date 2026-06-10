import { _ as _export_sfc, b as __nuxt_component_3$2 } from './server.mjs';
import { _ as __nuxt_component_2 } from './CommonInfoLabel-CccTLGOM.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "ViewFooterSub",
  __ssrInlineRender: true,
  props: {
    label: { default: "" },
    link: { default: "" },
    linkLabel: { default: "" },
    target: { default: "_self" }
  },
  setup(__props) {
    const archiveWrapper = ref();
    const isMobile = ref(false);
    const props = __props;
    const footerMessage = computed(() => {
      return isMobile.value ? "2026 Thomas Thorstensson" : "2026 Thomas Thorstensson • Fork on GitHub";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_3$2;
      const _component_CommonInfoLabel = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "archive-wrapper",
        ref_key: "archiveWrapper",
        ref: archiveWrapper
      }, _attrs))} data-v-3eefd3b8><footer class="archive" data-v-3eefd3b8><div class="archive__label action magnet" data-name="proj"${ssrRenderAttr("data-text", props.linkLabel)} data-color="#FFF" data-v-3eefd3b8>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: props.link,
        target: props.target
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(props.label)}`);
          } else {
            return [
              createTextVNode(toDisplayString(props.label), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></footer>`);
      _push(ssrRenderComponent(_component_CommonInfoLabel, {
        label: unref(footerMessage),
        "class-name": "photo-label",
        hpos: "flex-end",
        vpos: "flex-end",
        link: "https://github.com/thorstensson",
        "force-white": false,
        "hover-label": "Moi"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/view/ViewFooterSub.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-3eefd3b8"]]), { __name: "ViewFooterSub" });

export { __nuxt_component_6 as default };
//# sourceMappingURL=ViewFooterSub-hJ8-aNRX.mjs.map
