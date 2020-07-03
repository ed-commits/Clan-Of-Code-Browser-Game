<template>
  <p v-on:click="buttonClicked">{{button.button_text}}</p>
</template>

<script>
import { eventBus } from "../main.js"

export default {
  props: ["button"],
  methods: {
    buttonClicked() {
      eventBus.$emit("turn-to-page", this.button.button_destination);
    }
  }
};
</script>

<style>
.buttons {
  outline: 2px solid blue;
}
</style>
