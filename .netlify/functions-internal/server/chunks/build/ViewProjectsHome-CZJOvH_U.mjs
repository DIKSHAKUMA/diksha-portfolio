import { _ as __nuxt_component_0 } from './CommonLine-ChyYD9mX.mjs';
import { a as __nuxt_component_1 } from './CommonAbstract-B-MDeIzL.mjs';
import { _ as __nuxt_component_2 } from './NuxtImg-WBgrsq8O.mjs';
import { _ as _export_sfc, o as useFolioStore, e as useNuxtApp, l as __nuxt_component_3$1 } from './server.mjs';
import { _ as __nuxt_component_2$1 } from './CommonInfoLabel-CccTLGOM.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "ViewProjectsHome",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useFolioStore();
    const { $gsap } = useNuxtApp();
    const getProjectTags = (project) => {
      if (!project?.tags || !Array.isArray(project.tags)) return "";
      return project.tags.map((tag) => `[ ${tag} ]`).join(" ");
    };
    const dateSorted = computed(() => {
      if (!store.data?.projects) return [];
      return [...store.data.projects].filter((proj) => proj.selectedproj).sort((a, b) => {
        const parseDate = (dateStr) => {
          const [month, year] = dateStr.split(" ");
          return /* @__PURE__ */ new Date(`${month} 1, ${year}`);
        };
        return parseDate(b.date).getTime() - parseDate(a.date).getTime();
      }).slice(0, 7);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLine = __nuxt_component_0;
      const _component_CommonAbstract = __nuxt_component_1;
      const _component_NuxtImg = __nuxt_component_2;
      const _component_Icon = __nuxt_component_3$1;
      const _component_CommonInfoLabel = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "projects-home-wrapper" }, _attrs))} data-v-b4da55e1>`);
      _push(ssrRenderComponent(_component_CommonLine, {
        pos: "absolute",
        width: ""
      }, null, _parent));
      _push(`<main class="projects" data-v-b4da55e1>`);
      _push(ssrRenderComponent(_component_CommonAbstract, {
        class: "projects__header",
        label: unref(store).data.intro?.projIntroTitle,
        desc: "",
        "is-page-header": false,
        "class-name": "projects-intro",
        "is-secondary": true,
        delay: 0,
        "is-full-width": false,
        "is-hero": false,
        author: "",
        date: "",
        "is-two-lines": false
      }, null, _parent));
      _push(`<section class="projects__abstract" data-v-b4da55e1><!--[-->`);
      ssrRenderList(unref(dateSorted), (proj) => {
        _push(`<div data-v-b4da55e1><div class="projects__abstract__item" data-v-b4da55e1><div class="projects__abstract__image action" data-name="proj" data-text="View" data-color="#FFF" data-v-b4da55e1>`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: proj.coverImage?.handle,
          provider: "hygraph",
          alt: "Project image",
          format: "webp",
          sizes: "100vw sm:46vw md:50vw lg:42vw xl:38vw 2xl:34vw",
          densities: "x1 x2",
          quality: "100"
        }, null, _parent));
        if (proj.labUrl) {
          _push(`<div class="projects__abstract__image--lab" title="Lab Project" data-v-b4da55e1>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:link-box-variant",
            class: "projects__abstract__image--lab-svg"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="projects__abstract__info" data-v-b4da55e1><div class="projects__abstract__title" data-v-b4da55e1><p class="split-proj-w" data-v-b4da55e1>${ssrInterpolate(proj.name)}</p><p class="split-proj-w" data-v-b4da55e1>${ssrInterpolate(proj.date.split(" ")[1])}</p></div>`);
        if (proj.tags && proj.tags.length > 0) {
          _push(`<span class="projects__abstract__meta split-proj-w" data-v-b4da55e1>${ssrInterpolate(getProjectTags(proj))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></section></main>`);
      _push(ssrRenderComponent(_component_CommonInfoLabel, {
        label: "Recent work / labs",
        "class-name": "project-label",
        hpos: "center",
        "hover-label": "",
        "force-white": false,
        vpos: "flex-start",
        link: ""
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/view/ViewProjectsHome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ViewProjectsHome = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-b4da55e1"]]), { __name: "ViewProjectsHome" });

export { ViewProjectsHome as default };
//# sourceMappingURL=ViewProjectsHome-CZJOvH_U.mjs.map
