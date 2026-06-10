import { defineComponent, useTemplateRef, ref, computed, watch, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import ChevronSVG from './chevron-right-Db8GHSH0.mjs';
import UPArrowSVG from './up-arrow-1M6ebW3K.mjs';
import { _ as _export_sfc, e as useNuxtApp } from './server.mjs';

const xpos = ref();
const ypos = ref();
function useMousePos() {
  return { xpos, ypos };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "UIMouseCursor",
  __ssrInlineRender: true,
  setup(__props) {
    const { xpos: xpos2, ypos: ypos2 } = useMousePos();
    const { $gsap } = useNuxtApp();
    const shape = useTemplateRef("shape");
    const dataName = ref("");
    const dataText = ref("");
    const isOver = ref(false);
    const dispStr = ref("");
    const firstRun = ref(true);
    const showCursor = ref(true);
    const loopStarted = ref(false);
    const pos = { x: 0, y: 0 };
    const vel = { x: 0, y: 0 };
    const classObject = computed(() => ({
      cursor__shape: dataName.value === "yo" || dataName.value === "menu" || dataName.value === "proj" || dataName.value === "reel" || dataName.value === "",
      "cursor__shape--proj": isOver.value && (dataName.value === "proj" || dataName.value === "reel"),
      "cursor__shape--menu": isOver.value && dataName.value === "menu",
      "cursor__shape--reel": isOver.value && dataName.value === "reel",
      "cursor__shape--yo": isOver.value && dataName.value === "yo"
    }));
    const setFromEvent = () => {
      let x = xpos2.value;
      let y = ypos2.value;
      $gsap.to(pos, {
        x,
        y,
        ease: "power4.out",
        duration: 0.2,
        onUpdate: () => {
          vel.x = x - pos.x;
          vel.y = y - pos.y;
        }
      });
      if (!loopStarted.value) {
        $gsap.ticker.add(loop);
      }
    };
    const loop = () => {
      let scale = getScale(vel.x, vel.y);
      if (shape.value) {
        const rect = shape.value.getBoundingClientRect();
        $gsap.set(shape.value, {
          x: Math.round(pos.x - rect.width / 2),
          y: Math.round(pos.y - rect.height / 2),
          scaleX: 1 + scale,
          scaleY: 1 - scale,
          force3D: true
        });
      }
    };
    const getScale = (diffX, diffY) => {
      const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
      return Math.min(distance / 50, 0.2);
    };
    watch(
      () => [xpos2.value, ypos2.value],
      ([newXpos, newYpos], [prevXpos, prevYpos]) => {
        setFromEvent();
        if (firstRun.value) {
          $gsap.set(".cursor", { autoAlpha: 1 });
        }
        firstRun.value = false;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(showCursor)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "cursor",
          style: { display: unref(dispStr) }
        }, _attrs))} data-v-7f4b0f23><div class="${ssrRenderClass(unref(classObject))}" data-v-7f4b0f23>`);
        if (unref(dataName) === "proj") {
          _push(`<div class="cursor__shape__text" data-v-7f4b0f23>`);
          if (unref(dataText) === "Prev") {
            _push(ssrRenderComponent(unref(ChevronSVG), { class: "arrow arrow--reverse arrow--before" }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(` ${ssrInterpolate(unref(dataText))} `);
          if (unref(dataText) === "Next") {
            _push(ssrRenderComponent(unref(ChevronSVG), { class: "arrow" }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          if (unref(dataText) === "View" || unref(dataText) === "Lens") {
            _push(ssrRenderComponent(unref(UPArrowSVG), { class: "up-arrow" }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(dataName) === "menu") {
          _push(`<div class="cursor__shape__text" data-v-7f4b0f23>${ssrInterpolate(unref(dataText))}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(dataName) === "reel") {
          _push(`<div class="cursor__shape__text" data-v-7f4b0f23>`);
          _push(ssrRenderComponent(unref(ChevronSVG), { class: "arrow arrow--before arrow--reverse" }, null, _parent));
          _push(`${ssrInterpolate(unref(dataText))} `);
          _push(ssrRenderComponent(unref(ChevronSVG), { class: "arrow" }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(dataName) === "yo") {
          _push(`<div class="cursor__shape__text" data-v-7f4b0f23>${ssrInterpolate(unref(dataText))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="media" data-v-7f4b0f23></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/UIMouseCursor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-7f4b0f23"]]), { __name: "UIMouseCursor" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CommonAbstract",
  __ssrInlineRender: true,
  props: {
    label: { default: "" },
    desc: { default: "" },
    className: { default: "" },
    delay: { default: 0 },
    isFullWidth: { type: Boolean, default: false },
    isHero: { type: Boolean, default: false },
    isSecondary: { type: Boolean, default: false },
    isTwoLines: { type: Boolean, default: false },
    isPageHeader: { type: Boolean, default: false },
    author: { default: "" },
    date: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const { $gsap } = useNuxtApp();
    const abstractClassObj = computed(() => {
      return {
        "abstract-wrapper--hero--with-desc": props.isHero && props.desc && props.desc.trim(),
        "abstract-wrapper--hero": props.isHero,
        "abstract-wrapper--secondary": props.isSecondary,
        "abstract-wrapper--full-width": props.isFullWidth
      };
    });
    const headerClassObj = computed(() => {
      return {
        "abstract__header--hero": props.isHero && props.desc.trim().length > 0,
        "abstract__header--hero-solo": props.isHero && props.desc.trim().length == 0,
        "abstract__header--secondary": props.isSecondary,
        "abstract__header--full-width": props.isFullWidth,
        "abstract__header--page-header": props.isPageHeader
      };
    });
    const descriptionSentences = computed(() => {
      if (!props.desc || !props.desc.trim()) return [];
      const sentences = props.desc.split(".").filter((sentence) => sentence.trim());
      return sentences.map((sentence, index) => {
        const trimmedSentence = sentence.trim();
        return index === sentences.length - 1 ? trimmedSentence + "." : trimmedSentence + ". ";
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["abstract-wrapper", unref(abstractClassObj)]
      }, _attrs))} data-v-93d6b733><div class="abstract" data-v-93d6b733>`);
      if (__props.label && __props.label.trim()) {
        _push(`<header class="${ssrRenderClass([[props.className, unref(headerClassObj)], "abstract__header"])}" data-v-93d6b733><span data-v-93d6b733>${ssrInterpolate(__props.label)}</span></header>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.desc && __props.desc.trim()) {
        _push(`<div data-v-93d6b733><!--[-->`);
        ssrRenderList(unref(descriptionSentences), (sentence, index) => {
          _push(`<div class="${ssrRenderClass([props.className, "abstract__desc"])}" style="${ssrRenderStyle({ display: props.isTwoLines ? "block" : "inline" })}" data-v-93d6b733>${ssrInterpolate(sentence)}</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="abstract__info" data-v-93d6b733>`);
      if (__props.author && __props.author.trim()) {
        _push(`<div data-v-93d6b733><div class="${ssrRenderClass([props.className, "abstract__author"])}" data-v-93d6b733> by: ${ssrInterpolate(__props.author)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.date && __props.date.trim()) {
        _push(`<div data-v-93d6b733><div class="${ssrRenderClass([props.className, "abstract__date"])}" data-v-93d6b733> on: ${ssrInterpolate(__props.date)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonAbstract.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-93d6b733"]]), { __name: "CommonAbstract" });

export { __nuxt_component_0 as _, __nuxt_component_1 as a };
//# sourceMappingURL=CommonAbstract-B-MDeIzL.mjs.map
