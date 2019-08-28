<template>
  <div class="app">
    <div class="section section-intro">
      <div class="container">
        <div class="title en">Until next DODO</div>
        <div class="counter-container" v-if="isLoaded">
          <div class="counter counter-null en" v-if="remainDays === null">
            Coming Soon
          </div>
          <div class="counter counter-dday en" v-else>
            <div class="d-day" v-if="remainDays > 0">D-{{ remainDays }}</div>
            <div class="d-day" v-else>D-Day</div>
          </div>
        </div>
        <div class="subtitle en">DO <span class="highlight">What you want to</span> DO</div>

        <div class="buttons">
          <nuxt-link to="/" class="button-menu" :class="{selected: $route.path == '/'}">About</nuxt-link>
          <nuxt-link to="/poster" class="button-menu" :class="{selected: $route.path == '/poster'}">Poster</nuxt-link>
          <a :href="`https://brunch.co.kr/magazine/alwaysdodo`" class="button-menu" target="_blank">Interview</a>
          <nuxt-link to="/guide" class="button-menu" :class="{selected: $route.path == '/guide'}">Guide</nuxt-link>
        </div>

        <div class="buttons">
          <a class="button en" href="https://www.facebook.com/alwaysdodo" target="blank">
            <i class="ico-facebook"></i>
            <span class="label">Facebook</span>
          </a>
          <a class="button en" href="http://invite.alwaysdodo.com" target="blank">
            <i class="ico-slack"></i>
            <span class="label">Slack</span>
          </a>
          <a class="button en" href="https://photos.app.goo.gl/zN3ztUzmq9m4FMip7" target="blank">
            <i class="ico-gallery"></i>
            <span class="label">Gallery</span>
          </a>
          <a class="button en" href="https://github.com/alwaysdodo" target="blank">
            <i class="ico-github"></i>
            <span class="label">Github</span>
          </a>
          <a class="button en" href="mailto:hi@alwaysdodo.com">
            <i class="ico-mail"></i>
            <span class="label">Contact</span>
          </a>
        </div>
        <div class="submit" v-if="registerUrl">
          <a class="button" :href="registerUrl" target="_blank" ref="floatTrigger">참가신청</a>
        </div>
      </div>
    </div>

    <div class="section-body">
      <nuxt />
    </div>

    <transition name="floating" :duration="500" v-if="registerUrl">
      <a class="button button-floating" :href="registerUrl" target="_blank"  v-if="isDisplayFloating">참가신청</a>
    </transition>
  </div>
</template>
<script>
import * as moment from "moment"
import "moment-timezone"
import { mapActions, mapState } from "vuex"

export default {
  data() {
    return {
      isDisplayFloating: false,
    }
  },
  async mounted() {
    window.addEventListener("scroll", this.calculateFloating)
    window.addEventListener("resize", this.calculateFloating)
    this.calculateFloating()
    if (!this.$store.state.registries.isLoaded) {
      await this.refresh()
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.calculateFloating)
    window.removeEventListener("resize", this.calculateFloating)
  },
  computed: {
    ...mapState({
      registries: state => state.registries.nodes,
      isLoaded: state => state.registries.isLoaded,
    }),
    registerUrl() {
      const registerUrlReg = this.registries.find((registry) => registry.name === "register_url")
      return registerUrlReg ? registerUrlReg.value : undefined
    },
    remainDays() {
      const ddayReg = this.registries.find((registry) => registry.name === "dday")
      if (!ddayReg || !ddayReg.value) {
        return null
      }
      const dday = moment.tz(`${ddayReg.value} 19:30:00`, "Asia/Seoul").diff(new Date(), "day")
      return dday < 0 ? null : dday
    },
  },
  methods: {
    ...mapActions({
      refresh: 'registries/refresh'
    }),
    calculateFloating() {
      if (this.$refs.floatTrigger) {
        this.isDisplayFloating = this.$refs.floatTrigger.getBoundingClientRect().bottom < 0
      }
    },
  },
}
</script>
