<template>
  <div class="roles">
    <p v-if="isEmptyArr(rolesList)" class="roles-empty-text">No roles </p>
    <ul v-else class="roles-list">
      <li class="roles-list__item" v-for="role in rolesList" :key="role.id">
        <RolesListItem :role="role" :hashtagsList="hashtagsList" @changeMark="$emit('changeMark', $event)"/>
      </li>
    </ul>
  </div>
</template>

<script>
import global from "~/mixins/global";
export default {
  mixins: [global],
  props:{
    rolesList:  Array,
    hashtagsList:  Array
  }
}

</script>

<style lang='scss' scoped>
.roles-empty-text{
  font-size: 1.6em;
}
.roles-list{
  padding: 0;
  margin: 0;
  list-style: none;
  margin: 3em 0;
}
.roles-list__item{
  padding: 1em;
  border-top: .2em solid var(--black);
  &:last-child{
    border-bottom: .2em solid var(--black);
  }
}
</style>