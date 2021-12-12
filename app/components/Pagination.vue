<template>
  <ul class="pagination">
    <li class="pagination-item" v-if="linksPagination">
      <NuxtLink  class="pagination-link" :to="prev" v-if="prev"><<</NuxtLink>
    </li>
    <li class="pagination-item" v-for="(item, index) in linksPagination" :key="index">
      <NuxtLink  class="pagination-link" :to="createUrl(item)">{{item}}</NuxtLink>
    </li>
    <li class="pagination-item" v-if="linksPagination">
      <NuxtLink  class="pagination-link" :to="next" v-if="next">>></NuxtLink>
    </li>
  </ul>
</template>

<script>
import global from "~/mixins/global";
export default {
  mixins: [global],
  props:{
    countPage: Number,
    countAll: String
  },
  data(){
    return{
      numberLinksPagination: 2,
      currentGroupLinksPagination: 0
    }
  },
  methods:{
    setCurrentGroupLinksPagination(){
      let currentNumberPage = Number(this.$route.query._page);

      this.arrLinksPagination.forEach((element, index) => {

        if(element.includes(currentNumberPage)){
          this.currentGroupLinksPagination = index
        }
      });
      
    },
    createUrl(pageNumber){
      let query = this.$route.query;
      let arrQuery = [];
      let newQuery = {};

      for (const key in query) {
        if (Object.hasOwnProperty.call(query, key)) {          
          newQuery[key] = query[key]
        }
      }

      newQuery._page = pageNumber;
      newQuery._limit = this.countPage;

      for (const key in newQuery) {
        if (Object.hasOwnProperty.call(newQuery, key)) {
          let element = '';
            element =  key + '=' + newQuery[key];

          arrQuery.push(element)
        }
      }

      return '?' + arrQuery.join('&');
    }
  },
  computed:{
    prev(){
      let url = null;
      let currentPage = this.$route.query._page;

      if(currentPage != 1){
        url = this.createUrl(currentPage - 1)
      }

      return url;
    },
    next(){
      let url = null;
      let currentPage = this.$route.query._page;

      if(currentPage != Math.ceil(this.countAll / this.countPage)){
        url = this.createUrl(currentPage * 1 + 1)
      }

      return url;
    },
     linksPagination(){
       this.setCurrentGroupLinksPagination()
       return  this.arrLinksPagination[this.currentGroupLinksPagination]
    },
    arrLinksPagination(){
      let lengthArr = Math.ceil(this.countAll / this.countPage);
      let indexGroupLinks = 0;
      let arr = [];
      let sliced_array = [];
      let array_size = this.numberLinksPagination;

      for (let index = 1; index <= lengthArr; index++) {
        arr.push(index);
      }

      for (let i = 0; i <arr.length; i += array_size) {
          sliced_array.push(arr.slice(i, i + array_size));
      }

      return  sliced_array
    }
  },
  watch:{
    $route(){
      this.setCurrentGroupLinksPagination()
    }
  }
}

</script>

<style lang='scss' scoped>
.pagination{
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  margin: 0 -5px;
  padding: 0;
  list-style: none;
  font-size: 1em;
}
.pagination-item{
  padding: 0;
  margin: 5px;
}
.pagination-link, .pagination-link:visited{
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 1.6em;
  line-height: 1;
  padding: .2em;
  border: .2em solid var(--gray);
  color: var(--black);
  background: transparent;
  transition: .3s;
  width: 2em;
  height: 2em;
  &:hover,
  &:focus,
  &.nuxt-link-exact-active{
    color: var(--white);
    background: var(--gray);
  }

}
</style>