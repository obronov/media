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
        @getResultSearch="getResultSearch($event)" 
        :promptList="promptList"
        @clearPrompt="promptList = null"
        />
        <div class="sort" v-if="!isEmptyArr(sortList)">
          <Sorting :sortList="sortList" @onSort="setQuerySorting($event)"/>
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
    setQuerySorting(valueSorting){
      let sort = {}
      
       for (const key in this.$route.query) {
        if (Object.hasOwnProperty.call(this.$route.query, key)) {
          const element = this.$route.query[key];
          sort[key] = element
        }
      }
      
      sort.sorting = valueSorting;

      this.$router.push({ query: sort});
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
    async getResultSearch(text){
      let getParams = this.$route.query.group_id;
      console.log('this.parseGetParams()', this.parseGetParams())
      this.rolesList =  await this.fetchData(process.env.fakeUrl + `roles${this.parseGetParams()}&q=${text}`);
    },
    async getPrompt(text){
      let getParams = this.$route.query.group_id;

      if(text.length > 2){
        this.promptList =  await this.fetchData(process.env.fakeUrl + `roles${this.parseGetParams()}&q=${text}`);
      }else{
        this.promptList = null;
      }
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