<template>
  <header class="header">
    <HeaderDesktop v-if="$device.isDesktop" :menu="menu"/>
    <HeaderMobile v-if="!$device.isDesktop" :menu="menu"/>
  </header>
</template>

<script>

export default {
  data(){
    return{
      menu:[
        {
          "name": "groups",
          "alias": "groups",
        },
        {
          "name": "roles",
          "alias": "roles",
        }
      ]
    }
  }
}

</script>

<style lang='scss' scoped>

</style>