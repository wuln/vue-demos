<template>
  <div id="app">
    <h1 v-text="title"></h1>
    <input type="text" v-model="newItem" @keyup.enter="addItem">
    <ul>
      <li v-for="(item, index) in list" :key="index" @click="handleClick(item)" :class="{finished: item.isFinished}">{{item.label}}</li>
    </ul>
    <p>msg from sub component: {{fromsc}}</p>
    <sc fromParent="msg from parent" @fromsubcom="handlesubcom"></sc>
    <!-- <HelloWorld/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import store from './store'
import sc from './components/subComponent'
export default {
  name: 'App',
  components: {
    // HelloWorld,
    sc
  },
  data () {
    return {
      title: 'my todolist',
      newItem: '',
      list: store.fetch(),
      fromsc: ''
    }
  },
  methods: {
    handleClick (item) {
      item.isFinished = !item.isFinished
    },
    addItem () {
      this.list.push({
        label: this.newItem,
        isFinished: false
      })
      this.newItem = ''
    },
    handlesubcom (msg) {
      this.fromsc += msg
    }
  },
  watch: {
    list: {
      handler (list) {
        store.save(list)
      },
      deep: true
    }
  }
}
</script>

<style>
.finished{
  text-decoration: underline;
}
#app{
    width: 280px;
    text-align: center;
    color: #42b983
}
#app ul {
  list-style-type: none;
  padding: 0;
  color: #c7254e;
}
#app input {
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
#app:hover input {
  border-color: #5D98CC;
}

</style>
