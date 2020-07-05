<template>
  <div class="fight">
    <div class="health">Health:{{player.health}}</div>
    <div class="monster" v-if="monster">
      <h2>{{ monster.name }}</h2>
      <img src="https://placebear.com/g/100/100" /> <br />
      <i>"{{ monster.name }}"</i>
      <div class="health">Health:{{ monster.health }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["player", "monster"],
  methods: {
    numGenerator() {
      return Math.ceil(Math.random() * 20);
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
