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

const app_vue_vue_type_style_index_0_lang = '@font-face{font-family:TWK Everett;src:local("TWK Everett Regular"),local("TWK Everett"),url(' + publicAssetsURL("/_fonts/qtsiY9nMD3WbPt70Y8kEn-43pqD9BlAXzxGk8iK24k-YhEGuUxLxJwYUXsUEfeiWR_-jTG7y_gYU5TIYzth-T0.woff2") + ') format(woff2);font-display:swap;font-weight:400;font-style:normal}@font-face{font-family:"TWK Everett Fallback: Arial";src:local("Arial");size-adjust:109.4659%;ascent-override:92.2661%;descent-override:19.2754%;line-gap-override:9.1353%}@font-face{font-family:"Switzer Fallback: Arial";src:local("Arial");size-adjust:100.269%;ascent-override:97.7371%;descent-override:24.9329%;line-gap-override:8.9759%}@font-face{font-family:Switzer;src:url(' + publicAssetsURL("/_fonts/2wjfyEWNmh73RTjEB4s72lK0kdG6pEgReDQF-aHQtms-oHDpgZdeDFWGXEbuGcJRpzO5HzGx3oUPVNj0AK1UBMs.woff2") + ') format(woff2);font-display:swap}.dark-mode{--primary:#18181b;--secondary:#fafafa;--accent1:#27272a;--accent2:#a1a1aa;--color-scheme:dark}.light-mode{--primary:#fafafa;--secondary:#18181b;--accent1:#a1a1aa;--accent2:#27272a;--color-scheme:light}a,a:active,a:hover,a:visited{cursor:pointer;text-decoration:none}@media(hover:hover){a:hover{color:var(--accent2);filter:blur(1px)}}a:active,a:focus,a:visited{filter:blur(0)!important;-webkit-filter:blur(0)!important}h1,h2,h3,h4,h5,h6{padding:0;margin:0;font-weight:500;font-family:TWK Everett,"TWK Everett Fallback: Arial",-apple-system,BlinkMacSystemFont,sans-serif}h1{font-size:clamp(2rem,.52vw + 1.88rem,2.5rem);margin-bottom:1.5rem}h1,h2{color:var(--secondary)}h2{font-size:clamp(1.5rem,.52vw + 1.38rem,2rem);margin-bottom:1rem}h3{font-size:clamp(1.25rem,.26vw + 1.19rem,1.5rem);margin-bottom:.5rem}h3,h4{color:var(--secondary)}h4{font-size:clamp(1rem,.26vw + .94rem,1.25rem);margin-bottom:.2rem}h5{font-size:clamp(.75rem,.26vw + .69rem,1rem);margin-bottom:.5rem;letter-spacing:.8px}h5,h6{color:var(--secondary)}h6{font-size:clamp(.63rem,.26vw + .56rem,.88rem);margin-bottom:.2rem;letter-spacing:.6px}p{line-height:1.5;font-weight:400}*,:after,:before{box-sizing:border-box}ul.reset,ul.reset li,ul.reset ul li{margin:0;padding:0;text-indent:0;list-style-type:none}a,button{all:unset;cursor:pointer;-webkit-tap-highlight-color:transparent;outline:none}a:active,a:focus,button:active,button:focus{outline:none!important;-webkit-tap-highlight-color:transparent!important;filter:blur(0)!important;-webkit-filter:blur(0)!important}div,section,span{caret-color:transparent}h1,h2,h3,h4,h5,h6,p,pre{padding:0;margin-top:0;margin-block-start:0;line-height:1.5}.cursor,.project-stepper-image-reveal,.projects__abstract__image,.split-label-w,.split-proj-w,.split-skills-w,.testimonial-fade,.waves-canvas{will-change:transform,opacity;transform:translateZ(0);backface-visibility:hidden}body,html{margin:0;padding:0;height:auto;min-height:100%;overscroll-behavior-y:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background-color:var(--primary);font-family:Switzer,"Switzer Fallback: Arial",-apple-system,BlinkMacSystemFont,sans-serif}body{height:100%;background-color:transparent;transition:background-color .5s cubic-bezier(.175,.885,.32,1.275)}*{box-sizing:border-box}.preloader__svg{width:80%;max-width:400px;height:100px;color:var(--secondary)}.preloader__line{stroke-dasharray:0 250;stroke-dashoffset:0}::-webkit-scrollbar{width:8px;height:8px;background:transparent}::-webkit-scrollbar-thumb{background:#2c2a3866;border-radius:4px;-webkit-transition:background .2s ease;transition:background .2s ease}::-webkit-scrollbar-thumb:hover{background:#2c2a3880}*{scrollbar-width:thin;scrollbar-color:rgba(44,42,56,.4) transparent}.dark-mode::-webkit-scrollbar-thumb{background:#bec1c666}.dark-mode::-webkit-scrollbar-thumb:hover{background:#bec1c680}.dark-mode *{scrollbar-color:hsla(218,7%,76%,.4) transparent}.preloader{position:fixed;top:0;left:0;width:100%;height:100vh;height:100dvh;z-index:10000;display:flex;align-items:center;justify-content:center;background-color:var(--primary);pointer-events:none;opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}.preloader.is-visible{opacity:1;visibility:visible}.preloader__container{display:flex;flex-direction:column;align-items:center;gap:2rem;width:80%;max-width:800px}.preloader__line{display:flex;width:100%;height:2px;gap:2px}.preloader__line--top{margin-bottom:1rem}.preloader__line--bottom{margin-top:1rem}.preloader__segment{flex:1;height:100%;background-color:transparent;border-radius:1px;transition:background-color .3s ease}.preloader__segment.filled{background-color:var(--secondary)}.preloader__text{font-family:Switzer,"Switzer Fallback: Arial",-apple-system,BlinkMacSystemFont,sans-serif;font-size:1.5rem;letter-spacing:.2em;text-transform:uppercase;color:var(--secondary);opacity:0;transition:opacity .5s ease}.venice{left:0;width:100%;height:100vh;height:100dvh;position:fixed;z-index:9999;background-repeat:no-repeat;background-position:50%;visibility:visible;display:flex;will-change:opacity,visibility;perspective:1000px}.venice,.venice__blind{top:0;overflow:hidden;contain:layout style paint;transform:translateZ(0);backface-visibility:hidden;pointer-events:none}.venice__blind{position:relative;flex:1;height:100%;background-color:var(--primary);margin-left:-1px;will-change:transform,opacity}.venice__blind:first-child{margin-left:0}';

const appStyles_DZ2KVFuL = [
  app_vue_vue_type_style_index_0_lang
];

export { appStyles_DZ2KVFuL as default };
//# sourceMappingURL=app-styles.DZ2KVFuL.mjs.map
