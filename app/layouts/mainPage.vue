<template>
  <div class="app">
    <nuxt/>
  </div>
</template>

<script>
import global from "~/mixins/global";
export default {
  mixins: [global],
  name: "mainPage",
  data() {
    return {
      common: {}
    }
  },
  async fetch() {


  },
  watch:{
    $route(){
      
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
