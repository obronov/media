<template>
  <aside 
    class="page__sidebar"  
    :class="{page__sidebar_isMobile: !$device.isDesktop, page__sidebar_show: showSidebar}"
  >
    <AppButton class='btn-sidebar-close' v-if="!$device.isDesktop" :title="'Close'" @click="$emit('closeSidebar')">
      Close
    </AppButton>
    <slot></slot>
  </aside>
</template>

<script>

export default {
  props:{
    showSidebar: Boolean
  }
}

</script>

<style lang='scss' scoped>

</style>