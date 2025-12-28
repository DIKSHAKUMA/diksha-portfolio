<script setup lang="ts">
  import { ref, onBeforeUnmount } from 'vue'
  import { useNavbarStore } from '../../../stores/useNavbarStore'

  const isDown = ref(false)
  const isMobileActive = ref(false)
  const isAnimating = ref(false)
  const isLightMode = ref<boolean>(false)
  const route = useRoute()
  const navbarStore = useNavbarStore()
  const { $gsap } = useNuxtApp()
  const colorMode = useColorMode()

  let screenWidth: any
  let currScrollPos: number
  let prevScrollPos: number

  /**
   * Responsive navbar for those who like BEM with &.
   * Turns full modal on smaller devices. Hides on scroll down.
   * The code here is quite extensive as it integrates with the folio.
   * Could be much simpler, I have gone overboard.
   *
   * As per usual I try my best to follow this order:
   * 1. Reactive state
   * 2. Computed properties
   * 3. Functions
   * 4. Watchers
   * 5. Lifecycle hooks
   * 6. Define/Expose
   */

  /* 
    Check if current route is in blog section
    The below computed properties helps to add active class to subroutes
   */
  const isBlogActive = computed(() => {
    return route.path === '/blog' || route.path.startsWith('/blog-post/')
  })

  /* Same here, preserve active class highlight if on subroute  */
  const isProjectsActive = computed(() => {
    return route.path === '/projects' || route.path.startsWith('/project/')
  })

  if (import.meta.client) {
    screenWidth = ref(window.innerWidth)
  }

  /**
   * We need to also be able to turn off background color
   * So we can enjoy the strobe on projects page.
   */
  const navClassObj = computed(() => {
    return {
      'nav-wrapper--projects-open': navbarStore.isProjectsPage,
      'nav-wrapper--contact-open': navbarStore.isContactPage,
      'nav-wrapper--contact-burger-white':
        navbarStore.isContactPage && !isMobileActive.value,
      'nav-wrapper--no-blur': isDown.value,
    }
  })

  const navInnerClassObj = computed(() => {
    return {
      'nav-wrapper__inner--moveup': isDown.value,
    }
  })

  const toggleMenu = () => {
    if (isAnimating.value) return

    isAnimating.value = true
    isMobileActive.value = !isMobileActive.value

    if (isMobileActive.value) {
      $gsap.fromTo(
        '.nav__item',
        { opacity: 0, x: -40 },
        {
          duration: 0.2,
          opacity: 1,
          x: 0,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.5,
          onComplete: () => {
            isAnimating.value = false
          },
        }
      )
    } else {
      $gsap.to('.nav__item', {
        duration: 0.2,
        opacity: 0,
        onComplete: () => {
          isAnimating.value = false
        },
      })
    }
  }

  const closeMenu = () => {
    if (screenWidth.value < 768 && isMobileActive.value) {
      toggleMenu()
    }
  }

  const checkScreenWidth = () => {
    if (import.meta.client) {
      screenWidth.value = window.innerWidth
      if (screenWidth.value > 768) {
        isMobileActive.value = false
        /* Reset GSAP animations when switching back to desktop */
        $gsap.set('.nav__item', { opacity: 1, x: 0 })
      }
    }
  }

  let scrollTimeout: NodeJS.Timeout | null = null
  let lastUpdateTime = 0
  let lastDirectionChange = 0
  let lastDirection: 'up' | 'down' | null = null

  const onScroll = () => {
    const now = Date.now()
    const throttleDelay = 8 // Faster than 16ms for better responsiveness
    
    // Throttle to prevent excessive calls
    if (now - lastUpdateTime < throttleDelay) {
      return
    }
    
    currScrollPos = window.scrollY

    // Clamp scroll position to prevent iOS bounce from affecting navbar
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const clampedScrollPos = Math.max(0, Math.min(currScrollPos, maxScroll))

    // Initialize prevScrollPos on first run
    if (prevScrollPos === undefined) {
      prevScrollPos = clampedScrollPos
      lastUpdateTime = now
      return
    }

    // Only update if scroll position changed significantly
    if (Math.abs(prevScrollPos - clampedScrollPos) > 5) {
      const currentDirection = prevScrollPos >= clampedScrollPos ? 'up' : 'down'
      
      // Prevent jitter: only change direction if enough time has passed since last change
      const directionChangeDelay = 100 // Minimum time between direction changes
      const canChangeDirection = !lastDirection || 
        currentDirection === lastDirection || 
        (now - lastDirectionChange > directionChangeDelay)
      
      if (canChangeDirection) {
        if (prevScrollPos >= clampedScrollPos) {
          isDown.value = false
        } else {
          isDown.value = true
        }
        
        // Track direction changes to prevent jitter
        if (lastDirection !== currentDirection) {
          lastDirection = currentDirection
          lastDirectionChange = now
        }
        
        prevScrollPos = clampedScrollPos
        lastUpdateTime = now
      }
    }
    
    // Clear any pending timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
    
    // Set timeout for cleanup only (much longer delay)
    scrollTimeout = setTimeout(() => {
      // Optional: Reset direction tracking after inactivity
      if (now - lastDirectionChange > 1000) {
        lastDirection = null
      }
    }, 200)
  }

  const resetMagneticLinks = () => {
    /* Reset all magnetic links to their original position */
    const magneticElements = document.querySelectorAll('.magnet')
    magneticElements.forEach((element) => {
      $gsap.set(element, { x: 0, y: 0 })
    })
  }

  /* Watch isLightMode changes and update colorMode - OUTSIDE onMounted */
  watch(
    () => isLightMode.value,
    (newValue) => {
      colorMode.preference = newValue ? 'light' : 'dark'
    },
    { immediate: true }
  )

  /* Watch for projects route to maintain projects & contac page navbar background transparency */
  watch(
    () => route.path,
    (newPath, oldPath) => {
      // Only update if we're actually changing routes
      if (newPath !== oldPath) {
        // Add a small delay to let the transition start
        setTimeout(() => {
          navbarStore.setProjectsOpen(newPath === '/projects')
          navbarStore.setContactOpen(newPath === '/contact')
        }, 1200) // Small delay to ensure the transition has started
      }
    },
    { immediate: true }
  )

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', checkScreenWidth)

    /* Reset magnetic links on route change */
    const router = useRouter()
    router.afterEach(() => {
      resetMagneticLinks()
    })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenWidth)
    window.removeEventListener('scroll', onScroll)
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
  })

  checkScreenWidth()
