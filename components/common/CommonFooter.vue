<script setup lang="ts">
import { useHaikuStore } from '~/store/useHaikuStore';

const store = useHaikuStore()
const random = ref("")

onMounted(() => {
  random.value = store.data?.haikus[Math.floor(Math.random() * 2)].haiku
})
</script>

<template>
  <footer class="footer-wrapper">
    <div class="footer">

      <div class="footer__col1">
        <div>
          <h1>Let's work together</h1>
          <p class="email action" data-name="menu"><a href="mailto:hello@thomasjt.com" data-name="menu"
              class="action">hello@thomasjt.com</a>
          </p>
        </div>
      </div>

      <div class="break"></div>

      <div class="footer__col2">
        <div>
          <h4>Explore</h4>
          <p>
            <NuxtLink to="/" data-name="menu" class="action">Works</NuxtLink>
          </p>
          <p>
            <NuxtLink to="/" data-name="menu" class="action">Photography</NuxtLink>
          </p>
          <p>
            <NuxtLink to="/" data-name="menu" class="action">About</NuxtLink>
          </p>
          <p>
            <NuxtLink to="/" data-name="menu" class="action">Contact</NuxtLink>
          </p>
        </div>

        <div>
          <h4>Haiku</h4>
          <pre><p>{{ random }}</p></pre>
        </div>

        <div>
          <h4>Socials</h4>
          <p>
            <NuxtLink to="https://github.com/thorstensson" target="_blank" data-name="menu" class="action">GitHub
            </NuxtLink>
          </p>
          <p>
            <NuxtLink to="https://thomasthorstensson.tumblr.com/" target="_blank" data-name="menu" class="action">Tumblr
            </NuxtLink>
          </p>
          <p>
            <NuxtLink to="https://www.goodreads.com/user/show/25619759-thomas-thorstensson" target="_blank"
              data-name="menu" class="action">Goodreads</NuxtLink>
          </p>
        </div>
      </div>

    </div>
  </footer>
</template>

<style lang="scss" scoped>
h1 {
  color: $accent1;
}

/* Not prepared to make hover color global yet */
p a:hover {
  color: $accent1;
}

pre {
  font-family: $sans-text;
}

.email {
  margin-top: 0;
  padding-top: 0;
  font-size: clamped(32px, 60px, 380px, 1920px);
  border-bottom: 2px solid $accent2;
}

.footer-wrapper {
  position: absolute;
  margin-top: auto;
  width: 100%;
  padding: 40px $sm-spacer;

  @include this-and-above("sm") {
    padding: 60px $md-spacer;
  }
}

.footer::before {
  background-color: $secondary;
  top: 0;
  content: '';
  display: block;
  height: 2px;
  left: 50%;
  position: absolute;
  transform: translate(-50%, 0);
  width: 50%;
}

.footer {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  min-height: fit-content;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  font-family: $sans-text;
  color: $secondary;
  font-size: clamped(12px, 18px, 380px, 1920px);

  row-gap: 30px;

  @include this-and-above("lg") {
    row-gap: 0;
  }
}

.footer__col2 {
  display: flex;
  gap: 20px;
  align-self: flex-end;
  justify-content: space-between;
  flex-basis: 100%;

  @include this-and-above("md") {
    gap: 50px;
  }

  @include this-and-above("lg") {
    flex-basis: auto;
    justify-content: unset;
  }
}

.break {
  flex-basis: 100%;
  height: 0;

  @include this-and-above("lg") {
    display: none;
  }
}
</style>
