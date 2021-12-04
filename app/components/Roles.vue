<template>
  <div>
    <RolesMenu :rolesList="rolesList"/>
    <div class="btn-add-roles">
      <AppButton @click="$emit('click')" :title="'Add New Role'" class="btn-text">+ Add New Role</AppButton>
    </div>
  </div>  
</template>

<script>

export default {
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