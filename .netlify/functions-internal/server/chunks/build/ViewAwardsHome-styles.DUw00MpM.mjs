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

const ViewAwardsHome_vue_vue_type_style_index_0_scoped_52333543_lang = '@font-face{font-family:TWK Everett;src:local("TWK Everett Regular"),local("TWK Everett"),url(' + publicAssetsURL("/_fonts/qtsiY9nMD3WbPt70Y8kEn-43pqD9BlAXzxGk8iK24k-YhEGuUxLxJwYUXsUEfeiWR_-jTG7y_gYU5TIYzth-T0.woff2") + ') format(woff2);font-display:swap;font-weight:400;font-style:normal}@font-face{font-family:"TWK Everett Fallback: Arial";src:local("Arial");size-adjust:109.4659%;ascent-override:92.2661%;descent-override:19.2754%;line-gap-override:9.1353%}.dark-mode[data-v-52333543]{--primary:#18181b;--secondary:#fafafa;--accent1:#27272a;--accent2:#a1a1aa;--color-scheme:dark}.light-mode[data-v-52333543]{--primary:#fafafa;--secondary:#18181b;--accent1:#a1a1aa;--accent2:#27272a;--color-scheme:light}a[data-v-52333543],a[data-v-52333543]:active,a[data-v-52333543]:hover,a[data-v-52333543]:visited{cursor:pointer;text-decoration:none}@media(hover:hover){a[data-v-52333543]:hover{color:var(--accent2);filter:blur(1px)}}a[data-v-52333543]:active,a[data-v-52333543]:focus,a[data-v-52333543]:visited{filter:blur(0)!important;-webkit-filter:blur(0)!important}h1[data-v-52333543],h2[data-v-52333543],h3[data-v-52333543],h4[data-v-52333543],h5[data-v-52333543],h6[data-v-52333543]{padding:0;margin:0;font-weight:500;font-family:TWK Everett,"TWK Everett Fallback: Arial",-apple-system,BlinkMacSystemFont,sans-serif}h1[data-v-52333543]{font-size:clamp(2rem,.52vw + 1.88rem,2.5rem);margin-bottom:1.5rem}h1[data-v-52333543],h2[data-v-52333543]{color:var(--secondary)}h2[data-v-52333543]{font-size:clamp(1.5rem,.52vw + 1.38rem,2rem);margin-bottom:1rem}h3[data-v-52333543]{font-size:clamp(1.25rem,.26vw + 1.19rem,1.5rem);margin-bottom:.5rem}h3[data-v-52333543],h4[data-v-52333543]{color:var(--secondary)}h4[data-v-52333543]{font-size:clamp(1rem,.26vw + .94rem,1.25rem);margin-bottom:.2rem}h5[data-v-52333543]{font-size:clamp(.75rem,.26vw + .69rem,1rem);margin-bottom:.5rem;letter-spacing:.8px}h5[data-v-52333543],h6[data-v-52333543]{color:var(--secondary)}h6[data-v-52333543]{font-size:clamp(.63rem,.26vw + .56rem,.88rem);margin-bottom:.2rem;letter-spacing:.6px}p[data-v-52333543]{line-height:1.5;font-weight:400}[data-v-52333543],[data-v-52333543]:after,[data-v-52333543]:before{box-sizing:border-box}ul.reset[data-v-52333543],ul.reset li[data-v-52333543],ul.reset ul li[data-v-52333543]{margin:0;padding:0;text-indent:0;list-style-type:none}a[data-v-52333543],button[data-v-52333543]{all:unset;cursor:pointer;-webkit-tap-highlight-color:transparent;outline:none}a[data-v-52333543]:active,a[data-v-52333543]:focus,button[data-v-52333543]:active,button[data-v-52333543]:focus{outline:none!important;-webkit-tap-highlight-color:transparent!important;filter:blur(0)!important;-webkit-filter:blur(0)!important}div[data-v-52333543],section[data-v-52333543],span[data-v-52333543]{caret-color:transparent}h1[data-v-52333543],h2[data-v-52333543],h3[data-v-52333543],h4[data-v-52333543],h5[data-v-52333543],h6[data-v-52333543],p[data-v-52333543],pre[data-v-52333543]{padding:0;margin-top:0;margin-block-start:0;line-height:1.5}.cursor[data-v-52333543],.project-stepper-image-reveal[data-v-52333543],.projects__abstract__image[data-v-52333543],.split-label-w[data-v-52333543],.split-proj-w[data-v-52333543],.split-skills-w[data-v-52333543],.testimonial-fade[data-v-52333543],.waves-canvas[data-v-52333543]{will-change:transform,opacity;transform:translateZ(0);backface-visibility:hidden}.award-wrapper[data-v-52333543]{min-height:100vh;display:flex;flex-direction:column;position:relative;background-color:var(--primary);padding:64px 16px}@media(min-width:640px){.award-wrapper[data-v-52333543]{padding:128px 32px}}@media(min-width:768px){.award-wrapper[data-v-52333543]{padding:128px 64px}}@media(min-width:1280px){.award-wrapper[data-v-52333543]{padding:128px}}@media(min-width:1536px){.award-wrapper[data-v-52333543]{padding:128px 256px}}.award-section[data-v-52333543]{width:100%;overflow:hidden;position:relative;padding:16px 0}.award-link[data-v-52333543]{display:flex;width:100%;height:100%;align-items:center;justify-content:center;text-decoration:none}.award-svg[data-v-52333543]{height:100%;width:100%;-o-object-fit:contain;object-fit:contain}.marquee-container[data-v-52333543]{display:flex;align-items:center;justify-content:center;min-height:40vh;width:100%}@media(min-width:768px){.marquee-container[data-v-52333543]{min-height:50vh}}.marquee[data-v-52333543]{width:100%;position:relative;display:block}.marquee__content[data-v-52333543]{display:flex;width:-moz-max-content;width:max-content;animation:marquee-scroll-52333543 20s linear infinite;align-items:center;margin-top:15px;filter:invert(0)}.marquee__content--light[data-v-52333543]{filter:invert(0)}.marquee__content[data-v-52333543]{--gap:32px;gap:var(--gap)}@media(min-width:768px){.marquee__content[data-v-52333543]{--gap:64px;gap:var(--gap)}}.award-cell[data-v-52333543]{height:200px;width:auto;min-width:120px;display:flex;align-items:center;justify-content:center;padding:8px;box-sizing:border-box;flex-shrink:0}@media(min-width:768px){.award-cell[data-v-52333543]{height:200px;min-width:180px;padding:12px}}@media(min-width:1280px){.award-cell[data-v-52333543]{height:220px;min-width:250px;padding:20px}}@keyframes marquee-scroll-52333543{0%{transform:translate(0)}to{transform:translate(calc(-50% - var(--gap)/2))}}';

const ViewAwardsHomeStyles_DUw00MpM = [
  ViewAwardsHome_vue_vue_type_style_index_0_scoped_52333543_lang
];

export { ViewAwardsHomeStyles_DUw00MpM as default };
//# sourceMappingURL=ViewAwardsHome-styles.DUw00MpM.mjs.map
