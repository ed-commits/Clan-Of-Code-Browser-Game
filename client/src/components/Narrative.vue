<template>
  <div class="narrative">
    <page class = "scroll" v-for=" (page, index) in pages" :key="index" :page="page" />
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
  height: 40vh;
  width: 60%;
  background-color: aquamarine;
  overflow: scroll;
}
</style>