</script>

<template>
  <div class="nav-wrapper" :class="navClassObj">
    <div class="nav-wrapper__inner" :class="navInnerClassObj">
      <UINavHeader :is-mobile="isMobileActive" class="header-wrapper">
        <template #logo>
          <ClientOnly>
            <NuxtLink
              to="/"
              data-name="yo"
              data-text="Home"
              class="logo action"
              @click="closeMenu"
              >Thomas
            </NuxtLink>
          </ClientOnly>
        </template>
      </UINavHeader>

      <div class="nav" :class="[isMobileActive ? 'nav--open' : 'nav--closed']">
        <div class="nav__list">
          <NuxtLink
            to="/projects"
            data-name="menu"
            class="nav__item action magnet"
            :class="{
              'nav--link-active': isProjectsActive,
              'nav__item--disabled': isAnimating,
            }"
            @click="!isAnimating && closeMenu()"
          >
            Projects
          </NuxtLink>

          <NuxtLink
            to="/blog"
            data-name="menu"
            class="nav__item action magnet"
            :class="{
              'nav--link-active': isBlogActive,
              'nav__item--disabled': isAnimating,
            }"
            @click="!isAnimating && closeMenu()"
          >
            Blog
          </NuxtLink>

          <NuxtLink
            to="/about"
            data-name="menu"
            class="nav__item action magnet"
            :class="[
              { 'nav--link-active': route.path === '/about' },
              { 'nav__item--disabled': isAnimating },
            ]"
            @click="!isAnimating && closeMenu()"
          >
            About
          </NuxtLink>

          <NuxtLink
            to="/contact"
            data-name="menu"
            class="nav__item action magnet"
            :class="[
              { 'nav--link-active': route.path === '/contact' },
              { 'nav__item--disabled': isAnimating },
            ]"
            @click="!isAnimating && closeMenu()"
          >
            Contact
          </NuxtLink>

          <div
            v-if="!navbarStore.isContactPage"
            class="nav__item action"
            data-name="menu"
            data-text="Mode"
          >
            <UIColorSwitch
              :is-mobile="isMobileActive"
              v-model="isLightMode"
              ref="colorSwitch"
            />
          </div>
        </div>

        <UINavFooter class="footer-wrapper">
          <template #social>
            <a
              href="https://www.flickr.com/photos/thomasthorstensson"
              target="_blank"
              data-name="menu"
              data-text="Flickr"
              class="social-icon action"
              aria-label="Flickr"
            >
              <Icon name="fa6-brands:flickr" />
            </a>
            <a
              href="https://bsky.app/profile/thorstensson.bsky.social"
              target="_blank"
              data-name="menu"
              data-text="Bluesky"
              class="social-icon action"
              aria-label="Bluesky"
            >
              <Icon name="fa6-brands:bluesky" />
            </a>
          </template>
          <template #contact>
            <a
              data-name="menu"
              class="contact action magnet"
              href="mailto:someone@example.com"
              >hello@thomasthorstensson.com</a
            >
          </template>
        </UINavFooter>
      </div>

      <div
        class="burger action"
        data-name="menu"
        @click="toggleMenu"
        :class="{
          'burger--anim': isMobileActive,
          'burger--disabled': isAnimating,
        }"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

