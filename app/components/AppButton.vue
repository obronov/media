<template>
  <button class="btn" type='button' @click="$emit('click')">
    +
    <slot></slot>
  </button>
</template>

<script>

export default {

}

</script>

<style lang='scss' scoped>

</style>