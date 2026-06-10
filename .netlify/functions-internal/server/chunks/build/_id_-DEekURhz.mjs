import { _ as __nuxt_component_0, a as __nuxt_component_1$1 } from './CommonAbstract-B-MDeIzL.mjs';
import { _ as __nuxt_component_1 } from './UIBackButton-CZSfQtzE.mjs';
import { _ as _export_sfc, o as useFolioStore, u as useRoute, a as useHead, f as useSchemaOrg, q as defineWebPage, j as defineBreadcrumb, g as __nuxt_component_3$3 } from './server.mjs';
import { _ as __nuxt_component_2 } from './NuxtImg-WBgrsq8O.mjs';
import { defineComponent, useTemplateRef, computed, unref, withCtx, createVNode, defineAsyncComponent, mergeProps, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1 } from './CommonLine-ChyYD9mX.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CommonTestimonial",
  __ssrInlineRender: true,
  props: {
    name: { default: "" },
    agency: { default: "" },
    text: { default: "" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "testimonial-wrapper" }, _attrs))} data-v-fd48ef0d><blockquote class="testimonial testimonial-fade" data-v-fd48ef0d><div data-v-fd48ef0d>${ssrInterpolate(__props.text)}</div><div class="testimonial__cite" data-v-fd48ef0d><cite data-v-fd48ef0d>${ssrInterpolate(__props.name)} - </cite><cite data-v-fd48ef0d>${ssrInterpolate(__props.agency)}</cite></div></blockquote></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/CommonTestimonial.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-fd48ef0d"]]), { __name: "CommonTestimonial" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ViewClientHistory",
  __ssrInlineRender: true,
  props: {
    clientName: { default: "" },
    history: { default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const isExpanded = ref(false);
    useTemplateRef("historySection");
    const parseDate = (dateStr) => {
      try {
        const [month, year] = dateStr.split(" ");
        const monthIndex = (/* @__PURE__ */ new Date(`${month} 1, ${year}`)).getMonth();
        return new Date(parseInt(year), monthIndex);
      } catch {
        return /* @__PURE__ */ new Date(0);
      }
    };
    const sortedHistory = computed(() => {
      return [...props.history].sort((a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    });
    const visibleHistory = computed(() => {
      return isExpanded.value ? sortedHistory.value : sortedHistory.value.slice(0, 2);
    });
    const hasMoreItems = computed(() => {
      return props.history.length > 2;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.history && __props.history.length > 0) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "client-history" }, _attrs))} data-v-3122b98a><div class="client-history__header" data-v-3122b98a><h5 data-v-3122b98a>More work with ${ssrInterpolate(__props.clientName)}</h5><p class="client-history__subtitle" data-v-3122b98a>${ssrInterpolate(__props.history.length)} project${ssrInterpolate(__props.history.length > 1 ? "s" : "")} completed </p></div><div class="client-history__content" data-v-3122b98a><div class="client-history__timeline" data-v-3122b98a><!--[-->`);
        ssrRenderList(unref(visibleHistory), (item, index) => {
          _push(`<div class="client-history__item" data-v-3122b98a><div class="client-history__item-dot" data-v-3122b98a></div><div class="client-history__item-content" data-v-3122b98a><div class="client-history__item-header" data-v-3122b98a><h6 class="client-history__project-name" data-v-3122b98a>${ssrInterpolate(item.projectName)}</h6><span class="client-history__date" data-v-3122b98a>${ssrInterpolate(item.date)}</span></div><div class="client-history__item-meta" data-v-3122b98a><span class="client-history__type" data-v-3122b98a>${ssrInterpolate(item.type)}</span><span class="client-history__duration" data-v-3122b98a>${ssrInterpolate(item.duration)}</span></div></div></div>`);
        });
        _push(`<!--]--></div>`);
        if (unref(hasMoreItems)) {
          _push(`<button class="client-history__toggle" data-v-3122b98a>${ssrInterpolate(unref(isExpanded) ? "Show less" : `Show ${__props.history.length - 2} more`)} <svg class="${ssrRenderClass([{ "client-history__toggle-icon--expanded": unref(isExpanded) }, "client-history__toggle-icon"])}" width="16" height="16" viewBox="0 0 24 24" fill="none" data-v-3122b98a><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-3122b98a></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/view/ViewClientHistory.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-3122b98a"]]), { __name: "ViewClientHistory" });
const __nuxt_component_8_lazy = defineAsyncComponent(() => import('./UIProjectStepper-C-MZSjo0.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useFolioStore();
    const route = useRoute();
    useTemplateRef("infoSection");
    useTemplateRef("textSection");
    useTemplateRef("muxPlayer");
    useTemplateRef("muxPlayer2");
    const middleIndex = computed(() => {
      const totalImages = proj.value?.image?.length || 0;
      return totalImages - 3;
    });
    const proj = computed(() => {
      return store.data.projects.find(
        (proj2) => proj2.slug === route.params.id
      );
    });
    useHead({
      title: () => proj.value ? `${proj.value.name} • Thomas Thorstensson` : "Project",
      meta: [
        { name: "description", content: () => proj.value?.description || `${proj.value?.name} - A project by Thomas Thorstensson` },
        { property: "og:title", content: () => proj.value?.name },
        { property: "og:description", content: () => proj.value?.description },
        { property: "og:image", content: () => proj.value?.coverImage?.handle },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: () => proj.value?.name },
        { name: "twitter:description", content: () => proj.value?.description },
        { name: "twitter:image", content: () => proj.value?.coverImage?.handle },
        { name: "keywords", content: () => proj.value?.tags?.join(", ") }
      ]
    });
    useHead({
      link: [
        {
          rel: "canonical",
          href: () => `https://thomasthorstensson.com/project/${proj.value?.slug}`
        }
      ]
    });
    useSchemaOrg([
      defineWebPage({
        name: () => proj.value?.name,
        description: () => proj.value?.description,
        image: () => proj.value?.coverImage?.handle,
        datePublished: () => proj.value?.date,
        author: {
          name: "Thomas Thorstensson",
          url: "https://thomasthorstensson.com/about"
        },
        keywords: () => proj.value?.tags?.join(", "),
        about: () => proj.value?.type
      }),
      defineBreadcrumb([
        { name: "Home", item: "/" },
        { name: "Projects", item: "/projects" },
        {
          name: () => proj.value?.name,
          item: () => `/project/${proj.value?.slug}`
        }
      ])
    ]);
    const nonLabProjects = computed(() => {
      return store.data.projects.filter((proj2) => !proj2.labUrl);
    });
    const currentProjectIndex = computed(() => {
      return nonLabProjects.value.findIndex(
        (proj2) => proj2.slug === route.params.id
      );
    });
    const getNextProj = computed(() => {
      const index = currentProjectIndex.value;
      if (index === -1) return null;
      const nextIndex = index === nonLabProjects.value.length - 1 ? 0 : index + 1;
      return nonLabProjects.value[nextIndex];
    });
    const getPrevProj = computed(() => {
      const index = currentProjectIndex.value;
      if (index === -1) return null;
      const prevIndex = index === 0 ? nonLabProjects.value.length - 1 : index - 1;
      return nonLabProjects.value[prevIndex];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIMouseCursor = __nuxt_component_0;
      const _component_UIBackButton = __nuxt_component_1;
      const _component_CommonAbstract = __nuxt_component_1$1;
      const _component_ClientOnly = __nuxt_component_3$3;
      const _component_NuxtImg = __nuxt_component_2;
      const _component_CommonTestimonial = __nuxt_component_5;
      const _component_ViewClientHistory = __nuxt_component_6;
      const _component_CommonLine = __nuxt_component_0$1;
      const _component_LazyUIProjectStepper = __nuxt_component_8_lazy;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-03f31c92>`);
      _push(ssrRenderComponent(_component_UIMouseCursor, null, null, _parent));
      if (unref(proj)) {
        _push(`<div class="project-wrapper" data-v-03f31c92><main class="project" data-v-03f31c92>`);
        _push(ssrRenderComponent(_component_UIBackButton, {
          class: "project__back-button action",
          "data-name": "menu",
          "data-text": "Back",
          to: ""
        }, null, _parent));
        _push(ssrRenderComponent(_component_CommonAbstract, {
          label: unref(proj).name,
          desc: unref(proj).synop?.[0] || unref(proj).client || "",
          "is-full-width": false,
          "class-name": "project__abstract",
          delay: 1,
          "is-hero": false,
          "is-secondary": false,
          "is-page-header": true,
          author: "",
          date: "",
          "is-two-lines": true
        }, null, _parent));
        _push(`<section class="project__content" data-v-03f31c92>`);
        if (unref(proj).video?.[0]?.playbackId) {
          _push(`<div style="${ssrRenderStyle({ "border-radius": "0px", "overflow": "hidden", "display": "flex", "background": "transparent" })}" class="project__media project__media--video" data-video="0" data-v-03f31c92>`);
          _push(ssrRenderComponent(_component_ClientOnly, null, {
            fallback: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="video-skeleton" style="${ssrRenderStyle({ "aspect-ratio": "1920/1080" })}" data-v-03f31c92${_scopeId}></div>`);
              } else {
                return [
                  createVNode("div", {
                    class: "video-skeleton",
                    style: { "aspect-ratio": "1920/1080" }
                  })
                ];
              }
            })
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(proj).video?.[0]?.playbackId) {
          _push(`<div class="project__media project__media--first" data-media="0" data-v-03f31c92>`);
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: unref(proj).image[0].handle,
            provider: "hygraph",
            alt: "Project image",
            format: "webp",
            sizes: "sm:100vw md:40vw lg:35vw xl:80vw",
            densities: "x1 x2"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="project__info project__info--mono" data-v-03f31c92><div class="project__info-col-1" data-v-03f31c92><h2 class="split-proj-w" data-v-03f31c92>Challenge</h2><p class="split-proj-w" data-v-03f31c92>${ssrInterpolate(unref(proj).description[0])}</p><h2 class="split-proj-w" data-v-03f31c92>Perspective</h2><p class="split-proj-w" data-v-03f31c92>${ssrInterpolate(unref(proj).description[1])}</p></div><div class="project__info-col-2" data-v-03f31c92><div class="project__info-col-2__a" data-v-03f31c92><h4 class="split-proj-w" data-v-03f31c92>Client</h4><p class="split-proj-w" data-v-03f31c92>${ssrInterpolate(unref(proj).client)}</p>`);
        if (unref(proj).endclient) {
          _push(`<div data-v-03f31c92><h4 class="split-proj-w" data-v-03f31c92>End Client</h4><p class="split-proj-w" data-v-03f31c92>${ssrInterpolate(unref(proj).endclient)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h4 class="split-proj-w" data-v-03f31c92>Date</h4><p class="split-proj-w" data-v-03f31c92>${ssrInterpolate(unref(proj).date)}</p><h4 class="split-proj-w" data-v-03f31c92>Duration</h4><p class="split-proj-w" data-v-03f31c92>${ssrInterpolate(unref(proj).duration)}</p><h4 class="split-proj-w" data-v-03f31c92>Type</h4><p class="split-proj-w" data-v-03f31c92>${ssrInterpolate(unref(proj).type)}</p></div><div class="project__info-col-2__b" data-v-03f31c92><h4 class="split-proj-w" data-v-03f31c92>Scope</h4><p class="split-proj-w project__info-col-2__b--tags" data-v-03f31c92>${ssrInterpolate(unref(proj).tags.join(", "))}</p>`);
        if (unref(proj).demo) {
          _push(`<div data-v-03f31c92><h5 class="split-proj-w" data-v-03f31c92>Demo</h5><p class="split-proj-w project__info-col-2__b--link" data-v-03f31c92><a${ssrRenderAttr("href", unref(proj).demo)} target="_blank" data-v-03f31c92>${ssrInterpolate(unref(proj).demo)}</a></p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
        if (unref(proj).video?.[0]?.playbackId) {
          _push(`<div class="project__media project__media--first" data-media="0" data-v-03f31c92>`);
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: unref(proj).image[0].handle,
            provider: "hygraph",
            alt: "Project image",
            format: "webp",
            sizes: "sm:100vw md:40vw lg:35vw xl:80vw",
            densities: "x1 x2"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(proj).video?.[1]?.playbackId) {
          _push(`<div style="${ssrRenderStyle({ "overflow": "hidden", "background": "transparent" })}" class="project__media project__media--video" data-video="1" data-v-03f31c92>`);
          _push(ssrRenderComponent(_component_ClientOnly, null, {
            fallback: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="video-skeleton" style="${ssrRenderStyle({ "aspect-ratio": "1920/1080" })}" data-v-03f31c92${_scopeId}></div>`);
              } else {
                return [
                  createVNode("div", {
                    class: "video-skeleton",
                    style: { "aspect-ratio": "1920/1080" }
                  })
                ];
              }
            })
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(proj).image, (image, index) => {
          _push(`<!--[-->`);
          if (index > 0 && index < unref(middleIndex)) {
            _push(`<div class="project__media" data-v-03f31c92>`);
            _push(ssrRenderComponent(_component_NuxtImg, {
              src: image.handle,
              provider: "hygraph",
              alt: "Project image",
              format: "webp",
              sizes: "sm:100vw md:40vw lg:35vw xl:80vw",
              densities: "x1 x2"
            }, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--><div class="project__text" data-v-03f31c92><div class="split-proj-w" data-v-03f31c92>${ssrInterpolate(unref(proj).description[2])}</div></div><div class="project__media" data-v-03f31c92>`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: unref(proj).image[unref(middleIndex)].handle,
          provider: "hygraph",
          alt: "Project image",
          format: "webp",
          sizes: "sm:100vw md:40vw lg:35vw xl:80vw",
          densities: "x1 x2"
        }, null, _parent));
        _push(`</div><div class="project__flex-wrapper" data-v-03f31c92><div class="project__img-col-1" data-v-03f31c92><div class="project__media" data-v-03f31c92>`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: unref(proj).image[unref(middleIndex) + 1].handle,
          provider: "hygraph",
          alt: "Project image",
          format: "webp",
          sizes: "sm:100vw md:40vw lg:35vw xl:80vw",
          densities: "x1 x2"
        }, null, _parent));
        _push(`</div></div><div class="project__img-col-2" data-v-03f31c92><div class="project__media" data-v-03f31c92>`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: unref(proj).image[unref(middleIndex) + 2].handle,
          provider: "hygraph",
          alt: "Project image",
          format: "webp",
          sizes: "sm:100vw md:40vw lg:35vw xl:80vw",
          densities: "x1 x2",
          modifiers: { animated: true }
        }, null, _parent));
        _push(`</div></div></div><div class="project__text" data-v-03f31c92><div class="split-proj-w" data-v-03f31c92>${ssrInterpolate(unref(proj).description[3])}</div></div>`);
        if (unref(proj).testimonialName) {
          _push(`<div data-v-03f31c92>`);
          _push(ssrRenderComponent(_component_CommonTestimonial, {
            name: unref(proj).testimonialName,
            agency: unref(proj).testimonialAgency,
            text: unref(proj).testimonialText
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(proj).clientHistory && unref(proj).clientHistory.length > 0) {
          _push(ssrRenderComponent(_component_ViewClientHistory, {
            clientName: unref(proj).client,
            history: unref(proj).clientHistory
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</section>`);
        _push(ssrRenderComponent(_component_CommonLine, {
          class: "project__line",
          pos: "relative"
        }, null, _parent));
        if (unref(getPrevProj) && unref(getNextProj)) {
          _push(`<nav class="project__nav" data-v-03f31c92>`);
          _push(ssrRenderComponent(_component_LazyUIProjectStepper, {
            prevImg: unref(getPrevProj).image[0].handle,
            nextImg: unref(getNextProj).image[0].handle,
            prevName: unref(getPrevProj).name,
            nextName: unref(getNextProj).name,
            prev: unref(getPrevProj).slug,
            next: unref(getNextProj).slug,
            prevSynop: unref(getPrevProj).synop,
            nextSynop: unref(getNextProj).synop
          }, null, _parent));
          _push(`</nav>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_UIBackButton, {
          class: "project__back-button-bottom action",
          "data-name": "menu",
          "data-text": "Back",
          to: ""
        }, null, _parent));
        _push(`</main></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/project/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-03f31c92"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-DEekURhz.mjs.map
