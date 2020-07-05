<template>
  <div class="fight">
    <div class="health">Health:{{player.health}}</div>

   <div class="items" v-for="(item, index) in player.items" :key = "index">Inventory: {{ item.name }}</div>
    <div v-if="monster">
      <div class="monster" v-if="monster">
        <h2>{{ monster.name }}</h2>
        <img src="https://placebear.com/g/100/100" />
        <br />
        <i>"{{ monster.taunt }}"</i>
       <div class="monster_health">Monster Health:{{ monster.health }}</div>
      </div>

      <input type="submit" class="button" v-on:click="winClicked" value="win fight" />
      <input type="submit" class="button" v-on:click="dieClicked" value="die" />
      <input type="submit" class="button" v-on:click="rollDice" value="Attack"/>
    </div>

  </div>
</template>

<script>
import { eventBus } from "../main.js";

export default {
  props: ["player", "monster"],
  methods: {
    // i start with 20 health, monster starts with 25
  // I roll 8
  //they roll 4
  //monster takes 4, its health now 21
  //click roll again
  //first to zero or lower loses
  
    rollDice() {
      eventBus.$emit("Attack", {});
      const monster_health = this.monster.health
      const player_health = this.player.health
      const player_roll1 = this.numGenerator()
      const player_roll2 = this.numGenerator()
      let damage_modifier = 0;
      this.player.items.forEach(item => {
        if('damage_modifier' in item) {
          damage_modifier += item.damage_modifier;
        }
      })
      console.log(`damage mod ${damage_modifier}`)
      const total_damage = player_roll1 + player_roll2 + damage_modifier;
      

    },

    numGenerator() {
      return Math.ceil(Math.random() * 10);
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
