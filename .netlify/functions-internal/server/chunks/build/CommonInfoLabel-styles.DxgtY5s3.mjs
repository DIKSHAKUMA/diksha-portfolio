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

const CommonInfoLabel_vue_vue_type_style_index_0_scoped_01839cf1_lang = '@font-face{font-family:Cascadia Mono;src:local("Cascadia Mono Variable"),url(' + publicAssetsURL("/_fonts/lvjI_MBIHXEuDQi4hI8ByIOzpj8DC6Ni48lk2jTW0iw-1ZLWo3uKHa2gVnjofOAcUMKG4VVukkxsbUqVsFySiOs.woff2") + ') format(woff2);font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;font-weight:200 700;font-style:normal}@font-face{font-family:"Cascadia Mono Fallback: Courier New";src:local("Courier New");size-adjust:97.6404%;ascent-override:95.0155%;descent-override:24.0039%;line-gap-override:0%}@font-face{font-family:TWK Everett;src:local("TWK Everett Regular"),local("TWK Everett"),url(' + publicAssetsURL("/_fonts/qtsiY9nMD3WbPt70Y8kEn-43pqD9BlAXzxGk8iK24k-YhEGuUxLxJwYUXsUEfeiWR_-jTG7y_gYU5TIYzth-T0.woff2") + ') format(woff2);font-display:swap;font-weight:400;font-style:normal}@font-face{font-family:"TWK Everett Fallback: Arial";src:local("Arial");size-adjust:109.4659%;ascent-override:92.2661%;descent-override:19.2754%;line-gap-override:9.1353%}.dark-mode[data-v-01839cf1]{--primary:#18181b;--secondary:#fafafa;--accent1:#27272a;--accent2:#a1a1aa;--color-scheme:dark}.light-mode[data-v-01839cf1]{--primary:#fafafa;--secondary:#18181b;--accent1:#a1a1aa;--accent2:#27272a;--color-scheme:light}a[data-v-01839cf1],a[data-v-01839cf1]:active,a[data-v-01839cf1]:hover,a[data-v-01839cf1]:visited{cursor:pointer;text-decoration:none}@media(hover:hover){a[data-v-01839cf1]:hover{color:var(--accent2);filter:blur(1px)}}a[data-v-01839cf1]:active,a[data-v-01839cf1]:focus,a[data-v-01839cf1]:visited{filter:blur(0)!important;-webkit-filter:blur(0)!important}h1[data-v-01839cf1],h2[data-v-01839cf1],h3[data-v-01839cf1],h4[data-v-01839cf1],h5[data-v-01839cf1],h6[data-v-01839cf1]{padding:0;margin:0;font-weight:500;font-family:TWK Everett,"TWK Everett Fallback: Arial",-apple-system,BlinkMacSystemFont,sans-serif}h1[data-v-01839cf1]{font-size:clamp(2rem,.52vw + 1.88rem,2.5rem);margin-bottom:1.5rem}h1[data-v-01839cf1],h2[data-v-01839cf1]{color:var(--secondary)}h2[data-v-01839cf1]{font-size:clamp(1.5rem,.52vw + 1.38rem,2rem);margin-bottom:1rem}h3[data-v-01839cf1]{font-size:clamp(1.25rem,.26vw + 1.19rem,1.5rem);margin-bottom:.5rem}h3[data-v-01839cf1],h4[data-v-01839cf1]{color:var(--secondary)}h4[data-v-01839cf1]{font-size:clamp(1rem,.26vw + .94rem,1.25rem);margin-bottom:.2rem}h5[data-v-01839cf1]{font-size:clamp(.75rem,.26vw + .69rem,1rem);margin-bottom:.5rem;letter-spacing:.8px}h5[data-v-01839cf1],h6[data-v-01839cf1]{color:var(--secondary)}h6[data-v-01839cf1]{font-size:clamp(.63rem,.26vw + .56rem,.88rem);margin-bottom:.2rem;letter-spacing:.6px}p[data-v-01839cf1]{line-height:1.5;font-weight:400}[data-v-01839cf1],[data-v-01839cf1]:after,[data-v-01839cf1]:before{box-sizing:border-box}ul.reset[data-v-01839cf1],ul.reset li[data-v-01839cf1],ul.reset ul li[data-v-01839cf1]{margin:0;padding:0;text-indent:0;list-style-type:none}a[data-v-01839cf1],button[data-v-01839cf1]{all:unset;cursor:pointer;-webkit-tap-highlight-color:transparent;outline:none}a[data-v-01839cf1]:active,a[data-v-01839cf1]:focus,button[data-v-01839cf1]:active,button[data-v-01839cf1]:focus{outline:none!important;-webkit-tap-highlight-color:transparent!important;filter:blur(0)!important;-webkit-filter:blur(0)!important}div[data-v-01839cf1],section[data-v-01839cf1],span[data-v-01839cf1]{caret-color:transparent}h1[data-v-01839cf1],h2[data-v-01839cf1],h3[data-v-01839cf1],h4[data-v-01839cf1],h5[data-v-01839cf1],h6[data-v-01839cf1],p[data-v-01839cf1],pre[data-v-01839cf1]{padding:0;margin-top:0;margin-block-start:0;line-height:1.5}.cursor[data-v-01839cf1],.project-stepper-image-reveal[data-v-01839cf1],.projects__abstract__image[data-v-01839cf1],.split-label-w[data-v-01839cf1],.split-proj-w[data-v-01839cf1],.split-skills-w[data-v-01839cf1],.testimonial-fade[data-v-01839cf1],.waves-canvas[data-v-01839cf1]{will-change:transform,opacity;transform:translateZ(0);backface-visibility:hidden}.action[data-v-01839cf1]{display:block;text-decoration:none}.dark-mode .action[data-v-01839cf1]:hover,.light-mode .action[data-v-01839cf1]:hover{color:var(--accent2)}.info-label-wrapper[data-v-01839cf1]{position:absolute;display:flex;color:var(--secondary);will-change:transform;text-rendering:optimizeLegibility;font-weight:400;width:100%;height:100%;top:0;right:0;pointer-events:none}.info-label-wrapper--white[data-v-01839cf1]{color:#faf8ff!important}.info-label-header[data-v-01839cf1]{font-size:clamp(.75rem,.14vw + .71rem,.88rem);font-family:Cascadia Mono,"Cascadia Mono Fallback: Courier New",Courier New,Courier,monospace;font-weight:400;text-transform:uppercase;line-height:1;margin:16px;pointer-events:auto;padding-bottom:env(safe-area-inset-bottom,20px)}@media(min-width:768px){.info-label-header[data-v-01839cf1]{margin:16px 64px}}.info-label-header a[data-v-01839cf1]{color:inherit}';

const CommonInfoLabelStyles_DxgtY5s3 = [
  CommonInfoLabel_vue_vue_type_style_index_0_scoped_01839cf1_lang
];

export { CommonInfoLabelStyles_DxgtY5s3 as default };
//# sourceMappingURL=CommonInfoLabel-styles.DxgtY5s3.mjs.map
