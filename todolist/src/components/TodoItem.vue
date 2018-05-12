<template>
  <li class="item" @click='handleClick'>{{content}}</li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: ['content', 'index'],
  methods: {
    handleClick () {
      this.$emit('delete', this.index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .item {
    line-height: 20px;
    height: 20px;
    margin-top: 20px;
    font-size: 14px;
  }
</style>
