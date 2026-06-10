import { _ as _export_sfc, k as useRouter, l as __nuxt_component_3$1 } from './server.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UIBackButton",
  __ssrInlineRender: true,
  props: {
    to: { default: "" }
  },
  setup(__props) {
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_3$1;
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: "back-button",
        "aria-label": "Back"
      }, _attrs))} data-v-18233ccb>`);
      _push(ssrRenderComponent(_component_Icon, {
        class: "back-button__icon action",
        name: "weui:previous2-filled",
        size: "48"
      }, null, _parent));
      _push(`</button>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/UIBackButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-18233ccb"]]), { __name: "UIBackButton" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=UIBackButton-CZSfQtzE.mjs.map
