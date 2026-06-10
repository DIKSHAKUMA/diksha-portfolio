import { _ as __nuxt_component_0, a as __nuxt_component_1$1 } from './CommonAbstract-B-MDeIzL.mjs';
import { _ as _export_sfc, t as useNavbarStore, o as useFolioStore, e as useNuxtApp, b as __nuxt_component_3$2, l as __nuxt_component_3$1, v as navigateTo } from './server.mjs';
import { _ as __nuxt_component_2 } from './NuxtImg-WBgrsq8O.mjs';
import { defineComponent, useTemplateRef, ref, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ViewProjects",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useFolioStore();
    const { $gsap } = useNuxtApp();
    useTemplateRef("projectsReel");
    ref([]);
    const clampedIndex = ref(0);
    const isDragging = ref(false);
    const dateSorted = computed(() => {
      if (!store.data?.projects) return [];
      return [...store.data.projects].sort((a, b) => {
        const parseDate = (dateStr) => {
          const [month, year] = dateStr.split(" ");
          return /* @__PURE__ */ new Date(`${month} 1, ${year}`);
        };
        return parseDate(b.date).getTime() - parseDate(a.date).getTime();
      });
    });
    const activeFilter = ref("All");
    const filteredProjects = computed(() => {
      const all = dateSorted.value;
      const key = activeFilter.value.toLowerCase();
      if (key === "all") return all;
      if (key === "personal") return all.filter((p) => p.labUrl);
      return all.filter((p) => !p.labUrl);
    });
    computed(() => {
      return filteredProjects.value[clampedIndex.value];
    });
    const progressIndex = computed(() => {
      const totalProjects = filteredProjects.value.length || 1;
      return { current: clampedIndex.value + 1, total: totalProjects };
    });
    const getProjectTags = (project) => {
      if (!project?.tags || !Array.isArray(project.tags)) return "";
      return project.tags.map((tag) => `[ ${tag} ]`).join(" ");
    };
    const handleProjectClick = (project) => {
      if (project.labUrl) {
        (void 0).open(project.labUrl, "_blank");
      } else {
        navigateTo(`/project/${project.slug}`);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonAbstract = __nuxt_component_1$1;
      const _component_NuxtLink = __nuxt_component_3$2;
      const _component_NuxtImg = __nuxt_component_2;
      const _component_Icon = __nuxt_component_3$1;
      _push(`<main${ssrRenderAttrs(mergeProps({
        ref: "main",
        class: "projects-wrapper"
      }, _attrs))} data-v-e2566a6a><div class="projects-background" data-v-e2566a6a></div>`);
      _push(ssrRenderComponent(_component_CommonAbstract, {
        class: "front-header",
        label: "Projects",
        delay: 1,
        desc: "",
        "class-name": "abstract__projects",
        "is-hero": true,
        "is-full-width": false,
        "is-secondary": false,
        author: "",
        date: "",
        "is-two-lines": false,
        "is-page-header": false
      }, null, _parent));
      _push(`<div class="progress" data-v-e2566a6a><div class="progress__text" data-v-e2566a6a>${ssrInterpolate(unref(progressIndex).current)}/${ssrInterpolate(unref(progressIndex).total)}</div></div><div class="project-filter" data-v-e2566a6a><!--[-->`);
      ssrRenderList(["All", "Client", "Personal"], (opt) => {
        _push(`<button class="${ssrRenderClass([{ "project-filter--active": unref(activeFilter) === opt }, "project-filter__btn action"])}" data-name="menu" data-v-e2566a6a><span class="project-filter__word" data-v-e2566a6a>${ssrInterpolate(opt)}</span>`);
        if (opt !== "Personal") {
          _push(`<!--[--> /<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div><div class="projects" data-v-e2566a6a><div class="projects__reel" data-v-e2566a6a><!--[-->`);
      ssrRenderList(unref(filteredProjects), (project, index) => {
        _push(`<div data-v-e2566a6a><div class="${ssrRenderClass([{
          "projects__project--open": index === unref(clampedIndex) && !unref(isDragging)
        }, "projects__project"])}" data-v-e2566a6a><div class="projects__project__image-container action" data-name="reel" data-v-e2566a6a>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          onClick: ($event) => handleProjectClick(project)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtImg, {
                src: project.coverImage?.handle,
                provider: "hygraph",
                alt: "Project image",
                format: "webp",
                sizes: "sm:100vw",
                densities: "x1 x2",
                class: "projects__project__image"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_NuxtImg, {
                  src: project.coverImage?.handle,
                  provider: "hygraph",
                  alt: "Project image",
                  format: "webp",
                  sizes: "sm:100vw",
                  densities: "x1 x2",
                  class: "projects__project__image"
                }, null, 8, ["src"])
              ];
            }
          }),
          _: 2
        }, _parent));
        if (project.labUrl) {
          _push(`<span class="projects__lab-indicator" title="Lab Project" data-v-e2566a6a>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:link-box-variant",
            class: "projects__lab-indicator-svg"
          }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="projects__project__info" data-v-e2566a6a><div class="projects__project__title" data-v-e2566a6a><p class="split-proj-w" data-v-e2566a6a>${ssrInterpolate(project.name)}</p><p class="split-proj-w" data-v-e2566a6a>${ssrInterpolate(project.date.split(" ")[1])}</p></div>`);
        if (project.tags && project.tags.length > 0) {
          _push(`<span class="projects__project__meta split-proj-w" data-v-e2566a6a>${ssrInterpolate(getProjectTags(project))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div></div></main>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/view/ViewProjects.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-e2566a6a"]]), { __name: "ViewProjects" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "projects",
  __ssrInlineRender: true,
  setup(__props) {
    useNavbarStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIMouseCursor = __nuxt_component_0;
      const _component_ViewProjects = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-d71bfd8a>`);
      _push(ssrRenderComponent(_component_UIMouseCursor, null, null, _parent));
      _push(`<div class="projects-outer-wrapper" data-v-d71bfd8a>`);
      _push(ssrRenderComponent(_component_ViewProjects, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const projects = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d71bfd8a"]]);

export { projects as default };
//# sourceMappingURL=projects-DPTWaGJr.mjs.map
