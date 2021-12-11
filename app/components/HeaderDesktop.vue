<template>
  <div class="header-desktop container">
    <div class="header-desktop__title">{{translate('permission')}}</div>
    <AppButton @click="$store.dispatch('changeLang')" :title="translate('lang')" class="btn-text">{{translate('lang')}}</AppButton>
    <nav class='header-desktop__nav'>
      <ul class="nav-items" v-if="!isEmptyArr(menu)">
        <li class="nav-items__item" v-for="(item, index) in menu" :key="`nav${index}`">
          <NuxtLink class="nav-items__link" :to="{'name': item.alias}">{{item.name}}</NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import global from "~/mixins/global";
export default {
  mixins: [global],
  props:{
    menu: Array
  }
}

</script>

<style lang='scss' scoped>
.header-desktop{
  font-size: 1rem;
  padding: 2em 15px;
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-gap: 0 3em;
  align-items: center;
  border-bottom: .3em solid var(--black);
}
.header-desktop__title{
  font-family: var(--black);
  font-weight: bold;
  font-size: 4.8em;
  line-height: 1;
}
.nav-items{
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  margin: 0 -2em;
}
.nav-items__item{
  padding: 0;
  margin: 0 2em;
}
.nav-items__link, .nav-items__link:visited{
  font-weight: bold;
  text-decoration: none;
  color: var(--black);
  font-size: 2.4em;
  line-height: 1;
  display: inline-block;
  border-bottom: .3em solid transparent;
  padding: 0 0 .15em;
  text-transform: capitalize;
  transition: .3s;
  &.nuxt-link-active,
  &:hover,
  &:focus{
    border-color: var(--black);
  }
}
.btn-lang{

}
@media screen and (max-width: 1200px){
  .header-desktop{
    font-size: .8rem;
  }
}
@media screen and (max-width: 992px){
  .header-desktop{
    font-size: .6rem;
  }
}

</style>