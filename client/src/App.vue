<template>
  <div id="app">
    <narrative :pages="pages" />
    <fight />
  </div>
</template>

<script>
import Narrative from "./components/Narrative.vue";
import Fight from "./components/Fight.vue";
import JSONService from "./services/JSONService.js";
import { eventBus } from "./main.js";

export default {
  name: "App",
  data() {
    return {
      pages: []
    };
  },
  components: {
    narrative: Narrative,
    fight: Fight
  },
  mounted() {
    this.turnToPage("starting inn");

    eventBus.$on("turn-to-page", page => {
      console.log(`turning to page ${page}`);
      this.turnToPage(page);
    });
  },
  methods: {
    turnToPage(page_name) {
      JSONService.getPage(page_name).then(page => {
        console.dir(page);
        this.pages.push(page);
      });
    }
  }
};
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
