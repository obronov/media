<template>
  <div class='item-group'>
    <NuxtLink 
      v-if="!editMode"
      class='item-group__name' 
      :to="{query: { group_id: item.id }}"
    >
      {{item.name}}
    </NuxtLink>

    <input 
    v-else
    class='item-group__name'
    type="text"
    v-model="item.name">

    <button class='item-group__btnEdit' type="button" @click="editItem(item)">
      <svg v-if="!editMode" fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">
        <path d="M14.5 5.5L3 17 3 21 7 21 18.5 9.5zM21.707 4.879l-2.586-2.586c-.391-.391-1.024-.391-1.414 0L16 4l4 4 1.707-1.707C22.098 5.902 22.098 5.269 21.707 4.879z"/>
      </svg>

      <svg v-else fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">
        <path d="M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M10,17.414l-4.707-4.707l1.414-1.414L10,14.586l7.293-7.293l1.414,1.414L10,17.414z"/>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  props:{
    item: Object
  },
  data(){
    return{
      name: this.item.name,
      editMode : false
    }
  },
  methods:{
    editItem(item){
      if(this.editMode){
        if(this.name != item.name){
          console.log('name', this.name)
          console.log('GroupsListItem', item)
          this.$emit("editItem", item)
        }
        this.editMode = false;
      }else{
        this.editMode = true;
      }
    }
  }
}

</script>

<style lang='scss' scoped>
.item-group{
  font-size: 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0 1em;
  padding: 1em 2em;
  background: var(--gray);
}
.item-group__name{
  padding: 0;
  border: 0;
  width: 100%;
  font-size: 1.6em;
  line-height: 1.1;
  text-decoration: none;
  display: flex;
  align-items: center;
}
.item-group__btnEdit{
  width: 2.4em;
  height: 2.4em;
  font-size: 1em;
  border: none;
  padding: 0;
  background: none;
  & svg{
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>