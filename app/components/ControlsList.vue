<template>
  <div>
      <div class="form-item" v-for="(item, index) in controls" :key="index">
        <ControlsListText 
          v-if="item.type == 'text'" 
          :options="item" 
          @oninput="$emit('oninputtext', $event)"
        />
        <ControlsListSelect 
          v-if="item.type == 'select'" 
          :options="item"
          @oninput="$emit('oninputtext', $event)"
        />
      </div>  
  </div>
</template>

<script>

export default {
  props:{
    controls: Array
  }
}

</script>

<style lang='scss' scoped>
.form-item{
  margin: 0 0 3em;
  &:last-child{
    margin: 0;
  }
}
</style>
