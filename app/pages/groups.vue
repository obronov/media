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
      </header>
      <RolesList :rolesList="rolesList" @changeMark="changeMarkRole($event)"/>
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
      rolesList: []
    }
  },
  async fetch(){

    this.groupsList = await this.fetchData(process.env.fakeUrl + `groups`);

    this.rolesList = await this.fetchData(process.env.fakeUrl + `roles?group_id=${this.$route.query.group_id}`);

    this.$store.commit('setShowSkeleton', false);
  },
  methods:{
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
      
      this.rolesList =  await this.fetchData(process.env.fakeUrl + `roles?group_id=${getParams}&q=${text}`);
    },
    async getPrompt(text){
      let getParams = this.$route.query.group_id;

      if(text.length > 2){
        this.promptList =  await this.fetchData(process.env.fakeUrl + `roles?group_id=${getParams}&q=${text}`);
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
  watch:{
    $route(){

    }
  }

}
</script>
<style lang='scss' scoped>
.groups{
  font-size: 1rem;
}
</style>