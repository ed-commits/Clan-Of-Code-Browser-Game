<template>
  <div class="narrative">
    <page v-for=" (page, index) in pages" :key="index" :page="page" />
    <div v-if="buttons2">
      <buttons v-for=" (button, index) in buttons2" :key="index" :button="button" />
    </div>
  </div>
</template>

<script>
import Buttons from "./Buttons.vue";
import Page from "./Page.vue";

export default {
  data() {
    return {
      buttons2: [
        {
          button_text:
            "Follow the river path to meek Kate in the haunted gallows",
          button_destination: "river_romance_scene",
          button_style: "xyz"
        },
        {
          button_text:
            "Wade under the bridge to seek the monster that has been bothering the villagers",
          button_destination: "bridge_fight",
          button_style: "zzz"
        }
      ]
    };
  },
  components: {
    buttons: Buttons,
    page: Page
  },
  props: ["pages"]
};
</script>

<style>
.narrative {
  outline: 2px solid green;
  height: 50%;
  width: 100%;
}
</style>
