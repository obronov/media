<template>
  <div class="welcome">
    <h1 class="welcome__title">Welcome to the site</h1>
    <NuxtLink class="btn btn-login" :to="'/groups'">Login</NuxtLink>
  </div>
</template>

<script>

export default {

}

</script>

<style lang='scss' scoped>
.welcome{
  font-size: 1em;
  border-radius: 1em;
  background: var(--white);
  padding: 5em;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  margin: 5px;
}
.welcome__title{
  font-size: 5em;
  margin: 0 0 .6em;
  text-align: center;
}
.btn-login{
  padding: .5em 2em ;
  border-radius: 1em;
  margin: 0 auto;
}

</style>