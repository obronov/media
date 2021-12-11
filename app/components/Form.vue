<template>
  <form method="POST" action="/" class="form">
    <ControlsList 
      :controls="controls" 
      @oninputtext="$emit('oninputtext', $event)"
    />
    <div class="btn-save-control">
      <AppButton 
        @click="$emit('saveRole')" 
        :title="'Save'"
        class="btn-primary"
        :class="{'btn-success': saved}"
      >
        <span v-if="saved">{{translate('saved')}}</span>
        <span v-else>{{translate('save')}}</span>        
      </AppButton>
    </div>
  </form>
</template>

<script>
import global from "~/mixins/global";
export default {
  mixins: [global],
  props:{
    controls: Array,
    saved: Boolean
  }
}

</script>

<style lang='scss' scoped>
.form{
  font-size: 1em;
  max-width: 50em;
  border-radius: 1em;
  background: var(--gray);
  padding: 4em 3em;
  min-height: 50vh;
}
.btn-save-control{
  margin: 3em 0 0;
}
</style>