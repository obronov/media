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
        <h1 class="page-title">Groups</h1>
        <Search 
        @getPrompt="getPrompt($event)" 
        @getResultSearch="getResultSearch($event)" 
        :promptList="promptList"
        @clearPrompt="promptList = null"
        />
      </header>
      {{rolesList}}
    </main>
  </div>
</template>

<script>
import global from "~/mixins/global";
export default {
  mixins: [global],
  data(){
    return{
      rolesList: null,
      promptList: null,
      groupsList: null
    }
  },
  async fetch(){

    this.groupsList = await this.fetchData(process.env.fakeUrl + `groups`);

    this.$store.commit('setShowSkeleton', false);
  },
  methods:{
    async getResultSearch(text){
      
      this.rolesList =  await this.fetchData(process.env.fakeUrl + `roles?q=${text}`);

    },
    async getPrompt(text){
     
      if(text.length > 2){
        this.promptList =  await this.fetchData(process.env.fakeUrl + `roles?q=${text}`);

        console.log('promptList.length', this.promptList.length)
        console.log('promptList', this.promptList)
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
  }

}
</script>
<style lang='scss' scoped>
.groups{
  font-size: 1rem;
}
</style>