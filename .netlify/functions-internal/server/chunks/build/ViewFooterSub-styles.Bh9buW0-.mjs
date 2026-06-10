import { p as publicAssetsURL } from '../_/nitro.mjs';
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
import 'vue';
import '@iconify/utils';
import 'node:crypto';
import 'fast-xml-parser';
import 'unhead/server';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';

const ViewFooterSub_vue_vue_type_style_index_0_scoped_3eefd3b8_lang = '@font-face{font-family:TWK Everett;src:local("TWK Everett Regular"),local("TWK Everett"),url(' + publicAssetsURL("/_fonts/qtsiY9nMD3WbPt70Y8kEn-43pqD9BlAXzxGk8iK24k-YhEGuUxLxJwYUXsUEfeiWR_-jTG7y_gYU5TIYzth-T0.woff2") + ') format(woff2);font-display:swap;font-weight:400;font-style:normal}@font-face{font-family:"TWK Everett Fallback: Arial";src:local("Arial");size-adjust:109.4659%;ascent-override:92.2661%;descent-override:19.2754%;line-gap-override:9.1353%}.dark-mode[data-v-3eefd3b8]{--primary:#18181b;--secondary:#fafafa;--accent1:#27272a;--accent2:#a1a1aa;--color-scheme:dark}.light-mode[data-v-3eefd3b8]{--primary:#fafafa;--secondary:#18181b;--accent1:#a1a1aa;--accent2:#27272a;--color-scheme:light}a[data-v-3eefd3b8],a[data-v-3eefd3b8]:active,a[data-v-3eefd3b8]:hover,a[data-v-3eefd3b8]:visited{cursor:pointer;text-decoration:none}@media(hover:hover){a[data-v-3eefd3b8]:hover{color:var(--accent2);filter:blur(1px)}}a[data-v-3eefd3b8]:active,a[data-v-3eefd3b8]:focus,a[data-v-3eefd3b8]:visited{filter:blur(0)!important;-webkit-filter:blur(0)!important}h1[data-v-3eefd3b8],h2[data-v-3eefd3b8],h3[data-v-3eefd3b8],h4[data-v-3eefd3b8],h5[data-v-3eefd3b8],h6[data-v-3eefd3b8]{padding:0;margin:0;font-weight:500;font-family:TWK Everett,"TWK Everett Fallback: Arial",-apple-system,BlinkMacSystemFont,sans-serif}h1[data-v-3eefd3b8]{font-size:clamp(2rem,.52vw + 1.88rem,2.5rem);margin-bottom:1.5rem}h1[data-v-3eefd3b8],h2[data-v-3eefd3b8]{color:var(--secondary)}h2[data-v-3eefd3b8]{font-size:clamp(1.5rem,.52vw + 1.38rem,2rem);margin-bottom:1rem}h3[data-v-3eefd3b8]{font-size:clamp(1.25rem,.26vw + 1.19rem,1.5rem);margin-bottom:.5rem}h3[data-v-3eefd3b8],h4[data-v-3eefd3b8]{color:var(--secondary)}h4[data-v-3eefd3b8]{font-size:clamp(1rem,.26vw + .94rem,1.25rem);margin-bottom:.2rem}h5[data-v-3eefd3b8]{font-size:clamp(.75rem,.26vw + .69rem,1rem);margin-bottom:.5rem;letter-spacing:.8px}h5[data-v-3eefd3b8],h6[data-v-3eefd3b8]{color:var(--secondary)}h6[data-v-3eefd3b8]{font-size:clamp(.63rem,.26vw + .56rem,.88rem);margin-bottom:.2rem;letter-spacing:.6px}p[data-v-3eefd3b8]{line-height:1.5;font-weight:400}[data-v-3eefd3b8],[data-v-3eefd3b8]:after,[data-v-3eefd3b8]:before{box-sizing:border-box}ul.reset[data-v-3eefd3b8],ul.reset li[data-v-3eefd3b8],ul.reset ul li[data-v-3eefd3b8]{margin:0;padding:0;text-indent:0;list-style-type:none}a[data-v-3eefd3b8],button[data-v-3eefd3b8]{all:unset;cursor:pointer;-webkit-tap-highlight-color:transparent;outline:none}a[data-v-3eefd3b8]:active,a[data-v-3eefd3b8]:focus,button[data-v-3eefd3b8]:active,button[data-v-3eefd3b8]:focus{outline:none!important;-webkit-tap-highlight-color:transparent!important;filter:blur(0)!important;-webkit-filter:blur(0)!important}div[data-v-3eefd3b8],section[data-v-3eefd3b8],span[data-v-3eefd3b8]{caret-color:transparent}h1[data-v-3eefd3b8],h2[data-v-3eefd3b8],h3[data-v-3eefd3b8],h4[data-v-3eefd3b8],h5[data-v-3eefd3b8],h6[data-v-3eefd3b8],p[data-v-3eefd3b8],pre[data-v-3eefd3b8]{padding:0;margin-top:0;margin-block-start:0;line-height:1.5}.cursor[data-v-3eefd3b8],.project-stepper-image-reveal[data-v-3eefd3b8],.projects__abstract__image[data-v-3eefd3b8],.split-label-w[data-v-3eefd3b8],.split-proj-w[data-v-3eefd3b8],.split-skills-w[data-v-3eefd3b8],.testimonial-fade[data-v-3eefd3b8],.waves-canvas[data-v-3eefd3b8]{will-change:transform,opacity;transform:translateZ(0);backface-visibility:hidden}.archive-wrapper[data-v-3eefd3b8]{position:relative;padding:0 16px;overflow:hidden;--dot-size:2px;--dot-space:64px;min-height:100vh;background-color:var(--primary)}.archive-wrapper[data-v-3eefd3b8]:before{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background-image:radial-gradient(var(--accent2) var(--dot-size),transparent var(--dot-size));background-size:var(--dot-space) var(--dot-space);background-position:50% 50%;background-attachment:fixed;opacity:.3;pointer-events:none;z-index:0}@supports (-webkit-touch-callout:none){.archive-wrapper[data-v-3eefd3b8]:before{background-attachment:scroll}}@media(min-width:640px){.archive-wrapper[data-v-3eefd3b8]{--dot-space:118px}}.archive[data-v-3eefd3b8]{display:flex;justify-content:center;align-items:center;overflow:hidden;height:100vh}.archive__label[data-v-3eefd3b8]{position:relative;display:inline-block;z-index:200;font-family:TWK Everett,"TWK Everett Fallback: Arial",-apple-system,BlinkMacSystemFont,sans-serif;font-size:clamp(2.25rem,1.11vw + 1.92rem,3.25rem);font-weight:500;font-variation-settings:"wght" 500}.archive__label a[data-v-3eefd3b8]{color:var(--secondary);position:relative;text-decoration:underline;text-underline-offset:15px;text-decoration-thickness:2px;text-decoration-color:var(--secondary);transition:background-size .2s cubic-bezier(.17,.67,.83,.67),text-decoration-color .2s cubic-bezier(.17,.67,.83,.67);line-height:1.2}';

const ViewFooterSubStyles_Bh9buW0_ = [
  ViewFooterSub_vue_vue_type_style_index_0_scoped_3eefd3b8_lang
];

export { ViewFooterSubStyles_Bh9buW0_ as default };
//# sourceMappingURL=ViewFooterSub-styles.Bh9buW0-.mjs.map
