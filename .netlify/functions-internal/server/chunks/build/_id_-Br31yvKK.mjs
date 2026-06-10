import { _ as __nuxt_component_0, a as __nuxt_component_1$1 } from './CommonAbstract-B-MDeIzL.mjs';
import { _ as __nuxt_component_1 } from './UIBackButton-CZSfQtzE.mjs';
import { _ as __nuxt_component_2 } from './NuxtImg-WBgrsq8O.mjs';
import { defineComponent, ref, computed, unref, withCtx, createVNode, toDisplayString, defineAsyncComponent, useSSRContext } from 'vue';
import { _ as _export_sfc, d as useBlogStore, u as useRoute, e as useNuxtApp, a as useHead, f as useSchemaOrg, h as defineArticle, j as defineBreadcrumb, g as __nuxt_component_3$3, b as __nuxt_component_3$2 } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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

const __nuxt_component_4_lazy = defineAsyncComponent(() => import('./MDC-DJDHg9Nw.mjs').then((n) => n.M).then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const mdcContentReady = ref(true);
    const showMDC = ref(false);
    const store = useBlogStore();
    const route = useRoute();
    const { $gsap } = useNuxtApp();
    ref(false);
    const post = computed(() => {
      return store.data?.posts?.find((post2) => post2.slug === route.params.id);
    });
    const relatedPosts = computed(() => {
      if (!post.value?.tags?.length || !store.data?.posts?.length) return [];
      const currentTags = post.value.tags;
      const currentSlug = post.value.slug;
      if (!Array.isArray(currentTags) || currentTags.length === 0) return [];
      return store.data.posts.filter((p) => {
        if (!p || p.slug === currentSlug || !p.tags?.length) return false;
        return p.tags.some((tag) => currentTags.includes(tag));
      }).slice(0, 3);
    });
    const coverImageUrl = computed(() => {
      if (!post.value?.coverImage?.handle) return void 0;
      return `https://eu-west-2.graphassets.com/cm4tev3k1008n01uo6egngvzu/${post.value.coverImage.handle}`;
    });
    useHead({
      title: () => post.value ? `${post.value.title} • Thomas Thorstensson` : "Loading...",
      meta: [
        { name: "description", content: () => post.value?.subject || "Read this blog post by Thomas Thorstensson" },
        { property: "og:title", content: () => post.value?.title },
        { property: "og:description", content: () => post.value?.subject },
        { property: "og:image", content: () => coverImageUrl.value },
        { property: "og:type", content: "article" },
        { property: "article:author", content: () => post.value?.authors?.[0]?.name },
        { property: "article:published_time", content: () => post.value?.date },
        { property: "article:tag", content: () => post.value?.tags },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: () => post.value?.title },
        { name: "twitter:description", content: () => post.value?.subject },
        { name: "twitter:image", content: () => coverImageUrl.value }
      ]
    });
    useHead({
      link: [
        {
          rel: "canonical",
          href: () => `https://thomasthorstensson.com/blog-post/${post.value?.slug}`
        }
      ]
    });
    useSchemaOrg([
      () => {
        if (!post.value) return null;
        return defineArticle({
          headline: post.value.title,
          description: post.value.subject,
          image: coverImageUrl.value,
          datePublished: post.value.date,
          dateModified: post.value.updatedAt || post.value.date,
          author: {
            name: post.value.authors?.[0]?.name || "Thomas Thorstensson",
            url: "https://thomasthorstensson.com/about"
          },
          publisher: {
            name: "Thomas Thorstensson",
            url: "https://thomasthorstensson.com"
          }
        });
      },
      () => {
        if (!post.value) return null;
        return defineBreadcrumb([
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          {
            name: post.value.title,
            item: `/blog-post/${post.value.slug}`
          }
        ]);
      }
    ]);
    const setupMDCLinks = () => {
      const contentContainer = (void 0).querySelector(".blog__post-content");
      if (!contentContainer) return;
      const links = contentContainer.querySelectorAll("a");
      (void 0).querySelectorAll("a");
      links.forEach((link) => {
        link.setAttribute("target", "_blank");
        link.setAttribute("data-name", "menu");
        link.classList.add("action");
      });
      mdcContentReady.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIMouseCursor = __nuxt_component_0;
      const _component_UIBackButton = __nuxt_component_1;
      const _component_CommonAbstract = __nuxt_component_1$1;
      const _component_NuxtImg = __nuxt_component_2;
      const _component_LazyMDC = __nuxt_component_4_lazy;
      const _component_ClientOnly = __nuxt_component_3$3;
      const _component_NuxtLink = __nuxt_component_3$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-4cd1da51>`);
      if (unref(mdcContentReady)) {
        _push(`<div data-v-4cd1da51>`);
        _push(ssrRenderComponent(_component_UIMouseCursor, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="blog-post-wrapper" data-v-4cd1da51><div class="blog" data-v-4cd1da51><main class="blog__post" data-v-4cd1da51>`);
      _push(ssrRenderComponent(_component_UIBackButton, {
        class: "blog__back-button action",
        "data-name": "menu",
        "data-text": "Back",
        to: ""
      }, null, _parent));
      if (unref(post)) {
        _push(`<div data-v-4cd1da51>`);
        _push(ssrRenderComponent(_component_CommonAbstract, {
          label: unref(post).title,
          desc: unref(post).subject,
          delay: 1,
          "class-name": "blog-intro",
          "is-full-width": false,
          author: unref(post).authors[0].name,
          date: unref(post).date,
          "is-hero": false,
          "is-secondary": false,
          "is-two-lines": false,
          "is-page-header": true
        }, null, _parent));
        _push(`<div class="blog__post-cover" data-v-4cd1da51>`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: unref(post).coverImage?.handle,
          provider: "hygraph",
          alt: unref(post).title ? `Cover image for ${unref(post).title}` : "Blog post cover image",
          format: "webp",
          sizes: " sm:100vw md:65vw lg:65vw xl:45vw",
          densities: "x1 x2"
        }, null, _parent));
        _push(`</div><div class="blog__post-content" data-v-4cd1da51>`);
        if (!unref(mdcContentReady)) {
          _push(`<div class="mdc-loading" data-v-4cd1da51><div class="mdc-spinner" data-v-4cd1da51><div class="mdc-spinner__circle" data-v-4cd1da51></div></div><p class="mdc-loading-text" data-v-4cd1da51>Loading content...</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(showMDC)) {
          _push(`<div class="${ssrRenderClass([{ "mdc-content--hidden": !unref(mdcContentReady) }, "mdc-content"])}" data-v-4cd1da51>`);
          _push(ssrRenderComponent(_component_LazyMDC, {
            value: unref(post).content,
            ref: "mdc",
            onVnodeMounted: setupMDCLinks
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      if (unref(relatedPosts).length > 0) {
        _push(`<div class="blog__related-posts" data-v-4cd1da51><h1 data-v-4cd1da51>Related Posts</h1><div class="related-posts-list" data-v-4cd1da51><!--[-->`);
        ssrRenderList(unref(relatedPosts), (relatedPost) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: relatedPost.slug,
            to: `/blog-post/${relatedPost.slug}`,
            class: "related-post"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="related-post__content action" data-name="menu" data-v-4cd1da51${_scopeId}><h3 class="related-post__title" data-v-4cd1da51${_scopeId}>${ssrInterpolate(relatedPost.title)}</h3><p class="related-post__subject" data-v-4cd1da51${_scopeId}>${ssrInterpolate(relatedPost.subject)}</p><div class="related-post__meta" data-v-4cd1da51${_scopeId}><span class="related-post__date" data-v-4cd1da51${_scopeId}>${ssrInterpolate(relatedPost.date)}</span><span class="related-post__length" data-v-4cd1da51${_scopeId}>${ssrInterpolate(relatedPost.length)}</span></div></div>`);
              } else {
                return [
                  createVNode("div", {
                    class: "related-post__content action",
                    "data-name": "menu"
                  }, [
                    createVNode("h3", { class: "related-post__title" }, toDisplayString(relatedPost.title), 1),
                    createVNode("p", { class: "related-post__subject" }, toDisplayString(relatedPost.subject), 1),
                    createVNode("div", { class: "related-post__meta" }, [
                      createVNode("span", { class: "related-post__date" }, toDisplayString(relatedPost.date), 1),
                      createVNode("span", { class: "related-post__length" }, toDisplayString(relatedPost.length), 1)
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(ssrRenderComponent(_component_UIBackButton, {
        class: "blog__back-button-bottom action",
        "data-name": "menu",
        "data-text": "Back",
        to: ""
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog-post/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4cd1da51"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-Br31yvKK.mjs.map
