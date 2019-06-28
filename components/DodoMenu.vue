<template>
<div class="buttons">
  <nuxt-link to="/about" class="button-menu" :class="{selected: $route.path == '/about' || $route.path == '/'}" >
    About
  </nuxt-link>
  <nuxt-link to="/poster" class="button-menu" :class="{selected: $route.path == '/poster'}" >
    Poster
  </nuxt-link>
  <a :href="`https://brunch.co.kr/magazine/alwaysdodo`" class="button-menu" target="_blank" >
    Interview
  </a>
  <nuxt-link to="/guide" class="button-menu" :class="{selected: $route.path == '/guide'}" >
    Guide
  </nuxt-link>
</div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>
