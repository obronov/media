<template>
  <form class="search" method="POST" action="/">
    <input type="text" class="search-input" v-model="prompt" @input="$emit('getPrompt', prompt)">
    <button class="search-btn" type="button" title="search" @click="$emit('getResultSearch', prompt)">
      <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px">
      <path d="M21,3C11.6,3,4,10.6,4,20s7.6,17,17,17s17-7.6,17-17S30.4,3,21,3z M21,33c-7.2,0-13-5.8-13-13c0-7.2,5.8-13,13-13c7.2,0,13,5.8,13,13C34,27.2,28.2,33,21,33z"/>
      <path fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="6" d="M31.2 31.2L44.5 44.5"/>
    </svg>
    </button>
    <ul class="search-prompt" v-if="!isEmptyArr(promptList)">
      <li class="search-prompt__item" v-for="item in promptList" :key="item.id">
        <label class="search-prompt__label">
          <span>{{item.name}}</span>
          <input type="radio" :value="item.name" @change="useHint(item.name)">
        </label>
      </li>
    </ul>
  </form>
</template>

<script>
import global from "~/mixins/global";
export default {
  mixins: [global],
  props:{
    promptList: Array
  },
  data(){
    return{
      prompt: ''
    }
  },
  methods:{
    useHint(value){
      this.prompt = value;
      this.$emit('clearPrompt')
    }
  }
}

</script>

<style lang='scss' scoped>
.search{
  display: inline-grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0 .5em;
  font-size: 1rem;
  border: 0.3em solid var(--black);
  border-radius: 1em;
  align-items: center;
  padding: 0 0 0 1em;
  position: relative;
}
.search-btn{
  border: none;
  background: none;
  font-size: 1em;
  width: 2.5em;
  height: 2.5em;
  padding: 0 .5em;
  & svg{
    display: block;
    width: 100%;
    height: 100%;
  }
}
.search-input{
  font-size: 1.6em;
  line-height: 1;
  border: none;
  padding: 0;
}
.search-prompt{
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  background: var(--white);
  border: 0.3em solid var(--black);
}
.search-prompt__label{
  font-size: 1.6em;
  line-height: 1;
  padding: .5em;
  display: block;
  &:hover{
    background: var(--gray);
  }
}
</style>