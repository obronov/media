<template>
  <div>
    <GroupsList 
    :groupsList="groupsList"
    @editItem="editItem($event)"
    />
    <div class="btn-add-groups">
      <AppButton @click="$emit('click')" :title="'Add New Group'" class="btn-text">+ Add New Group</AppButton>
    </div>
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
.btn-add-groups{
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 2em 0 0;
}
</style>