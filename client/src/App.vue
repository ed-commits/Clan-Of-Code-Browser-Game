<template>
  <div id="app">
    <narrative/>
    <buttons/>
  </div>
</template>

<script>
import Narrative from './components/Narrative.vue'
import Buttons from './components/Buttons.vue'

export default {
  name: 'App',
  components: {
    "narrative": Narrative,
    "buttons": Buttons
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
  margin-top: 60px;
  height: 100vh;
}
</style>
