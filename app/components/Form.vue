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
        <span v-if="saved">Saved</span>
        <span v-else>Save</span>        
      </AppButton>
    </div>
  </form>
</template>

<script>

export default {
  props:{
    controls: Array,
    saved: Boolean
  }
}

</script>

<style lang='scss' scoped>
.form{
  font-size: 1rem;
  max-width: 50em;
  border-radius: 1em;
  background: var(--gray);
  padding: 3em;
}
.btn-save-control{
  margin: 3em 0 0;
}
</style>