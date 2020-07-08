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
      pageTurn.volume = 1.0;
      pageTurn.play()
    }
  }
};
</script>

<style>
.button {
/*  background-color: rgba(255, 235, 146, 0.801);
  outline: 2px solid #99855f; */
  padding-right: 5px;
  padding-left: 5px;
  cursor: pointer;

  font-size: 1.08em;
}

.button:hover {
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

.button:active {
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    font-weight: bolder;
}
</style>
