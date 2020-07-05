<template>
  <div class="fight">
    <div class="health">Health:{{player.health}}</div>
    <div v-if="monster">
      <div class="monster" v-if="monster">
        <h2>{{ monster.name }}</h2>
        <img src="https://placebear.com/g/100/100" />
        <br />
        <i>"{{ monster.name }}"</i>
        <div class="health">Health:{{ monster.health }}</div>
      </div>

      <input type="submit" class="button" v-on:click="winClicked" value="win fight" />
      <input type="submit" class="button" v-on:click="dieClicked" value="die" />
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main.js";

export default {
  props: ["player", "monster"],
  methods: {
    numGenerator() {
      return Math.ceil(Math.random() * 20);
    },

    winClicked() {
      eventBus.$emit("fight-won", {});
    },
    dieClicked() {
      eventBus.$emit("fight-lost", {});
    }
  }
};
</script>

<style>
.fight {
  outline: 2px solid red;
  height: 50%;
  width: 100%;
}
.health {
  margin: auto;
  width: 50%;
  height: 8%;
  background-color: #49df3b;
}
.monster {
  float: right;
  margin: 20px;
}
</style>
