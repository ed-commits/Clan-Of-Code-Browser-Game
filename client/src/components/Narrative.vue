<template>
  <div class="narrative">
    <storymap :pages="pages" class="story-map" >
    </storymap>

    <div class="scroll">
      <page v-for=" (page, index) in pages" :key="index" :page="page" />
    </div>
    <div v-if="button_links">
      <buttons v-for=" (button, index) in button_links" :key="index" :button="button" />
    </div>
  </div>
</template>

<script>
import Buttons from "./Buttons.vue";
import Page from "./Page.vue";
import StoryMap from "./StoryMap.vue"

export default {
  components: {
    buttons: Buttons,
    page: Page,
    storymap: StoryMap,
  },
  props: ["pages", "button_links"],
  updated() {
    var scrollDiv = document.querySelector(".scroll");
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }
};
</script>

<style>

.story-map{
  position: absolute;
  width: 100%;
  height: 50%;
  /* change z-index to -1 in production */

  z-index: -1;
  filter: invert(90%) grayscale(70%);

}

.narrative {
  outline: 2px solid green;
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
}
.button {
  background-color: rgba(255, 235, 146, 0.801);
  outline: 2px solid black;
}
.scroll {
  outline: 2px solid black;
  height: 40vh;
  width: 60%;
  background-color: rgba(255, 235, 146, 0.801);
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 10px;
}
</style>
