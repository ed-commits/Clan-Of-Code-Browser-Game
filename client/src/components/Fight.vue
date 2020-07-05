<template>
  <div class="fight">
    <div class="health">Health:{{player.health}}</div>
    <div class="monster_health">Monster Health:{{ current_monster.health }}</div>
    <div class="items" v-for="(item, index) in player.items" :key = "index">Inventory: {{ item.name }}</div>
  </div>
  
</template>

<script>

export default {
  props: ['player', 'current_monster'],

  methods: {
    numGenerator() {
      return Math.ceil(Math.random()*20)
    }
    

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
.monster_health {
  margin: auto;
  width: 50%;
  height: 8%;
  background-color: #ca812e;
}
.items {
margin: auto;
  width: 50%;
  height: 8%;
  background-color: #a89e6f;}
</style>
