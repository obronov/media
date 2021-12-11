<template>
  <div class="page container" :class="{page_isMobile: !$device.isDesktop}">
    <Sidebar 
      :showSidebar="$store.state.showSidebar"
      @closeSidebar="$store.commit('setShowSidebar', false)"
    >
      <Roles 
        class="roles"
        v-if="!isEmptyArr(rolesList)" 
        :rolesList="rolesList"
        @click="addRole()"
      />
    </Sidebar>
      <main class="page__main" :class="{page__main_isMobile: !$device.isDesktop}">
        <header class="page-header" :class="{'page-header_isMobile': !$device.isDesktop}">
          <button type="button"  v-if="!$device.isDesktop" class='btn-sidebar-show' @click="$store.commit('setShowSidebar', true)">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-5025d0ea=""><rect x="4" y="7" width="22.8862" height="2.44443" rx="1" data-v-5025d0ea=""></rect> <rect x="4" y="12.7786" width="22.8862" height="2.44443" rx="1" data-v-5025d0ea=""></rect> <rect x="4" y="18.5555" width="22.8862" height="2.44443" rx="1" data-v-5025d0ea=""></rect></svg>
          </button>
          <h1 class="page-title" :class="{'page-title_isMobile': !$device.isDesktop}">{{translate('title_page_role')}}</h1>
        </header>
        <Form 
          v-if="!isEmptyArr(rolesList)" 
          :controls="formData"
          @oninputtext="updateControls($event)"
          @saveRole="saveRole()"
          :saved="saved"
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
      saved: false,
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
    resetError(controls){
      controls.forEach(element => {
        element.error = ''
      });
    },
    validateForm(data){
      let valid = false;
      let errorText = 'Required to fill';

      this.controls.forEach(element => {
 
        if(element.validation.required){
          
          if(element.value){
            element.error = ''
          }else{
            element.error = errorText
          }
          
        }
        
      });

      for (let element of this.controls){
        valid = true;

        if(element.error){
          valid = false;
          break;
        }
      };
      
      return valid;
    },
    async saveRole(){
      let id = this.$route.query.role_id;
      let data = {
        "id": id,
        "group_id": null,
        "name": null,
        "hashtags": null,
        "mark": false
      }

      if(this.validateForm(this.controls)){
        
        this.saved = false;

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

        if(response.ok){
          let json = await response.json();
          this.updateRole(json);
          this.saved = true;
        }
        
      }


    },
    updateRole(role){
      this.rolesList.forEach(element => {
        
        if(element.id == role.id){
          element.name = role.name
        }
      });
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
  },
  watch:{
    async $route(){
      this.saved = false;
      this.role = await this.fetchData(process.env.fakeUrl + `roles?id=${this.$route.query.role_id}`);
      await this.resetError(this.controls);
    }
  }
}

</script>

<style lang='scss' scoped>
.roles{
  font-size: 1em;
}
</style>