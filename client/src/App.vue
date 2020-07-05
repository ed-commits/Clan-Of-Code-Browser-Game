<template>
  <div id="app">
    <narrative :pages="pages" :button_links="button_links" />
    <fight :player="player" />
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
      current_page: undefined,
      button_links: undefined,
      player: { name: "Hero", health: 100, items: [], image: "//player.jpeg" },
      player_location: "intro",
      current_monster: undefined
    };
  },
  components: {
    narrative: Narrative,
    fight: Fight
  },
  mounted() {
    this.turnToPage({ button_destination: this.player_location });

    eventBus.$on("turn-to-page", page_button => {
      console.log(`turning to page ${page_button.button_destination}`);
      this.turnToPage(page_button);
    });

    eventBus.$on("fight-won", () => {
      // TODO: add note about the fight being won
      console.dir(this.current_page);
      console.dir(this.current_page.destination_after_fight);
      this.turnToPage({
        button_destination: this.current_page.destination_after_fight,
        button_text: "won the fight"
      });
    });

    eventBus.$on("fight-lost", () => {
      this.turnToPage({
        button_destination: "died",
        button_text: "lost the battle.."
      });
    });
  },
  methods: {
    turnToPage(page_button) {
      const page_name = page_button.button_destination; //this gets the destination we're interested in from the button. We will pull the chapter matching this name from the db.
      JSONService.getPage(page_name).then(page => {
        //this pulls the page from the db that matched the destination name.
        if (page == null) {
          //error_handling
          console.log(
            //error_handling
            `Error: Null page returned from database for ${page_name}.` //error_handling
          ); //error_handling
        } else {
          this.current_monster = undefined;
          this.current_page = page;
          console.dir(page); //like console.log but we can look inside the object
          this.player_location = page_name;
          const array_length = this.pages.length;
          if (array_length > 0) {
            this.pages[array_length - 1].narrative_text += "\n\n";
            this.pages[array_length - 1].narrative_text += "You ";
            this.pages[array_length - 1].narrative_text +=
              page_button.button_text;
          }
          this.pages.push(page);
          this.button_links = page.buttons;
          if ("fight_monster" in page) {
            this.startFight(page);
          }
          if ("gain_item" in page) {
            this.gainItem(page)
          }
        }
      });
    },
    startFight(page) {
      const monster_name = page.fight_monster
      JSONService.getMonster(monster_name)
      .then(dbMonster => {
        eventBus.$emit("start-fight", dbMonster)
      })
    },
    gainItem(page) {
      const item_name = page.gain_item
      JSONService.getItem(item_name)
      .then(dbItem => this.player.items.push(dbItem))
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
  background-image: url("./assets/map_background.jpg");
  background-size: cover;
  background-position: center;
}
</style>
