<script setup lang="ts">
import SplitType from "split-type"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutStore } from "~/store/useLayoutStore"

// Footer uses layout store
const store = useLayoutStore()
const { $gsap } = useNuxtApp()
const route = useRoute()

let sections:any

onMounted(() => {
  $gsap.registerPlugin(ScrollTrigger)
  sections = $gsap.utils.toArray(".splitme")
})

watch(route, value => {

  sections.forEach((sec: any) => {
    const splitTxt = new SplitType(sec, { types: "words" })
    $gsap.from(splitTxt.words, {
      autoAlpha: 0,
      y: +20,
      scrollTrigger: {
        trigger: sec,
        start: "bottom bottom",
        scrub: false,
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      },
      transformOrigin: "top",
      stagger: 0.1,
      duration: 0.2,
    })
  })

})

</script>

<template>

  <div class="footer">
    <div class="footer__col1">
      <section class="footer__contact">
        <div class="footer__contact__title splitme">
          {{ store.data?.contact?.emailTitle }}
        </div>
        <div class="splitme">{{ store.data?.contact?.email }}</div>
      </section>

      <section class="footer__address">
        <div class="footer__address__title splitme">
          {{ store.data?.contact?.addressTitle }}
        </div>
        <div class="splitme">{{ store.data?.contact?.address }}</div>
      </section>
    </div>

    <div class="footer__col2">
      <section class="footer__social">
        <div class="footer__social__title splitme">Social</div>
        <div v-for="social in store.data?.socials" :key="social.id">
          <NuxtLink :to="social.socialURL as string" rel="noopener" target="_blank">
            <div class="splitme">{{ social.name }}</div>
          </NuxtLink>
        </div>
      </section>
    </div>

    <div class="footer__col3">
      <div class="intro splitme">{{ store.data?.form?.formIntro }}</div>
      <MailFormW3 />
    </div>

    <div class="made">Made by Thomas</div>

  </div>
</template>

<style lang="scss" scoped>
.splitme {
  -webkit-font-kerning: none;
  font-kerning: none;
}

section {
  margin-bottom: 100px;
}

.intro {
  max-width: 400px;
  margin-bottom: 50px;
  font-size: 20px;
  font-family: $sans-text;
  color: $accent2;
}

.made {
  align-self: flex-end;
  margin: 0 20px 20px 0;
  white-space: nowrap;
  text-align: right;
}

.footer {
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  padding-top: 100px;
  padding: 100px 20px 0 20px;
  min-height: 600px;
  font-family: $sans-text;
  color: $accent1;
  font-size: 15px;
  color: primary;
  background-color: $secondary;

  &__contact {
    &__title {
      font-family: $serif-head;
      font-size: 16px;
      color: $accent2;
    }
  }

  &__address {
    &__title {
      font-family: $serif-head;
      font-size: 16px;
      color: $accent2;
    }
  }

  &__social {
    &__title {
      font-family: $serif-head;
      font-size: 16px;
      color: $accent2;
    }
  }

  &__col1 {
    flex-flow: column;
  }

  &__col2 {
    margin-right: 0%;

    @include this-and-above("md") {
      flex-wrap: nowrap;
    }

    @include this-and-above("lg") {
      margin-right: 20%;
    }

    @include this-and-above("xl") {
      margin-right: 33%;
    }
  }

  &__col3 {
    flex-grow: 1;
  }
}
</style>
