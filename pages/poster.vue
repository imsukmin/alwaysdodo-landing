<template>
  <div class="page-poster">
    <div class="container">
      <div class="subject">Poster</div>
      <div class="meets" v-if="isLoaded">
        <div v-for="(meet, index) in meets" :key="index"  class="meet" :class="{active: index === 0}">
          <div class="image"><img :src="meet.image" /></div>
          <div class="title">{{ meet.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  computed: {
    ...mapState({
      registries: state => state.registries.nodes,
      isLoaded: state => state.registries.isLoaded,
    }),
    meets() {
      return this.registries
        .filter((registry) => registry.name === "meets[]")
        .sort((a, b) => {
          if (a.id == b.id) {
            return 0
          }
          return a.id < b.id ? 1 : -1
        })
        .map(registry => registry.value)
    },
  },
}
</script>
