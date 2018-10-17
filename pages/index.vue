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
        <div class="description">Do what you want to Do! 두두는 미루고 미루던 개인 프로젝트를 끝내기 위한 12시간 해커톤입니다. 두두는 디자이너와 개발자가 해야지 해야지 하다가 시작도 못한 개인 프로젝트를 끝내기 위해 밤을 샜던 3월의 어느 날 시작되었습니다. 개인 블로그, 사이드 프로젝트, 외주 작업, 스터디 등 바쁜 일상에 치여 미루던 일들 누구나 하나쯤은 있잖아요? 구체적이고 완벽한 결과물, 끝내야겠다는 강력한 의지는 필요없습니다. 한 달에 열두시간, 미루던 일 하나 끝내는 해커톤 두두와 함께해요-!</div>
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
      <div class="container">
        <div class="meets">
          <div v-for="(meet, index) in meets" :key="index"  class="meet" :class="{active: index === 0}">
            <div class="image"><img :src="meet.image" /></div>
            <div class="title">{{ meet.title }}</div>
          </div>
        </div>
      </div>
    </div>

    <transition name="floating" :duration="500">
      <a class="button button-floating" v-if="isDisplayFloating">참가신청</a>
    </transition>
  </div>
</template>
<script>
  import * as moment from "moment"
  import "moment-timezone"

  export default {
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
        this.isDisplayFloating = this.$refs.floatTrigger.getBoundingClientRect().bottom < 0
      },
    },
  }
</script>
