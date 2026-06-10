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

const ViewParallaxHome_vue_vue_type_style_index_0_scoped_baa7636c_lang = '@font-face{font-family:TWK Everett;src:local("TWK Everett Regular"),local("TWK Everett"),url(' + publicAssetsURL("/_fonts/qtsiY9nMD3WbPt70Y8kEn-43pqD9BlAXzxGk8iK24k-YhEGuUxLxJwYUXsUEfeiWR_-jTG7y_gYU5TIYzth-T0.woff2") + ') format(woff2);font-display:swap;font-weight:400;font-style:normal}@font-face{font-family:"TWK Everett Fallback: Arial";src:local("Arial");size-adjust:109.4659%;ascent-override:92.2661%;descent-override:19.2754%;line-gap-override:9.1353%}.dark-mode[data-v-baa7636c]{--primary:#18181b;--secondary:#fafafa;--accent1:#27272a;--accent2:#a1a1aa;--color-scheme:dark}.light-mode[data-v-baa7636c]{--primary:#fafafa;--secondary:#18181b;--accent1:#a1a1aa;--accent2:#27272a;--color-scheme:light}a[data-v-baa7636c],a[data-v-baa7636c]:active,a[data-v-baa7636c]:hover,a[data-v-baa7636c]:visited{cursor:pointer;text-decoration:none}@media(hover:hover){a[data-v-baa7636c]:hover{color:var(--accent2);filter:blur(1px)}}a[data-v-baa7636c]:active,a[data-v-baa7636c]:focus,a[data-v-baa7636c]:visited{filter:blur(0)!important;-webkit-filter:blur(0)!important}h1[data-v-baa7636c],h2[data-v-baa7636c],h3[data-v-baa7636c],h4[data-v-baa7636c],h5[data-v-baa7636c],h6[data-v-baa7636c]{padding:0;margin:0;font-weight:500;font-family:TWK Everett,"TWK Everett Fallback: Arial",-apple-system,BlinkMacSystemFont,sans-serif}h1[data-v-baa7636c]{font-size:clamp(2rem,.52vw + 1.88rem,2.5rem);margin-bottom:1.5rem}h1[data-v-baa7636c],h2[data-v-baa7636c]{color:var(--secondary)}h2[data-v-baa7636c]{font-size:clamp(1.5rem,.52vw + 1.38rem,2rem);margin-bottom:1rem}h3[data-v-baa7636c]{font-size:clamp(1.25rem,.26vw + 1.19rem,1.5rem);margin-bottom:.5rem}h3[data-v-baa7636c],h4[data-v-baa7636c]{color:var(--secondary)}h4[data-v-baa7636c]{font-size:clamp(1rem,.26vw + .94rem,1.25rem);margin-bottom:.2rem}h5[data-v-baa7636c]{font-size:clamp(.75rem,.26vw + .69rem,1rem);margin-bottom:.5rem;letter-spacing:.8px}h5[data-v-baa7636c],h6[data-v-baa7636c]{color:var(--secondary)}h6[data-v-baa7636c]{font-size:clamp(.63rem,.26vw + .56rem,.88rem);margin-bottom:.2rem;letter-spacing:.6px}p[data-v-baa7636c]{line-height:1.5;font-weight:400}[data-v-baa7636c],[data-v-baa7636c]:after,[data-v-baa7636c]:before{box-sizing:border-box}ul.reset[data-v-baa7636c],ul.reset li[data-v-baa7636c],ul.reset ul li[data-v-baa7636c]{margin:0;padding:0;text-indent:0;list-style-type:none}a[data-v-baa7636c],button[data-v-baa7636c]{all:unset;cursor:pointer;-webkit-tap-highlight-color:transparent;outline:none}a[data-v-baa7636c]:active,a[data-v-baa7636c]:focus,button[data-v-baa7636c]:active,button[data-v-baa7636c]:focus{outline:none!important;-webkit-tap-highlight-color:transparent!important;filter:blur(0)!important;-webkit-filter:blur(0)!important}div[data-v-baa7636c],section[data-v-baa7636c],span[data-v-baa7636c]{caret-color:transparent}h1[data-v-baa7636c],h2[data-v-baa7636c],h3[data-v-baa7636c],h4[data-v-baa7636c],h5[data-v-baa7636c],h6[data-v-baa7636c],p[data-v-baa7636c],pre[data-v-baa7636c]{padding:0;margin-top:0;margin-block-start:0;line-height:1.5}.cursor[data-v-baa7636c],.project-stepper-image-reveal[data-v-baa7636c],.projects__abstract__image[data-v-baa7636c],.split-label-w[data-v-baa7636c],.split-proj-w[data-v-baa7636c],.split-skills-w[data-v-baa7636c],.testimonial-fade[data-v-baa7636c],.waves-canvas[data-v-baa7636c]{will-change:transform,opacity;transform:translateZ(0);backface-visibility:hidden}.split-proj-w[data-v-baa7636c]{will-change:transform}.about__label[data-v-baa7636c]{color:#fafafa}.about[data-v-baa7636c]{overflow:hidden}.about__label[data-v-baa7636c]{position:relative;z-index:100}.about-wrapper[data-v-baa7636c]{display:flex;align-items:center;justify-content:center;position:relative;background-color:var(--primary);overflow:hidden;height:100dvh;height:100vh;padding:64px 16px}@media(min-width:640px){.about-wrapper[data-v-baa7636c]{padding:128px 32px}}@media(min-width:768px){.about-wrapper[data-v-baa7636c]{padding:128px 64px}}@media(min-width:1280px){.about-wrapper[data-v-baa7636c]{padding:128px}}@media(min-width:1536px){.about-wrapper[data-v-baa7636c]{padding:128px 256px}}.parallax__wrapper[data-v-baa7636c]{position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;z-index:1}.parallax__bg[data-v-baa7636c]{position:relative;display:block;right:0;height:130vh;width:100%;z-index:1;will-change:transform;background-size:cover;background-repeat:no-repeat;background-position:25% top;transform:translateZ(0);backface-visibility:hidden;perspective:1000px;contain:layout style paint;image-rendering:optimizeSpeed;background-image:url(' + publicAssetsURL("/img/mooncurve-parallax.jpg") + ")}@-moz-document url-prefix(){.parallax__bg[data-v-baa7636c]{transform:translateZ(0);image-rendering:optimizeSpeed}}@supports (background-image:url(" + publicAssetsURL("/img/mooncurve-parallax.webp") + ")){.parallax__bg[data-v-baa7636c]{background-image:url(/img/mooncurve-parallax.webp)}}@media(min-width:640px){.parallax__bg[data-v-baa7636c]{background-position:25% top}}@media(min-width:768px){.parallax__bg[data-v-baa7636c]{background-position:20% top}}@media(min-width:1024px){.parallax__bg[data-v-baa7636c]{background-position:0 top}}";

const ViewParallaxHomeStyles_D58rYqbY = [
  ViewParallaxHome_vue_vue_type_style_index_0_scoped_baa7636c_lang
];

export { ViewParallaxHomeStyles_D58rYqbY as default };
//# sourceMappingURL=ViewParallaxHome-styles.D58rYqbY.mjs.map
