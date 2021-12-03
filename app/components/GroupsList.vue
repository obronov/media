<template>
  <div>
    <ul class="group-list">
      <li class="group-list__item" v-for="(item, index) in groupsList" :key="`group${index}`">
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
      this.$emit("editItem", item)
    }
  }
}

</script>

<style lang='scss' scoped>
.group-list{
  padding: 0;
  margin: 0;
  list-style: none;
}
.group-list__item{
  
}
</style>