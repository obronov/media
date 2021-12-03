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
55
    </main>
  </div>
</template>

<script>
import global from "~/mixins/global";
export default {
  mixins: [global],
  data(){
    return{

      groupsList: null
    }
  },
  async fetch(){

    this.groupsList = await this.fetchData(process.env.fakeUrl + `groups`);

    this.$store.commit('setShowSkeleton', false);
  },
  methods:{
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