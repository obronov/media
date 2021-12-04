<template>
  <div class="page page_main">
    <Welcome/>
  </div>
</template>

<script>
import global from "~/mixins/global";
export default {
  mixins: [global],
  layout: 'mainPage'

}
</script>
<style lang='scss' scoped>
.page_main{
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>