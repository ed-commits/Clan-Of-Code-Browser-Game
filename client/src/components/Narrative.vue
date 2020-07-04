<template>
  <div class="narrative">
    <div class = "scroll">
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

export default {
  components: {
    buttons: Buttons,
    page: Page
  },
  props: ["pages", "button_links"]
};
</script>

<style>
.narrative {
  outline: 2px solid green;
  height: 50%;
  width: 100%;
  display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    

}
.scroll{
  outline: 2px solid black;
  height: 40vh;
  width: 60%;
  background-color: rgba(255, 235, 146, 0.801);
  overflow-y: scroll;
}
</style>
