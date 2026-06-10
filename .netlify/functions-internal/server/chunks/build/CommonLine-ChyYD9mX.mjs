import { defineComponent, useTemplateRef, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc, e as useNuxtApp } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CommonLine",
  __ssrInlineRender: true,
  props: {
    pos: { default: "absolute" },
    width: { default: "80%" }
  },
  setup(__props) {
    const metaLine = useTemplateRef("metaLine");
    const { $gsap } = useNuxtApp();
    const props = __props;
    const resolvedWidth = computed(
      () => props.width && props.width.trim().length ? props.width : "80%"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "line",
        ref_key: "metaLine",
        ref: metaLine,
        style: { position: props.pos, width: unref(resolvedWidth) }
      }, _attrs))} data-v-6b7cda35></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonLine.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-6b7cda35"]]), { __name: "CommonLine" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=CommonLine-ChyYD9mX.mjs.map
