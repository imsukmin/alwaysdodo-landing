<template>
<div class="page-poster"> 
  <div class="container">
    <div class="subject">Poster</div>
    <div class="meets">
      <div v-for="(meet, index) in meets" :key="index"  class="meet" :class="{active: index === 0}">
        <div class="image"><img :src="meet.image" /></div>
        <div class="title">{{ meet.title }}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['meets'],
  data() {
    return {
    }
  }
}
</script>
