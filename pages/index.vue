<template>
  <div>

    <div class="section section-header en">
      <div class="container">
        <div class="logo"></div>

        <!-- <a class="button button-text">참가신청</a> -->
        <a class="button button-icon" href="mailto:we.are.dodo.2018@gmail.com"></a>
      </div>
    </div>

    <div class="section section-intro">
      <div class="container">
        <div class="title en">Until next DODO</div>
        <div class="counter counter-dday en" v-if="dday">
          <div class="d-day" v-if="dday !== null">D-{{ dday }}</div>
          <div class="d-day" v-else-if="dday === 0">D-Day</div>
          <div class="d-day" v-else>지.남</div>
        </div>
        <div class="counter counter-null en" v-else>
          Coming Soon
        </div>
        <div class="description en">DO <span class="span">What you want to</span> DO</div>
        <div class="buttons">
          <a class="button button-slack en" href="http://alwaysdodo.slack.com" target="blank">Slack</a>
          <a class="button button-gallery en" href="https://photos.app.goo.gl/HfCLGo3SB2F572yj6" target="blank">Gallery</a>
          <a class="button button-github en" href="https://github.com/alwaysdodo" target="blank">Github</a>
        </div>
      </div>
    </div>

    <div class="section-body">
      <div class="container">
        <div class="meets">
          <MeetItem v-for="(meet, index) in meets" :key="meet.date" :meet="meet" :opened="index === 0" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as moment from "moment"
  import "moment-timezone"
  import MeetItem from "~/components/meet-item.vue"

  const meets = require("~/assets/json/meets.json").meets

  const NEXT_DODO_DATE = moment.tz("2018-07-20 19:30:00", "Asia/Seoul")

  export default {
    components: {
      MeetItem,
    },
    data() {
      return {
        meets: meets.sort((a, b) => {
          if (a.date === b.date) return 0
          return a.date < b.date ? 1 : -1
        }),
        dday: NEXT_DODO_DATE ? NEXT_DODO_DATE.diff(new Date(), "day") : null,
      }
    },
    mounted() {
      this.calculateDday()
    },
    methods: {
      calculateDday() {
        this.dday = NEXT_DODO_DATE ? NEXT_DODO_DATE.diff(new Date(), "day") : null
      },
    }
  }
</script>