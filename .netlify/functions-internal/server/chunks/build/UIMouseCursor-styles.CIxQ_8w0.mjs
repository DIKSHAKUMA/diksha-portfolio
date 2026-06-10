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

const UIMouseCursor_vue_vue_type_style_index_0_scoped_7f4b0f23_lang = '@font-face{font-family:Cascadia Mono;src:local("Cascadia Mono Variable"),url(' + publicAssetsURL("/_fonts/lvjI_MBIHXEuDQi4hI8ByIOzpj8DC6Ni48lk2jTW0iw-1ZLWo3uKHa2gVnjofOAcUMKG4VVukkxsbUqVsFySiOs.woff2") + ') format(woff2);font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:200 700;font-style:normal}@font-face{font-family:"Cascadia Mono Fallback: Courier New";src:local("Courier New");size-adjust:97.6404%;ascent-override:95.0155%;descent-override:24.0039%;line-gap-override:0%}@font-face{font-family:TWK Everett;src:local("TWK Everett Regular"),local("TWK Everett"),url(' + publicAssetsURL("/_fonts/qtsiY9nMD3WbPt70Y8kEn-43pqD9BlAXzxGk8iK24k-YhEGuUxLxJwYUXsUEfeiWR_-jTG7y_gYU5TIYzth-T0.woff2") + ') format(woff2);font-display:swap;font-weight:400;font-style:normal}@font-face{font-family:"TWK Everett Fallback: Arial";src:local("Arial");size-adjust:109.4659%;ascent-override:92.2661%;descent-override:19.2754%;line-gap-override:9.1353%}.dark-mode[data-v-7f4b0f23]{--primary:#18181b;--secondary:#fafafa;--accent1:#27272a;--accent2:#a1a1aa;--color-scheme:dark}.light-mode[data-v-7f4b0f23]{--primary:#fafafa;--secondary:#18181b;--accent1:#a1a1aa;--accent2:#27272a;--color-scheme:light}a[data-v-7f4b0f23],a[data-v-7f4b0f23]:active,a[data-v-7f4b0f23]:hover,a[data-v-7f4b0f23]:visited{cursor:pointer;text-decoration:none}@media(hover:hover){a[data-v-7f4b0f23]:hover{color:var(--accent2);filter:blur(1px)}}a[data-v-7f4b0f23]:active,a[data-v-7f4b0f23]:focus,a[data-v-7f4b0f23]:visited{filter:blur(0)!important;-webkit-filter:blur(0)!important}h1[data-v-7f4b0f23],h2[data-v-7f4b0f23],h3[data-v-7f4b0f23],h4[data-v-7f4b0f23],h5[data-v-7f4b0f23],h6[data-v-7f4b0f23]{padding:0;margin:0;font-weight:500;font-family:TWK Everett,"TWK Everett Fallback: Arial",-apple-system,BlinkMacSystemFont,sans-serif}h1[data-v-7f4b0f23]{font-size:clamp(2rem,.52vw + 1.88rem,2.5rem);margin-bottom:1.5rem}h1[data-v-7f4b0f23],h2[data-v-7f4b0f23]{color:var(--secondary)}h2[data-v-7f4b0f23]{font-size:clamp(1.5rem,.52vw + 1.38rem,2rem);margin-bottom:1rem}h3[data-v-7f4b0f23]{font-size:clamp(1.25rem,.26vw + 1.19rem,1.5rem);margin-bottom:.5rem}h3[data-v-7f4b0f23],h4[data-v-7f4b0f23]{color:var(--secondary)}h4[data-v-7f4b0f23]{font-size:clamp(1rem,.26vw + .94rem,1.25rem);margin-bottom:.2rem}h5[data-v-7f4b0f23]{font-size:clamp(.75rem,.26vw + .69rem,1rem);margin-bottom:.5rem;letter-spacing:.8px}h5[data-v-7f4b0f23],h6[data-v-7f4b0f23]{color:var(--secondary)}h6[data-v-7f4b0f23]{font-size:clamp(.63rem,.26vw + .56rem,.88rem);margin-bottom:.2rem;letter-spacing:.6px}p[data-v-7f4b0f23]{line-height:1.5;font-weight:400}[data-v-7f4b0f23],[data-v-7f4b0f23]:after,[data-v-7f4b0f23]:before{box-sizing:border-box}ul.reset[data-v-7f4b0f23],ul.reset li[data-v-7f4b0f23],ul.reset ul li[data-v-7f4b0f23]{margin:0;padding:0;text-indent:0;list-style-type:none}a[data-v-7f4b0f23],button[data-v-7f4b0f23]{all:unset;cursor:pointer;-webkit-tap-highlight-color:transparent;outline:none}a[data-v-7f4b0f23]:active,a[data-v-7f4b0f23]:focus,button[data-v-7f4b0f23]:active,button[data-v-7f4b0f23]:focus{outline:none!important;-webkit-tap-highlight-color:transparent!important;filter:blur(0)!important;-webkit-filter:blur(0)!important}div[data-v-7f4b0f23],section[data-v-7f4b0f23],span[data-v-7f4b0f23]{caret-color:transparent}h1[data-v-7f4b0f23],h2[data-v-7f4b0f23],h3[data-v-7f4b0f23],h4[data-v-7f4b0f23],h5[data-v-7f4b0f23],h6[data-v-7f4b0f23],p[data-v-7f4b0f23],pre[data-v-7f4b0f23]{padding:0;margin-top:0;margin-block-start:0;line-height:1.5}.cursor[data-v-7f4b0f23],.project-stepper-image-reveal[data-v-7f4b0f23],.projects__abstract__image[data-v-7f4b0f23],.split-label-w[data-v-7f4b0f23],.split-proj-w[data-v-7f4b0f23],.split-skills-w[data-v-7f4b0f23],.testimonial-fade[data-v-7f4b0f23],.waves-canvas[data-v-7f4b0f23]{will-change:transform,opacity;transform:translateZ(0);backface-visibility:hidden}.up-arrow[data-v-7f4b0f23]{width:20px;margin-bottom:4px}.arrow[data-v-7f4b0f23],.up-arrow[data-v-7f4b0f23]{height:auto;pointer-events:none;margin-left:5px;fill:var(--secondary)}.arrow[data-v-7f4b0f23]{width:12px}.arrow--reverse[data-v-7f4b0f23]{transform:rotate(180deg)}.arrow--before[data-v-7f4b0f23]{margin-left:0;margin-right:5px}.cursor[data-v-7f4b0f23]{pointer-events:none;font-family:Cascadia Mono,"Cascadia Mono Fallback: Courier New",Courier New,Courier,monospace;font-weight:400;font-size:13px;position:fixed;z-index:9000;width:100%;visibility:hidden}.cursor__shape[data-v-7f4b0f23]{display:flex;align-items:center;justify-content:center;width:20px;height:20px;border:1px solid rgba(250,247,255,.1);border-radius:50%;pointer-events:none;transform-origin:center center;will-change:width,height,transform;transition:all .4s cubic-bezier(.075,.82,.165,1);-webkit-backdrop-filter:blur(15px);backdrop-filter:blur(15px);opacity:.8;box-shadow:0 4px 16px #0000001a;background:#18181b}.light-mode .cursor__shape[data-v-7f4b0f23]{background:#fafafa;border-color:#1717171a}.cursor__shape--proj[data-v-7f4b0f23]{width:80px;height:80px;opacity:.8}.cursor__shape--reel[data-v-7f4b0f23]{width:50px;height:50px;opacity:.8}.cursor__shape--menu[data-v-7f4b0f23]{width:70px;height:70px;opacity:.6}.cursor__shape--yo[data-v-7f4b0f23]{width:70px;height:70px;opacity:.8}.cursor__shape__text[data-v-7f4b0f23]{display:flex;align-items:center;justify-content:center;backface-visibility:hidden;transform:translateZ(0);-webkit-text-size-adjust:100%;text-rendering:optimizeLegibility;white-space:nowrap;opacity:1!important;font-weight:400;color:var(--secondary)}';

const UIMouseCursorStyles_CIxQ_8w0 = [
  UIMouseCursor_vue_vue_type_style_index_0_scoped_7f4b0f23_lang
];

export { UIMouseCursorStyles_CIxQ_8w0 as default };
//# sourceMappingURL=UIMouseCursor-styles.CIxQ_8w0.mjs.map
