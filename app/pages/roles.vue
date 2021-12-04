<template>
  <div class="page container">
    <aside class="page__sidebar">
      <Roles 
        class="roles"
        v-if="!isEmptyArr(rolesList)" 
        :rolesList="rolesList"
        @click="addRole()"
      />
    </aside>
      <main class="page__main">
        <RolesEditForm/>
      </main>
  </div>
</template>

<script>
import global from "~/mixins/global";
export default {
  middleware:['redirectToRole'],
  mixins: [global],
  data(){
    return{
      rolesList: null,
    }
  },
  async fetch(){

    this.rolesList = await this.fetchData(process.env.fakeUrl + `roles`);

    this.$store.commit('setShowSkeleton', false);
  },
  methods:{
    async addRole(){
      let data = {
        "id": Date.now(),
        "group_id": null,
        "name":"New role",
        "hashtags": null,
        "mark": false
      }

      let response = await fetch(process.env.fakeUrl + `roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }); 

      if(response.ok){
        this.rolesList.push(data)
      }

    }
  }
}

</script>

<style lang='scss' scoped>
.roles{
  font-size: 1rem;
}
</style>