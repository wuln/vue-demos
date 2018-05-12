<template>
  <div class="hello">
    <h4>{{ msg }}</h4>
    <button @click="onClickMe">Click on me</button>
    <h5>{{fromParent}}</h5>
  </div>
</template>

<script>
export default {
  name: 'subComponent',
  props: ['fromParent'],
  data () {
    return {
      msg: 'this is a sub component'
    }
  },
  methods: {
    onClickMe () {
      this.$emit('fromsubcom', 'hello!')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  border: 1px solid #42b983;
}
h4 {
  color: #42b983;
}
</style>