/* This menu is a little overly complex and designy perhaps. I should probably
just use a simple modal and be done with it. */
<style lang="scss" scoped>
  .iconify {
    width: 24px;
    height: 24px;
  }
  .magnet {
    transition: transform 0.1s linear;
  }

  .modal-open {
    height: 100vh;
    overflow-y: hidden;
  }

  .nav-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    margin: auto;
    width: 100%;
    z-index: 999;
    overflow: hidden;
    font-family: $sans-ui;
    color: $secondary;
    height: 56px;
    z-index: 2000;
    background-color: $primary;

    &--no-blur {
      background-color: transparent;
    }

    @include this-and-above('lg') {
      background-color: rgba(24, 24, 27, 0.3);
      backdrop-filter: blur(10px);
      transition: backdrop-filter 0.3s ease, background-color 0.4s ease;

      .light-mode & {
        background-color: rgba(250, 250, 250, 0.3);
      }

      &.nav-wrapper--no-blur {
        backdrop-filter: blur(0px);
        background-color: unset;
      }
    }

    &--projects-open {
      background-color: unset !important;
    }

    &--contact-open {
      background-color: unset !important;

      .logo {
        color: $secondary-static !important;
      }

      @include this-and-above('md') {
        // Force text color on contact page for desktop nav items
        color: $secondary-static !important;

        .nav__item {
          color: $secondary-static !important;
        }

        @include this-and-above('lg') {
          backdrop-filter: blur(0px);
        }
      }
    }

    &--contact-burger-white {
      .burger span {
        background-color: $secondary-static;
      }
    }
  }

  .nav-wrapper__inner {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    margin: 0 $px-16-spacer;
    text-transform: none;
    top: 0px;
    transition: top 0.4s cubic-bezier(0, 0.55, 0.45, 1);

    &--moveup {
      top: -60px;
    }

    @include this-and-above('md') {
      margin: 0 $px-64-spacer;
    }
  }

  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1 1 auto;
    height: 100%;
  }

  .footer-wrapper {
    display: flex;
    flex-flow: column;
    position: absolute;
    bottom: $px-16-spacer;
    width: 80%;
    height: -moz-fit-content;
    align-items: flex-end;
  }

  .social-icon {
    display: inline-block;
    margin-right: 16px;
    color: $primary;
    transition: color 0.3s ease;

    &:hover {
      color: $accent1;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .logo {
    display: block;
    height: auto;
    /* Enhanced mobile focus/blur prevention */
    -webkit-tap-highlight-color: transparent !important;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    outline: none !important;

    &:focus,
    &:active {
      outline: none !important;
      -webkit-tap-highlight-color: transparent !important;
      filter: blur(0px) !important;
    }

    /* Force blur on touch end for mobile */
    &:focus-visible {
      outline: none !important;
    }
  }

  .nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    transition: left 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

    &--closed {
      .footer-wrapper {
        display: none;
      }
    }

    &--open {
      left: 0%;
      touch-action: none;
      -webkit-overflow-scrolling: none;
      overflow: hidden;
      overscroll-behavior: none;
      display: flex;
      justify-content: flex-end;
      padding-right: 60px;
      background-color: $secondary;
      color: $primary;
      opacity: 1;
    }

    &--closed {
      left: -100%;
      opacity: 1;
      background-color: $secondary;
      transition: left 0s;
    }

    &__list {
      position: absolute;
      top: 200px;
      right: 60px;
      padding: 0;
      list-style: none;
      width: -moz-fit-content;
      width: fit-content;
      text-align: right;

      a {
        margin-bottom: 1rem;
      }
    }

    &__item {
      display: block;
      position: relative;
      cursor: pointer;
      font-size: clamped(50px, 150px, 480px, 1920px);
      white-space: nowrap;
      line-height: 1.1;
      transition: color 0.3s;
      padding-right: 0px;
      color: $primary;
      font-weight: 700;
      font-variation-settings: 'wght' 700;

      &:hover {
        color: $accent1;
      }

      &--disabled {
        pointer-events: none;
        opacity: 0.5;
        cursor: default;
      }
    }

    &__item {
      &::before {
        content: '•';
        margin-left: -15px;
        font-size: 38px;
        color: inherit;
        bottom: -5px;
        position: relative;
        opacity: 0;
        transition: opacity 0.2s ease;
      }

      // Hide bullet for color switch (last item with action class)
      &:last-child.action::before,
      // Fallback for any action item with direct div child (color switch)
      &.action:has(> div)::before {
        display: none;
      }

      @include this-and-above('md') {
        font-size: 22px;
      }
    }

    &--link-active::before {
      opacity: 1;
    }

    /* Switch to desktop */
    @include this-and-above('md') {
      background-color: unset;
      transition: none;
      position: relative;
      width: initial;

      &--closed {
        left: unset;
        right: 0;
      }

      &__list {
        margin: 0;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 0;
        list-style: none;
        width: fit-content;

        a {
          margin-bottom: 0rem;
        }
      }

      &__item {
        display: inline-block;
        position: relative;
        margin: 0;
        /*FONT SIZE OF NAVBAR ITEMS DESKTOP, RETURNED AS REM*/
        font-size: clamped(18px, 20px, 480px, 1920px);
        line-height: unset;
        padding-right: 25px;
        color: $secondary;
        opacity: 1;
        transition: transform 0.1s linear;
        font-family: $sans-ui;
        font-weight: 500;
        font-variation-settings: 'wght' 500;
        -webkit-tap-highlight-color: transparent !important;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        outline: none !important;

        /* Lighter font weight in dark mode */
        .dark-mode & {
          font-family: $sans-ui;
        }

        &:hover {
          color: $accent2;
        }

        &:focus-visible {
          outline: none !important;
        }

        &:last-child {
          padding-right: 0;
        }

        &::before {
          content: '•';
          position: absolute;
          left: -8px;
          font-size: 14px;
          opacity: 0;
          transition: opacity 0.2s ease;
          margin-left: 0;
          bottom: -1px;
        }

        &.nav--link-active::before {
          opacity: 1;
        }
      }
    }
  }

  .burger {
    width: 25px;
    height: 25px;
    position: relative;
    transition: 0.1s;
    cursor: pointer;
    display: inline-block;

    /* Invisible larger touch area - keeps visual size small but improves touch target */
    &::before {
      content: '';
      position: absolute;
      top: -15px;
      left: -15px;
      right: -15px;
      bottom: -15px;
      /* Creates a 55x55px invisible touch area around the 25x25px visual icon */
    }

    span {
      width: 4px;
      height: 4px;
      background-color: $secondary;
      display: block;
      border-radius: 50%;
      position: absolute;
    }

    &:hover span {
      transform: scale(1.2);
      transition: 350ms cubic-bezier(0.8, 0.5, 0.2, 1.4);
    }

    span:nth-child(1) {
      left: 0;
      top: 0;
    }

    span:nth-child(2) {
      left: 10px;
      top: 0;
    }

    span:nth-child(3) {
      right: 0;
      top: 0;
    }

    span:nth-child(4) {
      left: 0;
      top: 10px;
    }

    span:nth-child(5) {
      position: absolute;
      left: 10px;
      top: 10px;
    }

    span:nth-child(6) {
      right: 0px;
      top: 10px;
    }

    span:nth-child(7) {
      left: 0px;
      bottom: 0px;
    }

    span:nth-child(8) {
      position: absolute;
      left: 10px;
      bottom: 0px;
    }

    span:nth-child(9) {
      right: 0px;
      bottom: 0px;
    }

    &--anim {
      transform: rotate(180deg);
      cursor: pointer;
      transition: 0.2s cubic-bezier(0.8, 0.5, 0.2, 1.4);

      span {
        background-color: $primary;
      }
    }

    &--anim span {
      border-radius: 50%;
      transition-delay: 200ms;
      transition: 0.5s cubic-bezier(0.8, 0.5, 0.2, 1.4);
    }

    &--anim span:nth-child(2) {
      left: 5px;
      top: 5px;
    }

    &--anim span:nth-child(4) {
      left: 5px;
      top: 15px;
    }

    &--anim span:nth-child(6) {
      right: 5px;
      top: 5px;
    }

    &--anim span:nth-child(8) {
      left: 15px;
      bottom: 5px;
    }

    &--disabled {
      pointer-events: none;
      opacity: 0.6;

      span {
        transition: none;
      }

      &:hover span {
        transform: none;
      }
    }

    /* Bubbles */
    @include this-and-above('md') {
      display: none;
    }
  }
</style>
