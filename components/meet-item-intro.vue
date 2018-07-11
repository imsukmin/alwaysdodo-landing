<template>
  <div class="intro" v-if="contents">
    <h3>
      <a id="user-content-일시" class="anchor" aria-hidden="true" href="#일시">
        <MeetItemIntroSvg />
      </a>일시
    </h3>
    <p>{{ contents.date }}</p>
    <h3>
      <a id="user-content-장소--참가비" class="anchor" aria-hidden="true" href="#장소--참가비">
        <MeetItemIntroSvg />
      </a>장소 / 참가비
    </h3>
    <p>{{ contents.placeAndFee }}</p>
    <h3>
      <a id="user-content-참여자" class="anchor" aria-hidden="true" href="#참여자">
        <MeetItemIntroSvg />
      </a>참여자({{ this.getParticipatnsCount() | suffix }})
    </h3>
    <p>{{ contents.participants }}</p>
  </div>
</template>

<script>
import MeetItemIntroSvg from '~/components/meet-item-intro-svg.vue';

export default {
  props: {
    contents: Object
  },
  components: {
    MeetItemIntroSvg,
  },
  filters: {
    suffix (value) {
      return (parseInt(value) !== NaN && parseInt(value) > 0) ?
        `${value}명` :
        value
    }
  },
  methods: {
    getParticipatnsCount () {
      const splitedParticipants = this.contents.participants.split(', ')
      return splitedParticipants.length === 1 ? 'Not yet' : splitedParticipants.length
    }
  },
}
</script>
