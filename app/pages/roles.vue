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
        <Form 
        :controls="formData"
        @oninputtext="updateControls($event)"
        @saveRole="saveRole()"
      />
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
      showControls: false,
      groupsList: null,
      hashtagsList: null,
      role: null,
      controls:[
        {
          "key": "name",
          "value": "",
          "type": "text",
          "label": "Name",
          "placeholder": "Write name",
          "error": '',
          "validation": {
              "required": true
          }
        },
        {
          "key": "hashtags",
          "value": "",
          "type": "select",
          "label": "Hashtags",
          "placeholder": "Write hashtags",
          "error": '',
          "options": [],
          "validation": {
              "required": true
          }
        },
        {
          "key": "group",
          "value": "",
          "type": "select",
          "label": "Groups",
          "placeholder": "Groups",
          "error": '',
          "options": [],
          "validation": {
              "required": true
          }
        }
      ]
    }
  },
  async fetch(){

    this.groupsList = await this.fetchData(process.env.fakeUrl + `groups`);

    this.hashtagsList = await this.fetchData(process.env.fakeUrl + `hashtags`);

    this.rolesList = await this.fetchData(process.env.fakeUrl + `roles`);

    this.role = await this.fetchData(process.env.fakeUrl + `roles?id=${this.$route.query.role_id}`);

  },
  methods:{
    async saveRole(){
      let id = this.$route.query.role_id;
      let data = {
        "id": id,
        "group_id": null,
        "name": null,
        "hashtags": null,
        "mark": false
      }

      this.controls.forEach(element => {
        
        if(element.key == 'name'){
            data.name = element.value;
          } 

        if(element.key == 'hashtags'){
          data.hashtags = Number(element.value);
        }

        if(element.type == 'select'){
          data.group_id = Number(element.value);
        }

      });

      let response = await fetch(process.env.fakeUrl + `roles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }); 

      console.log('data', data)
    },
    updateControls(item){
      this.controls.forEach(element => {
        if(element.key == item.key){
          element.value = item.value
        }
      });
    },
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
  },
  computed:{
    formData(){
      try {
        this.controls.forEach(element => {
 
          if(element.key == 'name'){
            element.value = this.role[0].name;
          } 

          if(element.key == 'hashtags'){
            element.options = this.hashtagsList;
            element.value = this.role[0].hashtags;
          }

          if(element.key == 'group'){
            element.options = this.groupsList;
            element.value = this.role[0].group_id;
          }
        });
      } catch (error) {
        
      }

      return this.controls
    }
  }
}

</script>

<style lang='scss' scoped>
.roles{
  font-size: 1rem;
}
</style>