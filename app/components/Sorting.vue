<template>
  <select 
      name="sort" 
      value="" 
      @change="onChange($event.target.value)"
      class="control-input"
    >
    <option 
      v-for="(item, index) in sortList" 
      :key="index"
      :value="item.id"
    >Show {{item.name}}</option>
  </select>
</template>

<script>

export default {
  props:{
    sortList: Array
  },
  methods:{
    onChange(value){
      this.$emit('onSort', value)
    }
  }
}

</script>

<style lang='scss' scoped>
.control-input{
  padding: 0.18em 0.5em;
  font-size: 1.6em;
  line-height: 1;
  border: .187em solid var(--black);
  background: var(--white);
  border-radius: .625em;
}
</style>