<template>
  <div class="header-mobile container">
    <div class="header-mobile__title">{{translate('permission')}}</div>
    <AppButton @click="$store.dispatch('changeLang')" :title="translate('lang')" class="btn-text">{{translate('lang')}}</AppButton>
    <button class="header-mobile__btnMenu" type="button"  v-if="!isEmptyArr(menu)" @click="showMenu = !showMenu">
      <svg v-if="!showMenu" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="7" width="22.8862" height="2.44443" rx="1"/>
        <rect x="4" y="12.7786" width="22.8862" height="2.44443" rx="1"/>
        <rect x="4" y="18.5555" width="22.8862" height="2.44443" rx="1"/>
      </svg>
      <svg v-else width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.6485 22.9883L16.6563 15.0005L24.6485 7.07142C25.049 6.60753 25.0273 5.91139 24.5987 5.47368C24.1701 5.03597 23.479 5.00427 23.0127 5.40091L14.9971 13.2711L7.12168 5.34209C6.66594 4.88597 5.9299 4.88597 5.47416 5.34209C5.25295 5.56298 5.12853 5.86367 5.12853 6.17735C5.12853 6.49102 5.25295 6.79171 5.47416 7.0126L13.3379 14.9299L5.34563 22.8471C5.12442 23.068 5 23.3687 5 23.6824C5 23.9961 5.12442 24.2968 5.34563 24.5177C5.56614 24.7379 5.86465 24.8606 6.17523 24.8588C6.48011 24.8607 6.77363 24.7424 6.99315 24.5294L14.9971 16.5886L23.0127 24.6588C23.2332 24.879 23.5317 25.0018 23.8423 25C24.1488 24.9987 24.4425 24.8762 24.6602 24.6588C24.8798 24.4364 25.0022 24.1348 25 23.8211C24.9978 23.5074 24.8712 23.2076 24.6485 22.9883Z"/>
      </svg>
    </button>
    <nav class='header-mobile__nav' :class="{'active': showMenu}">
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
  },
  data(){
    return{
      showMenu: false
    }
  },
  watch:{
    $route(){
      this.showMenu = false;
    }
  }
}

</script>

<style lang='scss' scoped>
.header-mobile{
  font-size: .5rem;
  padding: 2em 15px;
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-gap: 0 3em;
  align-items: center;
  border-bottom: .3em solid var(--black);
  position: relative;
}
.header-mobile__title{
  font-family: var(--black);
  font-weight: bold;
  font-size: 4.8em;
  line-height: 1;
}
.header-mobile__btnMenu{
  font-size: 2em;
  padding: 0;
  border: none;
  background: none;
  width: 3em;
  height: 3em;
  justify-self: end;
  & svg{
    display: block;
    width: 100%;
    height: 100%;
    fill: var(--black);
    transition: .3s;
  }
  &:hover svg,
  &:focus svg {
    fill: var(--gray)
  }
}
.header-mobile__nav{
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--black);
  max-width: 30em;
  width: 100%;
  padding: 3em;
  transition: .3s;
  opacity: 0;
  visibility: hidden;
  z-index: 20;
  &.active{
    opacity: 1;
    visibility: visible;
  }
}
.nav-items{
  padding: 0;
  margin: 0;
  list-style: none;
}
.nav-items__item{
  padding: 0;
  margin: 0 0 3em;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  &:last-child{
    margin: 0;
  }
}
.nav-items__link, .nav-items__link:visited{
  font-weight: bold;
  text-decoration: none;
  color: var(--white);
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
    border-color: var(--white);
  }
}
@media screen and (min-width: 768px) {
  .header-mobile{
    font-size: .7rem;
  }
}
@media screen and (min-width: 992px) {
  .header-mobile{
    font-size: .9rem;
  }
}
@media screen and (min-width: 1024px) {
  .header-mobile{
    font-size: 1rem;
  }
}
</style>