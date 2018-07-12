<template>
  <div class="meet" :class="{toggle: isOpened}">
    <div class="header" @click="isOpened = !isOpened">
      <span class="title en">{{ meet.date }}</span>
      <span class="icon icon-close"></span>
    </div>
    <transition name="toggle">
      <div class="body" v-if="isOpened">
        <div class="intro" v-html="meet.contents" />
        <div class="users">
          <MeetItemUser v-for="user in meet.users" :user="user" :meetDate="meet.date" :key="user.id" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MeetItemUser from "~/components/meet-item-user.vue"

export default {
  components: {
    MeetItemUser
  },
  props: {
    meet: null,
    opened: Boolean,
  },
  data() {
    return {
      isOpened: this.opened,
    }
  },
}
</script>
