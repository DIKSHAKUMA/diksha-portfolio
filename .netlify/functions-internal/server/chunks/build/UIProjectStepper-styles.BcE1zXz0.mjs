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

const UIProjectStepper_vue_vue_type_style_index_0_scoped_d98b2560_lang = '@font-face{font-family:TWK Everett;src:local("TWK Everett Regular"),local("TWK Everett"),url(' + publicAssetsURL("/_fonts/qtsiY9nMD3WbPt70Y8kEn-43pqD9BlAXzxGk8iK24k-YhEGuUxLxJwYUXsUEfeiWR_-jTG7y_gYU5TIYzth-T0.woff2") + ') format(woff2);font-display:swap;font-weight:400;font-style:normal}@font-face{font-family:"TWK Everett Fallback: Arial";src:local("Arial");size-adjust:109.4659%;ascent-override:92.2661%;descent-override:19.2754%;line-gap-override:9.1353%}.dark-mode[data-v-d98b2560]{--primary:#18181b;--secondary:#fafafa;--accent1:#27272a;--accent2:#a1a1aa;--color-scheme:dark}.light-mode[data-v-d98b2560]{--primary:#fafafa;--secondary:#18181b;--accent1:#a1a1aa;--accent2:#27272a;--color-scheme:light}a[data-v-d98b2560],a[data-v-d98b2560]:active,a[data-v-d98b2560]:hover,a[data-v-d98b2560]:visited{cursor:pointer;text-decoration:none}@media(hover:hover){a[data-v-d98b2560]:hover{color:var(--accent2);filter:blur(1px)}}a[data-v-d98b2560]:active,a[data-v-d98b2560]:focus,a[data-v-d98b2560]:visited{filter:blur(0)!important;-webkit-filter:blur(0)!important}h1[data-v-d98b2560],h2[data-v-d98b2560],h3[data-v-d98b2560],h4[data-v-d98b2560],h5[data-v-d98b2560],h6[data-v-d98b2560]{padding:0;margin:0;font-weight:500;font-family:TWK Everett,"TWK Everett Fallback: Arial",-apple-system,BlinkMacSystemFont,sans-serif}h1[data-v-d98b2560]{font-size:clamp(2rem,.52vw + 1.88rem,2.5rem);margin-bottom:1.5rem}h1[data-v-d98b2560],h2[data-v-d98b2560]{color:var(--secondary)}h2[data-v-d98b2560]{font-size:clamp(1.5rem,.52vw + 1.38rem,2rem);margin-bottom:1rem}h3[data-v-d98b2560]{font-size:clamp(1.25rem,.26vw + 1.19rem,1.5rem);margin-bottom:.5rem}h3[data-v-d98b2560],h4[data-v-d98b2560]{color:var(--secondary)}h4[data-v-d98b2560]{font-size:clamp(1rem,.26vw + .94rem,1.25rem);margin-bottom:.2rem}h5[data-v-d98b2560]{font-size:clamp(.75rem,.26vw + .69rem,1rem);margin-bottom:.5rem;letter-spacing:.8px}h5[data-v-d98b2560],h6[data-v-d98b2560]{color:var(--secondary)}h6[data-v-d98b2560]{font-size:clamp(.63rem,.26vw + .56rem,.88rem);margin-bottom:.2rem;letter-spacing:.6px}p[data-v-d98b2560]{line-height:1.5;font-weight:400}[data-v-d98b2560],[data-v-d98b2560]:after,[data-v-d98b2560]:before{box-sizing:border-box}ul.reset[data-v-d98b2560],ul.reset li[data-v-d98b2560],ul.reset ul li[data-v-d98b2560]{margin:0;padding:0;text-indent:0;list-style-type:none}a[data-v-d98b2560],button[data-v-d98b2560]{all:unset;cursor:pointer;-webkit-tap-highlight-color:transparent;outline:none}a[data-v-d98b2560]:active,a[data-v-d98b2560]:focus,button[data-v-d98b2560]:active,button[data-v-d98b2560]:focus{outline:none!important;-webkit-tap-highlight-color:transparent!important;filter:blur(0)!important;-webkit-filter:blur(0)!important}div[data-v-d98b2560],section[data-v-d98b2560],span[data-v-d98b2560]{caret-color:transparent}h1[data-v-d98b2560],h2[data-v-d98b2560],h3[data-v-d98b2560],h4[data-v-d98b2560],h5[data-v-d98b2560],h6[data-v-d98b2560],p[data-v-d98b2560],pre[data-v-d98b2560]{padding:0;margin-top:0;margin-block-start:0;line-height:1.5}.cursor[data-v-d98b2560],.project-stepper-image-reveal[data-v-d98b2560],.projects__abstract__image[data-v-d98b2560],.split-label-w[data-v-d98b2560],.split-proj-w[data-v-d98b2560],.split-skills-w[data-v-d98b2560],.testimonial-fade[data-v-d98b2560],.waves-canvas[data-v-d98b2560]{will-change:transform,opacity;transform:translateZ(0);backface-visibility:hidden}h3[data-v-d98b2560],h4[data-v-d98b2560]{margin-bottom:0}img[data-v-d98b2560]{display:block;width:100%;height:auto;aspect-ratio:2048/1150;pointer-events:auto;touch-action:pan-y;font-size:0}.pixi-overlay[data-v-d98b2560],img[data-v-d98b2560]{-o-object-fit:cover;object-fit:cover}.pixi-overlay[data-v-d98b2560]{position:absolute;top:0;left:0;width:100%!important;height:100%!important;z-index:9999;padding:0;margin:0}.pixi-overlay[data-v-d98b2560],canvas[data-v-d98b2560]{pointer-events:none}.project-stepper-wrapper[data-v-d98b2560]{position:relative;padding:32px 0}@media(min-width:640px){.project-stepper-wrapper[data-v-d98b2560]{padding:64px 0;height:auto}}@media(min-width:768px){.project-stepper-wrapper[data-v-d98b2560]{padding:64px 0}}@media(min-width:1280px){.project-stepper-wrapper[data-v-d98b2560]{padding:128px 0}}@media(min-width:1536px){.project-stepper-wrapper[data-v-d98b2560]{padding:128px 0}}.project-stepper[data-v-d98b2560]{display:flex;flex-direction:column;align-items:center;row-gap:16px;color:var(--secondary)}@media(min-width:640px){.project-stepper[data-v-d98b2560]{row-gap:64px}}.project-stepper__synop[data-v-d98b2560]{font-size:clamp(.75rem,.13vw + .72rem,.88rem)}.project-stepper__name[data-v-d98b2560],.project-stepper__synop[data-v-d98b2560]{margin-left:16px;font-family:TWK Everett,"TWK Everett Fallback: Arial",-apple-system,BlinkMacSystemFont,sans-serif}@media(min-width:768px){.project-stepper[data-v-d98b2560]{-moz-column-gap:32px;column-gap:32px}}@media(min-width:768px){.project-stepper[data-v-d98b2560]{flex-flow:row}}.project-stepper__next[data-v-d98b2560],.project-stepper__prev[data-v-d98b2560]{flex:1}.project-stepper__name[data-v-d98b2560]{margin-top:16px}';

const UIProjectStepperStyles_BcE1zXz0 = [
  UIProjectStepper_vue_vue_type_style_index_0_scoped_d98b2560_lang
];

export { UIProjectStepperStyles_BcE1zXz0 as default };
//# sourceMappingURL=UIProjectStepper-styles.BcE1zXz0.mjs.map
