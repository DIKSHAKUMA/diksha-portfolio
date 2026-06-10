import { _ as __nuxt_component_0 } from './CommonLine-ChyYD9mX.mjs';
import { a as __nuxt_component_1 } from './CommonAbstract-B-MDeIzL.mjs';
import { _ as __nuxt_component_2 } from './CommonInfoLabel-CccTLGOM.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ViewAwardsHome",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useFolioStore();
    const { $gsap } = useNuxtApp();
    const colorMode = useColorMode();
    const awards = computed(() => store.data.awards[0] || {});
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLine = __nuxt_component_0;
      const _component_CommonAbstract = __nuxt_component_1;
      const _component_CommonInfoLabel = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "award-wrapper" }, _attrs))} data-v-52333543>`);
      _push(ssrRenderComponent(_component_CommonLine, {
        pos: "absolute",
        width: ""
      }, null, _parent));
      _push(`<main data-v-52333543>`);
      _push(ssrRenderComponent(_component_CommonAbstract, {
        class: "code__header",
        label: unref(awards).awardTitle,
        desc: unref(awards).awardDesc,
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
        label: "FOLIO RECOGNITION",
        "class-name": "photo-label",
        hpos: "center",
        "hover-label": "",
        "force-white": false,
        vpos: "flex-start",
        link: ""
      }, null, _parent));
      _push(`<section class="award-section" data-v-52333543>`);
      if (unref(awards).awardSvg && unref(awards).awardSvg.length) {
        _push(`<div class="marquee-container" data-v-52333543><div class="marquee" data-v-52333543><div class="${ssrRenderClass([
          unref(colorMode).value === "light" ? "marquee__content--light" : "",
          "marquee__content"
        ])}" data-v-52333543><!--[-->`);
        ssrRenderList(unref(awards).awardSvg, (svg, index) => {
          _push(`<div class="award-cell action" data-name="proj" data-text="View" data-v-52333543>`);
          if (unref(awards).awardLinks?.logos?.[index]) {
            _push(`<a${ssrRenderAttr("href", unref(awards).awardLinks.logos[index].url)} target="_blank" rel="noopener" class="award-link" data-v-52333543><img${ssrRenderAttr("src", svg.url)} class="award-svg"${ssrRenderAttr("alt", svg.fileName)} data-v-52333543></a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(unref(awards).awardSvg, (svg, index) => {
          _push(`<div class="award-cell action" data-name="proj" data-text="View" data-v-52333543>`);
          if (unref(awards).awardLinks?.logos?.[index]) {
            _push(`<a${ssrRenderAttr("href", unref(awards).awardLinks.logos[index].url)} target="_blank" rel="noopener" class="award-link" data-v-52333543><img${ssrRenderAttr("src", svg.url)} class="award-svg"${ssrRenderAttr("alt", svg.fileName)} data-v-52333543></a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/view/ViewAwardsHome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ViewAwardsHome = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-52333543"]]), { __name: "ViewAwardsHome" });

export { ViewAwardsHome as default };
//# sourceMappingURL=ViewAwardsHome-CMPpzMf0.mjs.map
