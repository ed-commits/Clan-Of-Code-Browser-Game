<template>
  <div id="app">
    <narrative :pages="pages" :button_links="button_links" />
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
      pages: [],
      button_links: undefined,
      player_health: 100,
      player_location: "starting inn"
    };
  },
  components: {
    narrative: Narrative,
    fight: Fight
  },
  mounted() {
    this.turnToPage(this.player_location);

    eventBus.$on("turn-to-page", page => {
      console.log(`turning to page ${page}`);
      this.turnToPage(page);
    });
  },
  methods: {
    turnToPage(page_name) {
      JSONService.getPage(page_name).then(page => {
        console.dir(page);
        this.player_location = page_name;
        this.pages.push(page);
        this.button_links = page.buttons;
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
