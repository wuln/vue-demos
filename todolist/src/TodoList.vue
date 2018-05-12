<template>
  <div id="app">
    <div class="smart">
      <input type="text" placeholder="please enter the item" v-model="inputValue">
      <button class="btn" @click='handleSubmit'>提交</button>
    </div>
    <ul>
      <todo-item
        v-for='(item,index) of list'
        :key='index'
        :content='item'
        :index='index'
        @delete='handleDelete'
      ></todo-item>
    </ul>
  </div>
</template>

<script>
import TodoItem from './components/TodoItem'

export default {
  name: 'TodoList',
  components: {
    'todo-item': TodoItem
  },
  data () {
    return {
      inputValue: '',
      list: []
    }
  },
  methods: {
    handleSubmit () {
      this.list.push(this.inputValue)
      this.inputValue = ''
    },
    handleDelete (index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style>
  .smart{
    width: 280px;
  }
  .smart input {
    /*display: inline-block;*/
    box-sizing: border-box;
    width: 150px;
    height: 32px;
    line-height: 32px;
    padding: 5px 10px;
    outline: 0;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
    background: #fff;
    font: 13px/16px 'Open Sans', Helvetica, Arial, sans-serif;
    color: #404040;
  }
  .smart:hover input {
    border-color: #5D98CC;
  }
  .smart .btn {
    height: 34px;
    background: #1aa2cf;
    border: none;
    border-radius: 5px;
    width: 100px;
    color: #ffffff;
  }
</style>
