<template>
  <button class="btn" type='button' @click="$emit('click')" :title="title">
    +
    <slot></slot>
  </button>
</template>

<script>

export default {
  props:{
    title: String
  }
}

</script>

<style lang='scss' scoped>

</style>