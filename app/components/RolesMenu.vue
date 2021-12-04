<template>
  <ul class="role-list">
    <li class="role-list__item" v-for="role in rolesList" :key="role.id">
      <NuxtLink 
        class="item-role__name"
        :to="{query: { role_id: role.id }}"
      >
        <span class="item-role__name-text">
          {{role.name}}
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script>

export default {
  props:{
    rolesList: Array
  }
}

</script>

<style lang='scss' scoped>
.role-list{
  padding: 0;
  margin: 0;
  list-style: none;
}
.item-role__name{
  font-size: 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0 1em;
  padding: 1.3em 2em;
  background: var(--gray);
  border: .3em solid var(--gray);
  margin: 0 -.4em .4em 0;
  text-decoration: none;
  &.nuxt-link-exact-active{
    position: relative;
    border: .3em solid var(--black);
    border-right: .3em solid var(--white);
    background: var(--white);
    & .item-role__name{
      color: var(--black);
    }
  }
  & .item-role__name-text{
    font-size: 1.6em;
    line-height: 1.1;
    
  }
}
</style>