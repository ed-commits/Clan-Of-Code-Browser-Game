<template>
  <div id="app">
    <narrative/>
    <fight/>
  </div>
</template>

<script>
import Narrative from './components/Narrative.vue'
import Fight from './components/Fight.vue'

export default {
  name: 'App',
  components: {
    "narrative": Narrative,
    "fight": Fight,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>
