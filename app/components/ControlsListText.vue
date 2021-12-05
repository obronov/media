<template>
  <div class="control">
    <label class="control-label" 
      :class="{'control-label_error': options.error}">
      {{options.label}}
      <span class="control-label__star" v-if="options.validation.required">*</span> 
    </label>
    <input class="control-input" 
      :class="{'control-input_error': options.error}" 
      :name="options.key" 
      :type="options.type" 
      :value="options.value" 
      :placeholder="options.placeholder" 
      @input="oninput($event.target.value, options.key)"
    >
    <div class="control-error" v-if="options.error">{{options.error}}</div>
  </div>
</template>

<script>

export default {
  props:{
    options: Object
  },
  methods:{
    oninput(value, key){
      value = value.trim();

      this.$emit('oninput', {value: value, key: key})
    }
  }
}

</script>
<style lang='scss' scoped>
.control-label__star{
  color: var(--red);
}
.control{
  display: flex;
  flex-flow: column wrap;  
}
.control-label{
  font-size: 1.6em;
  line-height: 1;
  color: var(--black);
  margin: 0 0 .6em;
  color: var(--white);
  &.control-label_error{
    color: var(--red);
  }
}
.control-input{
  border-radius: 1em;
  padding: .5em;
  font-size: 1.6em;
  line-height: 1;
  border: .2em solid var(--black);
  background: var(--white);
  &.control-input_error{
    border-color: var(--red);
  }
}
.control-error{
  font-size: 1.2em;
  line-height: 1;
  margin: .5em 0 0;
  color: var(--red);
}
</style>