<template>
  <header class="header">
    <HeaderDesktop v-if="$device.isDesktop" :menu="menu[$store.state.lang]"/>
    <HeaderMobile v-if="!$device.isDesktop" :menu="menu[$store.state.lang]"/>
  </header>
</template>

<script>

export default {
  data(){
    return{
      menu:{
        'ru':[
          {
            "name": "Группы",
            "alias": "groups",
          },
          {
            "name": "Роли",
            "alias": "roles",
          }
        ],
        'en':[
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
}

</script>

<style lang='scss' scoped>

</style>