<template>
  <div>
    <GroupsList 
    :groupsList="groupsList"
    @editItem="editItem($event)"
    />
  </div>
</template>

<script>

export default {
  props:{
    groupsList: Array
  },
  methods:{
    editItem(item){
      console.log('item Groups', item)
      this.$emit("editItem", item)
    }
  }
}

</script>

<style lang='scss' scoped>

</style>