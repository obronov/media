<template>
  <div>
    <ul>
      <li v-for="(item, index) in groupsList" :key="`group${index}`">
        <GroupsListItem :item="item" @editItem="editItem($event)"/>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props:{
    groupsList: Array
  },
  methods:{
    editItem(item){
      console.log('item GroupsList', item)
      this.$emit("editItem", item)
    }
  }
}

</script>

<style lang='scss' scoped>

</style>