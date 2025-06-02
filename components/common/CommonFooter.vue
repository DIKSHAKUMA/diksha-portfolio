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

      <div class="col">
        <div>
          <h2>Navigation</h2>
          <p>
            <NuxtLink to="/works" data-name="menu" class="action">Works</NuxtLink>
          </p>
          <p>
            <NuxtLink to="/photography" data-name="menu" class="action">Photography</NuxtLink>
          </p>
          <p>
            <NuxtLink to="/about" data-name="menu" class="action">About</NuxtLink>
          </p>
          <p>
            <NuxtLink to="/contact" data-name="menu" class="action">Contact</NuxtLink>
          </p>
        </div>
      </div>

      <div class="col">
        <div>
          <h2>Contact</h2>
          <p><a href="mailto:hello@thomasjt.com" data-name="menu" class="action">hello@thomasjt.com</a></p>
          <p>
            <NuxtLink to="https://discordapp.com/users/1326292436187611199" target="_blank" data-name="menu"
              class="action">Discord</NuxtLink>
          </p>
        </div>
      </div>

      <div class="break"></div>

      <div class="col">
        <div>
          <h2>Haiku</h2>
          <pre><p>{{ random }}</p></pre>
        </div>
      </div>

      <div class="col">
        <div>
          <h2>Association</h2>
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
h2 {
  color: $accent2;
}

/* Not prepared to make hover color global yet */
p a:hover {
  color: $accent2;
}

pre {
  font-family: $sans-text;
}

.footer-wrapper {
  position: absolute;
  margin-top: auto;
  width: 100%;
  background-color: $accent1;
  padding: 20px 100px 30px 100px;
}

.footer {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  min-height: fit-content;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  font-family: $sans-text;
  color: $secondary;
  font-size: 0.875rem;
}

.break {
  flex-basis: 100%;
  height: 0;

  @include this-and-above("md") {
    display: none;
  }
}

.col {
  width: 150px;

  @include this-and-above("md") {
    width: unset
  }
}
</style>
