<template>
  <div class="role">
    <label class="role-marker">
      <input 
      class="role-marker__input" 
      type="checkbox" 
      :checked="role.mark"
      @change="changeMark(role)">
      <span class="role-marker__icon"></span>
    </label>
    <div class="role__name">{{role.name}}</div>
    <div class="btn role__btn-hashtags">{{hashtags}}</div>
  </div>
</template>

<script>
import global from "~/mixins/global";
export default {
  mixins: [global],
  props:{
    role:  Object,
    hashtagsList:  Array
  },
  methods:{
    changeMark(role){
      role.mark = !role.mark;
      this.$emit('changeMark', role)
    }
  },
  computed:{
    hashtags(){
      let hashtag = '';
      try {
        this.hashtagsList.forEach(element => {
          if(element.id == this.role.hashtags){
            hashtag = element.name;
          }
        });
      } catch (error) {
        console.log(error)
      }
      return hashtag
    }
  }
}

</script>

<style lang='scss' scoped>
.role{
  font-size: 1em;
  display: inline-grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 0 2em;
  align-items: center;
}
.role__name{
  font-size: 1.6em;
  line-height: 1;
  color: var(--black);
}
.role__btn-hashtags{
  font-size: 1.2em;
  padding: .5em 1em;
  display: inline-block;
  background: var(--gray);
  color: var(--white);
}
.role-marker{
  display: block;
  width: 1em;
  height: 1em;
  border: 1px solid var(--black);
  background: var(--white);
  border-radius: .2em;
  position: relative;
}
.role-marker__icon{
  content: '';
  display: block;
  width: calc(100% - .2em);
  height: calc(100% - .2em);
  background: var(--white);
  transition: .3s;
  position: absolute;
  top: .1em;
  left: .1em;
}
.role-marker__input:checked + .role-marker__icon{
  background: var(--gray);
}
</style>