<template>
  <p class="button" v-on:click="buttonClicked">{{button.button_text}}</p>
</template>

<script>
import { eventBus } from "../main.js"

export default {
  props: ["button"],
  methods: {
    buttonClicked() {
      eventBus.$emit("turn-to-page", this.button);
      const pageTurn = new Audio('/assets/music/Page_Turn.mp3')
      pageTurn.volume = 0.1;
      pageTurn.play()
    }
  }
};
</script>

<style>
.button {
  text-decoration: underline;
  cursor: pointer;
}

.button:hover {
  outline: 1px solid blueviolet;
}
</style>
