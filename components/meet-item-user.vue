<template>
  <div class="user" v-if="user && meetDate">
    <div class="name">{{ user.name }}</div>
    <ul class="works">
      <MeetItemUserWork v-for="work in user.works"
        :work="work"
        :meetDate="meetDate"
        :userBody="user.body"
        :userId="user.id"
        :key="work" />
    </ul>
  </div>
</template>

<script>
import MeetItemUserWork from '~/components/meet-item-user-work.vue'

export default {
  components: {
    MeetItemUserWork,
  },
  props: {
    user: Object,
    meetDate: String,
  },
}
</script>
