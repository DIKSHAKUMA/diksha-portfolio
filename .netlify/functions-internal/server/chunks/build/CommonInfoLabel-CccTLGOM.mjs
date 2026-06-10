import { _ as _export_sfc, e as useNuxtApp, b as __nuxt_component_3$2 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CommonInfoLabel",
  __ssrInlineRender: true,
  props: {
    label: { default: "" },
    hoverLabel: { default: "" },
    className: { default: "" },
    hpos: { default: "flex-start" },
    vpos: { default: "flex-start" },
    link: { default: "" },
    forceWhite: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { $gsap } = useNuxtApp();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_3$2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["info-label-wrapper", { "info-label-wrapper--white": __props.forceWhite }],
        style: { "justify-content": props.hpos, "align-items": props.vpos }
      }, _attrs))} data-v-01839cf1><header class="${ssrRenderClass([__props.className, "info-label-header"])}" data-v-01839cf1>`);
      if (!__props.link) {
        _push(`<div data-v-01839cf1>${ssrInterpolate(__props.label)}</div>`);
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: __props.link,
          class: "action",
          "data-name": "yo",
          "data-text": props.hoverLabel,
          target: "_blank"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.label), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</header></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonInfoLabel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-01839cf1"]]), { __name: "CommonInfoLabel" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=CommonInfoLabel-CccTLGOM.mjs.map
