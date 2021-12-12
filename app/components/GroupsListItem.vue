<template>
  <div class='item-group' 
  :class="{
    'item-group_isActive': $route.query.group_id == item.id,
    'item-group_edit': editMode,
    'item-group_isMobile': !$device.isDesktop
    }">
    <NuxtLink 
      v-if="!editMode"
      class='item-group__name item-group__name_link' 
      :to="{query: { group_id: item.id, _page: 1, _limit: $store.state.countElement }}"
    >
      {{item.name}}
    </NuxtLink>

    <input 
    v-else
    class='item-group__name'
    :class="{}"
    type="text"
    v-model="item.name">

    <button class='item-group__btn-edit' type="button" @click="editItem(item)" :title="titleBtn">
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
import global from "~/mixins/global";
export default {
  mixins: [global],
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
          this.$emit("editItem", item)
        }
        this.editMode = false;
      }else{
        this.editMode = true;
      }
    }
  },
  computed:{
    titleBtn(){
      let title = '';

      if(this.editMode){
        title = this.translate('save')
      }else{
        title = this.translate('edit_name_group')
      }

      return title
    }

  }
}

</script>

<style lang='scss' scoped>
.item-group{
  font-size: 1em;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0 1em;
  padding: 1em 2em;
  background: var(--gray);
  border: .3em solid var(--gray);
  margin: 0 -.4em .4em 0;
  &.item-group_isActive{
    position: relative;
    border: .3em solid var(--black);
    border-right: .3em solid var(--white);
    background: var(--white);
    & .item-group__name{
      color: var(--black);
    }
  }
  &.item-group_edit:not(.item-group_isActive) .item-group__name{
    border-color: var(--white);
  }
  &.item-group_edit .item-group__name{
    border-color: var(--gray);
  }
  &.item-group_isMobile{
    margin: 0 0 0.4em;
    &.item-group_isActive{
      position: relative;
      border: .3em solid var(--black);
    }
  }
}
.item-group__name{
  padding: 0;
  border: 1px solid transparent;
  width: 100%;
  font-size: 1.6em;
  line-height: 1.1;
  text-decoration: none;
  display: flex;
  align-items: center;
  background: none;
}
.item-group__name_edit{
    border: 1px solid #fff;
}
.item-group__btn-edit{
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