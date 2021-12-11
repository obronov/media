<template>
  <div>
    <RolesMenu :rolesList="rolesList"/>
    <div class="btn-add-roles">
      <AppButton @click="$emit('click')" :title="translate('add_new_role')" class="btn-text">+ {{translate('add_new_role')}}</AppButton>
    </div>
  </div>  
</template>

<script>
import global from "~/mixins/global";
export default {
  mixins: [global],
  props:{
    rolesList: Array
  }
}

</script>

<style lang='scss' scoped>
.btn-add-roles{
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 2em 0 0;
}
</style>