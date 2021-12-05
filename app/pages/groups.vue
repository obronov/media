<template>
  <div class="page container">
    <aside class="page__sidebar">
      <Groups 
        class="groups"
        v-if="!isEmptyArr(groupsList)" 
        :groupsList="groupsList"
        @editItem="editGroup($event)"
        @click="addGroup()"
      />
    </aside>
    <main class="page__main">
      <header class="page-header">
        <h1 class="page-title">Roles</h1>
        <Search 
        @getPrompt="getPrompt($event)" 
        @getResultSearch="addGetParams('q', $event)" 
        :promptList="promptList"
        @clearPrompt="promptList = null"
        />
        <div class="sort" v-if="!isEmptyArr(sortList)">
          <Sorting :sortList="sortList" :currentValue="currentSortingValue" @onSort="setQuerySorting($event)"/>
        </div>
      </header>
      <RolesList  :rolesList="rolesList" :hashtagsList="hashtagsList" @changeMark="changeMarkRole($event)"/>
    </main>
  </div>
</template>

<script>
import global from "~/mixins/global";
export default {
  middleware:['redirectToGroup'],  
  mixins: [global],
  data(){
    return{
      promptList: null,
      groupsList: null,
      hashtagsList: null,
      rolesList: []
    }
  },
  async fetch(){

    this.hashtagsList = await this.fetchData(process.env.fakeUrl + `hashtags`);

    this.groupsList = await this.fetchData(process.env.fakeUrl + `groups`);

    this.rolesList = await this.fetchData(process.env.fakeUrl + `roles${this.parseGetParams()}`);

  },
  methods:{
    deleteGetParams(arrKeys){
      let query = this.$route.query;
      let newQuery = {};

      for (const key in query) {
        if (Object.hasOwnProperty.call(query, key)) {
          if(!arrKeys.includes(key)){
            newQuery[key] = query[key]
          }
        }
      }

      this.$router.push({ query: newQuery});

      let promise = new Promise((resolve, reject)=> {
        resolve(newQuery)
        reject(new Error())
      });

      return promise
    },
    addGetParams(getKey, getValue){
      let query = this.$route.query;
      let newQuery = {};

      for (const key in query) {
        if (Object.hasOwnProperty.call(query, key)) {
          newQuery[key] = query[key]
        }
      }

      newQuery[getKey] = getValue

      this.$router.push({ query: newQuery});
    },
    parseGetParams(){
      let query = this.$route.query;
      let arrQuery = []

      function updateGetSorting(value){
        let result = '';

        if(value == 'all'){
          result = 'sorting=all';
        }else if(value == 'marked'){
          result = 'mark=' + true;
        }else{
          result = 'hashtags=' + value;
        }

        return result
      }

      for (const key in query) {
        if (Object.hasOwnProperty.call(query, key)) {
          let element = '';
          if(key == 'sorting'){
            element = updateGetSorting(query[key])
          }else{
            element =  key + '=' + query[key];
          }
          
          arrQuery.push(element)
        }
      }

      return '?' + arrQuery.join('&');
    },
    async setQuerySorting(valueSorting){
      let sort = {}
      
      let query = this.deleteGetParams(['q']).then(query => { 
        
          for (const key in query) {
            if (Object.hasOwnProperty.call(query, key)) {
              const element = query[key];
              sort[key] = element
            }
          }
          
          sort.sorting = valueSorting;

          this.$router.push({ query: sort});
        });

    },
    async changeMarkRole(role){
      let response = await fetch(process.env.fakeUrl + `roles/${role.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(role)
      });
    },
    async getPrompt(text){

    let query = this.deleteGetParams(['q']).then(async query => { 
      if(text.length > 2){
        
        this.promptList =  await this.fetchData(process.env.fakeUrl + `roles${this.parseGetParams()}&q=${text}`);
      }else{
        this.promptList = null;
      }
    });

    },
    async editGroup(item){
      let data = {
        "id": item.id,
        "name": item.name
      }

      let response = await fetch(process.env.fakeUrl + `groups/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

    },
    async addGroup(){
      let data = {
        "id": Date.now(),
        "name":"New group"
      }
      let response = await fetch(process.env.fakeUrl + `groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }); 

      if(response.ok){
        this.groupsList.push(data)
      }

    }
  },
  computed:{    
    currentSortingValue(){
      let currentValue = '';
      if(this.$route.query.sorting){
        currentValue = this.$route.query.sorting
      }else{
        currentValue = 'all'
      }

      return currentValue
    },
    sortList(){
      let sort = [
          {
            "id": 'all',
            "name": "all"
          },
          {
            "id": "marked",
            "name": "marked"
          }
      ];

      if(this.hashtagsList){
        return sort.concat(this.hashtagsList)
      }
      
    },
  },
  watch:{
    async $route(){
      console.log('смена роутов')
      this.rolesList = await this.fetchData(process.env.fakeUrl + `roles${this.parseGetParams()}`);
      this.promptList = null
    }
  }

}
</script>
<style lang='scss' scoped>
.groups{
  font-size: 1rem;
}
</style>