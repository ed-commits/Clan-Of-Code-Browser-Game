<template>
  <div class="fight">
    <div class="health" value="100" max="100">{{ player.health }}</div>
  </div>
  
</template>

<script>

export default {
  props: ['player'],

  methods: {

  }
}
</script>

<style>
.fight {
    outline: 2px solid red;
    height: 50%;
    width: 100%;
}
.health {
  width: 50%;
  height: 10%;
  background-color: #49df3b;
  bottom: 50px;
}
</style>
