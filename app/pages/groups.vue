<template>
  <div class="page container" :class="{page_isMobile: !$device.isDesktop}">
    <Sidebar 
      :showSidebar="$store.state.showSidebar"
      @closeSidebar="$store.commit('setShowSidebar', false)"
    >
      <Groups 
        class="groups"
        v-if="!isEmptyArr(groupsList)" 
        :groupsList="groupsList"
        @editItem="editGroup($event)"
        @click="addGroup()"
      />
    </Sidebar>
    <main class="page__main" :class="{page__main_isMobile: !$device.isDesktop}">
      <header class="page-header" :class="{'page-header_isMobile': !$device.isDesktop}">
        <button type="button"  v-if="!$device.isDesktop" class='btn-sidebar-show' @click="$store.commit('setShowSidebar', true)">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-5025d0ea=""><rect x="4" y="7" width="22.8862" height="2.44443" rx="1" data-v-5025d0ea=""></rect> <rect x="4" y="12.7786" width="22.8862" height="2.44443" rx="1" data-v-5025d0ea=""></rect> <rect x="4" y="18.5555" width="22.8862" height="2.44443" rx="1" data-v-5025d0ea=""></rect></svg>
        </button>
        <h1 class="page-title" :class="{'page-title_isMobile': !$device.isDesktop}">{{translate('title_page_groups')}}</h1>
        <Search 
          class="page__search"
          :class="{page__search_isMobile: !$device.isDesktop}"
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
  font-size: 1em;
}
</style>