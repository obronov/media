<template>
  <div class="page container">
    <aside class="page__sidebar">
      <Groups 
        v-if="!isEmptyArr(groupsList)" 
        :groupsList="groupsList"
        @editItem="editItem($event)"
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
    async editItem(item){
      console.log('item Index', item)
     
    }
  }

}
</script>
