<template>
  <div class="fight">
    <div class="health">Health:{{player.health}}</div>
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
  margin: auto;
  width: 50%;
  height: 8%;
  background-color: #49df3b;
  
}
</style>
