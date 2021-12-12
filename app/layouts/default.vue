<template>
  <div class="app">
    <Header />
    <nuxt/>


  </div>
</template>

<script>
import global from "~/mixins/global";
export default {
  mixins: [global],
  name: "default",
  data() {
    return {
      common: {}
    }
  },
  async fetch() {


  },
  watch:{
    $route(){
      this.$store.commit('setShowSidebar', false);
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
