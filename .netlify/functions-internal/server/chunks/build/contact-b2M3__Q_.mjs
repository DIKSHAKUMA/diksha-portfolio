import { _ as __nuxt_component_0$1, a as __nuxt_component_1$2 } from './CommonAbstract-B-MDeIzL.mjs';
import { defineComponent, ref, mergeProps, unref, useTemplateRef, withAsyncContext, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, t as useNavbarStore, o as useFolioStore, e as useNuxtApp, s as useFetch } from './server.mjs';
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
  __name: "AnimPixiMoon",
  __ssrInlineRender: true,
  emits: ["loaded"],
  setup(__props, { emit: __emit }) {
    useTemplateRef("pixi");
    const { $gsap } = useNuxtApp();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "canvas-wrapper" }, _attrs))} data-v-9b10dd11><canvas data-v-9b10dd11></canvas></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/anim/AnimPixiMoon.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-9b10dd11"]]), { __name: "AnimPixiMoon" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "UIWeatherInfo",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    ref(null);
    const localTime = ref("");
    const {
      data: weatherData,
      pending: weatherPending,
      error: weatherError
    } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/weather",
      {
        server: false,
        lazy: true
        // Don't block navigation
      },
      "$ZNbArM7hG4"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(weatherData) && !unref(weatherPending)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "weather-info" }, _attrs))} data-v-6c33ec96><div class="weather-info__item weather-info__location-info" data-v-6c33ec96><svg class="weather-info__location-info__icon" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-6c33ec96><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" data-v-6c33ec96></path></svg><span class="weather-info__location-info__text" data-v-6c33ec96>Barcelona</span></div><div class="weather-info__item" data-v-6c33ec96>CET: ${ssrInterpolate(unref(localTime))}</div><div class="weather-info__item" data-v-6c33ec96>T: ${ssrInterpolate(unref(weatherData).temperature)}°C</div><div class="weather-info__item" data-v-6c33ec96> RH: ${ssrInterpolate(unref(weatherData).humidity)}% </div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/UIWeatherInfo.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-6c33ec96"]]), { __name: "UIWeatherInfo" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ViewHeroContact",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useFolioStore();
    const { $gsap } = useNuxtApp();
    ref(null);
    const showAnimPixi = ref(false);
    const onPixiLoaded = () => {
      showAnimPixi.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AnimPixiMoon = __nuxt_component_0;
      const _component_UIWeatherInfo = __nuxt_component_1$1;
      const _component_CommonAbstract = __nuxt_component_1$2;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "hero-wrapper" }, _attrs))} data-v-55cb5fb7>`);
      _push(ssrRenderComponent(_component_AnimPixiMoon, {
        ref: "aniPixiRef",
        class: { "fade-in": unref(showAnimPixi) },
        onLoaded: onPixiLoaded
      }, null, _parent));
      _push(ssrRenderComponent(_component_UIWeatherInfo, null, null, _parent));
      _push(`<div class="contact" data-v-55cb5fb7><div class="contact__label split-label-w" data-v-55cb5fb7>${ssrInterpolate(unref(store).data.contact?.emailTitle)}</div><a class="contact__email action split-label-w" data-name="menu" data-text="Tell me!"${ssrRenderAttr("href", `mailto:${unref(store).data.contact?.email}`)} data-v-55cb5fb7>${ssrInterpolate(unref(store).data.contact?.email)}</a></div>`);
      _push(ssrRenderComponent(_component_CommonAbstract, {
        class: "front-header",
        label: unref(store).data.contact?.viewHeroTitle,
        delay: 1,
        "is-page-header": false,
        desc: "",
        "class-name": "contact-intro",
        "is-hero": true,
        "is-full-width": false,
        "is-secondary": false,
        author: "",
        date: "",
        "is-two-lines": false
      }, null, _parent));
      _push(`</main>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/view/ViewHeroContact.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-55cb5fb7"]]), { __name: "ViewHeroContact" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    useNavbarStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIMouseCursor = __nuxt_component_0$1;
      const _component_ViewHeroContact = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-76d541a2>`);
      _push(ssrRenderComponent(_component_UIMouseCursor, null, null, _parent));
      _push(`<div class="contact-wrapper" data-v-76d541a2>`);
      _push(ssrRenderComponent(_component_ViewHeroContact, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contact = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-76d541a2"]]);

export { contact as default };
//# sourceMappingURL=contact-b2M3__Q_.mjs.map
