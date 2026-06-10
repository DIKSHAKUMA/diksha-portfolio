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

const default_vue_vue_type_style_index_0_scoped_65a5b8f6_lang = '@font-face{font-family:TWK Everett;src:local("TWK Everett Regular"),local("TWK Everett"),url(' + publicAssetsURL("/_fonts/qtsiY9nMD3WbPt70Y8kEn-43pqD9BlAXzxGk8iK24k-YhEGuUxLxJwYUXsUEfeiWR_-jTG7y_gYU5TIYzth-T0.woff2") + ') format(woff2);font-display:swap;font-weight:400;font-style:normal}@font-face{font-family:"TWK Everett Fallback: Arial";src:local("Arial");size-adjust:109.4659%;ascent-override:92.2661%;descent-override:19.2754%;line-gap-override:9.1353%}.dark-mode[data-v-65a5b8f6]{--primary:#18181b;--secondary:#fafafa;--accent1:#27272a;--accent2:#a1a1aa;--color-scheme:dark}.light-mode[data-v-65a5b8f6]{--primary:#fafafa;--secondary:#18181b;--accent1:#a1a1aa;--accent2:#27272a;--color-scheme:light}a[data-v-65a5b8f6],a[data-v-65a5b8f6]:active,a[data-v-65a5b8f6]:hover,a[data-v-65a5b8f6]:visited{cursor:pointer;text-decoration:none}@media(hover:hover){a[data-v-65a5b8f6]:hover{color:var(--accent2);filter:blur(1px)}}a[data-v-65a5b8f6]:active,a[data-v-65a5b8f6]:focus,a[data-v-65a5b8f6]:visited{filter:blur(0)!important;-webkit-filter:blur(0)!important}h1[data-v-65a5b8f6],h2[data-v-65a5b8f6],h3[data-v-65a5b8f6],h4[data-v-65a5b8f6],h5[data-v-65a5b8f6],h6[data-v-65a5b8f6]{padding:0;margin:0;font-weight:500;font-family:TWK Everett,"TWK Everett Fallback: Arial",-apple-system,BlinkMacSystemFont,sans-serif}h1[data-v-65a5b8f6]{font-size:clamp(2rem,.52vw + 1.88rem,2.5rem);margin-bottom:1.5rem}h1[data-v-65a5b8f6],h2[data-v-65a5b8f6]{color:var(--secondary)}h2[data-v-65a5b8f6]{font-size:clamp(1.5rem,.52vw + 1.38rem,2rem);margin-bottom:1rem}h3[data-v-65a5b8f6]{font-size:clamp(1.25rem,.26vw + 1.19rem,1.5rem);margin-bottom:.5rem}h3[data-v-65a5b8f6],h4[data-v-65a5b8f6]{color:var(--secondary)}h4[data-v-65a5b8f6]{font-size:clamp(1rem,.26vw + .94rem,1.25rem);margin-bottom:.2rem}h5[data-v-65a5b8f6]{font-size:clamp(.75rem,.26vw + .69rem,1rem);margin-bottom:.5rem;letter-spacing:.8px}h5[data-v-65a5b8f6],h6[data-v-65a5b8f6]{color:var(--secondary)}h6[data-v-65a5b8f6]{font-size:clamp(.63rem,.26vw + .56rem,.88rem);margin-bottom:.2rem;letter-spacing:.6px}p[data-v-65a5b8f6]{line-height:1.5;font-weight:400}[data-v-65a5b8f6],[data-v-65a5b8f6]:after,[data-v-65a5b8f6]:before{box-sizing:border-box}ul.reset[data-v-65a5b8f6],ul.reset li[data-v-65a5b8f6],ul.reset ul li[data-v-65a5b8f6]{margin:0;padding:0;text-indent:0;list-style-type:none}a[data-v-65a5b8f6],button[data-v-65a5b8f6]{all:unset;cursor:pointer;-webkit-tap-highlight-color:transparent;outline:none}a[data-v-65a5b8f6]:active,a[data-v-65a5b8f6]:focus,button[data-v-65a5b8f6]:active,button[data-v-65a5b8f6]:focus{outline:none!important;-webkit-tap-highlight-color:transparent!important;filter:blur(0)!important;-webkit-filter:blur(0)!important}div[data-v-65a5b8f6],section[data-v-65a5b8f6],span[data-v-65a5b8f6]{caret-color:transparent}h1[data-v-65a5b8f6],h2[data-v-65a5b8f6],h3[data-v-65a5b8f6],h4[data-v-65a5b8f6],h5[data-v-65a5b8f6],h6[data-v-65a5b8f6],p[data-v-65a5b8f6],pre[data-v-65a5b8f6]{padding:0;margin-top:0;margin-block-start:0;line-height:1.5}.cursor[data-v-65a5b8f6],.project-stepper-image-reveal[data-v-65a5b8f6],.projects__abstract__image[data-v-65a5b8f6],.split-label-w[data-v-65a5b8f6],.split-proj-w[data-v-65a5b8f6],.split-skills-w[data-v-65a5b8f6],.testimonial-fade[data-v-65a5b8f6],.waves-canvas[data-v-65a5b8f6]{will-change:transform,opacity;transform:translateZ(0);backface-visibility:hidden}.folio-wrapper[data-v-65a5b8f6]{position:relative}';

const defaultStyles_Dyy5xRcY = [
  default_vue_vue_type_style_index_0_scoped_65a5b8f6_lang
];

export { defaultStyles_Dyy5xRcY as default };
//# sourceMappingURL=default-styles.Dyy5xRcY.mjs.map
