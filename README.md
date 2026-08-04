![Image](https://github.com/user-attachments/assets/e61bba62-016a-4a72-baa7-6cee225755ea)
<br />

## V2 08/02/2025

[www.thomasthorstensson.com](https://www.thomasthorstensson.com)

# Folio - Thomas Thorstensson

This project has been a labor of love in a blazing Barcelona summer.

From the outset, I wanted to pull together many creative ideas and libraries. Motion is key, and so I am making use of ThreeJS, Pixi, and GSAP. The motion parts are there to enhance the content parts. Halfway through the project, I decided to add a blog. I will be posting more about the integration between Hygraph and Nuxt MDC later on, on the blog.

Glad for the positive reception, with Site of The Day Awards at CSSWinner and Design Nominees, a Kudos UI/UX at CSS Design Awards, and an includion in GSAP showcase 💚.

Have a coffee and a slow visit. :penguin: .T

## Upgrades 04/08/2026

- **WCAG accessibility pass**
  Added semantic landmarks (`<nav>`, headings, skip-to-content), restored keyboard focus indicators, made burger and color toggle keyboard-accessible, added `aria-current` on active links, descriptive image alt text, and `aria-live` on loading spinners. Light/dark parallax heading contrast fixed.

## Upgrades 08/02/2025

Removed P5.js and focusing all motion on WebGL with Three.js and Pixi.js. New shiny 3D motion element, DNA and Galaxy.

## Upgrades 28/12/2025

- **Nuxt Rolldown**  
  Upgraded to Nuxt Rolldown to improve performance.

- **Nuxt Hygraph Images Config**  
  Changed so that images now are optimized on Hygraph side also in local, with IPX being default for /public.

- **TWK Everett font added + other font changes**
  Now using Google for body and mono fonts; using the nice TWKEverett font for UI and headings in CommonAbstractt component. TWKEverett is hosted on my Cloudflare R2, set as custom provider, and loaded via .env path.
  - **Visal tuning**  
    Some fixes and optimizations and visual fine tunings.

## Upgrades 3/12/2025

- **Nuxt 4 migration**  
  Folio upgraded and refactored to Nuxt 4, aligning structure with the new `app/` directory conventions and updated module ecosystem.

- **Navigation responsiveness**  
  Improved perceived navigation speed by leveraging Nuxt’s built-in route prefetching and cleaning up transition timing, reducing delay before page transitions (Venice blinds) start.

## Setup

Note: This is a GraphQL (Hygraph) driven project. So forgive me if I skip the usual setup instructions; content will not diplay without the API key.

However, feel free to reuse parts of this codebase. But be aware that it will break as per usual :collision:

[MIT](https://choosealicense.com/licenses/mit/)

## Mayor exploración :link:

[Nuxt](https://nuxt.com/)

[Nuxt MDC](https://github.com/nuxt-mdc/nuxt-mdc)

[Mux](https://mux.com/)

[GSAP](https://greensock.com/)

[Pinia](https://pinia.vuejs.org/)

[Pixi](https://pixijs.com/)

[Lenis](https://lenis.io/)

[VueUse](https://vueuse.org/)

[P5.js](https://p5js.org/)

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information :penguin:
Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information :penguin:
