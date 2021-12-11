<template>
  <div>
    <GroupsList 
    :groupsList="groupsList"
    @editItem="editItem($event)"
    />
    <div class="btn-add-groups"> 
      <AppButton @click="$emit('click')" :title="translate('add_new_group')" class="btn-text">+ {{translate('add_new_group')}}</AppButton>
    </div>
  </div>
</template>

<script>
import global from "~/mixins/global";
export default {
  mixins: [global],
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
.btn-add-groups{
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 2em 0 0;
}
</style>