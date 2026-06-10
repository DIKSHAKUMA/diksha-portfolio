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

const UINavHeader_vue_vue_type_style_index_0_scoped_8b3127ec_lang = '@font-face{font-family:"TWK Everett Fallback: Arial";src:local("Arial");size-adjust:109.4659%;ascent-override:92.2661%;descent-override:19.2754%;line-gap-override:9.1353%}@font-face{font-family:TWK Everett;src:local("TWK Everett Regular"),local("TWK Everett"),url(' + publicAssetsURL("/_fonts/qtsiY9nMD3WbPt70Y8kEn-43pqD9BlAXzxGk8iK24k-YhEGuUxLxJwYUXsUEfeiWR_-jTG7y_gYU5TIYzth-T0.woff2") + ') format(woff2);font-display:swap;font-weight:400;font-style:normal}.dark-mode[data-v-8b3127ec]{--primary:#18181b;--secondary:#fafafa;--accent1:#27272a;--accent2:#a1a1aa;--color-scheme:dark}.light-mode[data-v-8b3127ec]{--primary:#fafafa;--secondary:#18181b;--accent1:#a1a1aa;--accent2:#27272a;--color-scheme:light}a[data-v-8b3127ec],a[data-v-8b3127ec]:active,a[data-v-8b3127ec]:hover,a[data-v-8b3127ec]:visited{cursor:pointer;text-decoration:none}@media(hover:hover){a[data-v-8b3127ec]:hover{color:var(--accent2);filter:blur(1px)}}a[data-v-8b3127ec]:active,a[data-v-8b3127ec]:focus,a[data-v-8b3127ec]:visited{filter:blur(0)!important;-webkit-filter:blur(0)!important}h1[data-v-8b3127ec],h2[data-v-8b3127ec],h3[data-v-8b3127ec],h4[data-v-8b3127ec],h5[data-v-8b3127ec],h6[data-v-8b3127ec]{padding:0;margin:0;font-weight:500;font-family:TWK Everett,"TWK Everett Fallback: Arial",-apple-system,BlinkMacSystemFont,sans-serif}h1[data-v-8b3127ec]{font-size:clamp(2rem,.52vw + 1.88rem,2.5rem);margin-bottom:1.5rem}h1[data-v-8b3127ec],h2[data-v-8b3127ec]{color:var(--secondary)}h2[data-v-8b3127ec]{font-size:clamp(1.5rem,.52vw + 1.38rem,2rem);margin-bottom:1rem}h3[data-v-8b3127ec]{font-size:clamp(1.25rem,.26vw + 1.19rem,1.5rem);margin-bottom:.5rem}h3[data-v-8b3127ec],h4[data-v-8b3127ec]{color:var(--secondary)}h4[data-v-8b3127ec]{font-size:clamp(1rem,.26vw + .94rem,1.25rem);margin-bottom:.2rem}h5[data-v-8b3127ec]{font-size:clamp(.75rem,.26vw + .69rem,1rem);margin-bottom:.5rem;letter-spacing:.8px}h5[data-v-8b3127ec],h6[data-v-8b3127ec]{color:var(--secondary)}h6[data-v-8b3127ec]{font-size:clamp(.63rem,.26vw + .56rem,.88rem);margin-bottom:.2rem;letter-spacing:.6px}p[data-v-8b3127ec]{line-height:1.5;font-weight:400}[data-v-8b3127ec],[data-v-8b3127ec]:after,[data-v-8b3127ec]:before{box-sizing:border-box}ul.reset[data-v-8b3127ec],ul.reset li[data-v-8b3127ec],ul.reset ul li[data-v-8b3127ec]{margin:0;padding:0;text-indent:0;list-style-type:none}a[data-v-8b3127ec],button[data-v-8b3127ec]{all:unset;cursor:pointer;-webkit-tap-highlight-color:transparent;outline:none}a[data-v-8b3127ec]:active,a[data-v-8b3127ec]:focus,button[data-v-8b3127ec]:active,button[data-v-8b3127ec]:focus{outline:none!important;-webkit-tap-highlight-color:transparent!important;filter:blur(0)!important;-webkit-filter:blur(0)!important}div[data-v-8b3127ec],section[data-v-8b3127ec],span[data-v-8b3127ec]{caret-color:transparent}h1[data-v-8b3127ec],h2[data-v-8b3127ec],h3[data-v-8b3127ec],h4[data-v-8b3127ec],h5[data-v-8b3127ec],h6[data-v-8b3127ec],p[data-v-8b3127ec],pre[data-v-8b3127ec]{padding:0;margin-top:0;margin-block-start:0;line-height:1.5}.cursor[data-v-8b3127ec],.project-stepper-image-reveal[data-v-8b3127ec],.projects__abstract__image[data-v-8b3127ec],.split-label-w[data-v-8b3127ec],.split-proj-w[data-v-8b3127ec],.split-skills-w[data-v-8b3127ec],.testimonial-fade[data-v-8b3127ec],.waves-canvas[data-v-8b3127ec]{will-change:transform,opacity;transform:translateZ(0);backface-visibility:hidden}.logo[data-v-8b3127ec]{font-family:TWK Everett,"TWK Everett Fallback: Arial",-apple-system,BlinkMacSystemFont,sans-serif;font-size:clamp(1rem,.14vw + .96rem,1.13rem);font-weight:450;font-variation-settings:"wght" 450;font-weight:400;letter-spacing:1px;z-index:1000}[is-mobile=true] .logo[data-v-8b3127ec]{font-weight:400;font-variation-settings:"wght" 400}';

const UINavHeaderStyles_CQNB8fSg = [
  UINavHeader_vue_vue_type_style_index_0_scoped_8b3127ec_lang
];

export { UINavHeaderStyles_CQNB8fSg as default };
//# sourceMappingURL=UINavHeader-styles.CQNB8fSg.mjs.map
