<template>
  <div class="app">
    <div class="section section-intro">
      <div class="container">
        <div class="title en">Until next DODO</div>
        <div class="counter-container">
          <div class="counter counter-null en" v-if="remainDays === null || (remainDays !== null && remainDays < 0)">
            Coming Soon
          </div>
          <div class="counter counter-dday en" v-else>
            <div class="d-day" v-if="remainDays > 0">D-{{ remainDays }}</div>
            <div class="d-day" v-else>D-Day</div>
          </div>
        </div>
        <div class="subtitle en">DO <span class="highlight">What you want to</span> DO</div>
        <dodo-menu/>
        <div class="buttons">
          <a class="button en" href="https://www.facebook.com/alwaysdodo" target="blank">
            <i class="ico-facebook"></i>
            <span class="label">Facebook</span>
          </a>
          <a class="button en" href="http://invite.alwaysdodo.com" target="blank">
            <i class="ico-slack"></i>
            <span class="label">Slack</span>
          </a>
          <a class="button en" href="https://photos.app.goo.gl/HfCLGo3SB2F572yj6" target="blank">
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
      <about/>
    </div>

    <transition name="floating" :duration="500" v-if="registerUrl">
      <a class="button button-floating" :href="registerUrl" target="_blank"  v-if="isDisplayFloating">참가신청</a>
    </transition>
  </div>
</template>
<script>
  import * as moment from "moment"
  import "moment-timezone"
  import DodoMenu from "./../components/DodoMenu.vue"
  import About from "./../components/AboutLayout.vue"

  export default {
    components: {
      DodoMenu, // 사용 할 땐 CamelCase 에서 camel-case 로 사용 가능 하다
      About
    },
    async asyncData({app: {$axios}}) {
      const response = await $axios.get("/registries")
      const registries = response.data.registries || []

      const ddayReg = registries.find((registry) => registry.name === "dday")
      const registerUrlReg = registries.find((registry) => registry.name === "register_url")
      return {
        dday: ddayReg ? ddayReg.value : undefined,
        registerUrl: registerUrlReg ? registerUrlReg.value : undefined,
        meets: registries
          .filter((registry) => registry.name === "meets[]")
          .sort((a, b) => {
            if (a.id == b.id) {
              return 0
            }
            return a.id < b.id ? 1 : -1
          })
          .map(registry => registry.value),
      }
    },
    data() {
      return {
        isDisplayFloating: false,
      }
    },
    mounted() {
      window.addEventListener("scroll", this.calculateFloating)
      window.addEventListener("resize", this.calculateFloating)
      this.calculateFloating()
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.calculateFloating)
      window.removeEventListener("resize", this.calculateFloating)
    },
    computed: {
      remainDays() {
        if (this.dday) {
          return moment.tz(`${this.dday} 19:30:00`, "Asia/Seoul").diff(new Date(), "day")
        }
        return null
      },
    },
    methods: {
      calculateFloating() {
        if (this.$refs.floatTrigger) {
          this.isDisplayFloating = this.$refs.floatTrigger.getBoundingClientRect().bottom < 0
        }
      },
    },
  }
</script>
