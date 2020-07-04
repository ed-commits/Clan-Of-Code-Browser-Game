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
    }
  }
};
</script>

<style>
.button {
  text-decoration: underline;
}
</style>
