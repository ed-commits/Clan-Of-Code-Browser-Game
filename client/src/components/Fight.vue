<template>
  <div class="fight">
    <div class="health">Health:{{player.health}}</div>

    <div class="items" v-for="(item, index) in player.items" :key="index">Inventory: {{ item.name }}</div>
    <div v-if="monster">
      <div class="monster" v-if="monster">
        <h2>{{ monster.name }}</h2>
        <img :src="monster.img_file" />
        <br />
        <i>"{{ monster.taunt }}"</i>
        <div class="monster_health">{{`${monster.name}`}} Health:{{ fight_data.monster_health }}</div>
      </div>

      <input type="submit" class="button" v-on:click="winClicked" value="win fight" />
      <input type="submit" class="button" v-on:click="dieClicked" value="die" />
      <input type="submit" class="button" v-on:click="rollDice" value="Attack" />
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main.js";

export default {
  props: ["player"],
  data() {
    return {
      monster: undefined,
      fight_data: {
        monster_health: 0,
        player_health: 0,
        player_roll1: 0,
        player_roll2: 0,
        monster_roll1: 0,
        monster_roll2: 0,
        player_total_damage: 0,
        monster_total_damage: 0,
        damage_modifier: 0,
        damage_dealt: 0
      }
    };
  },
  mounted() {
    eventBus.$on("start-fight", monster => {
      this.monster = monster;
      this.fight_data.monster_health = this.monster.health;
    });
  },
  methods: {
    // i start with 20 health, monster starts with 25
    // I roll 8
    //they roll 4
    //monster takes 4, its health now 21
    //click roll again
    //first to zero or lower loses

    rollDice() {
      eventBus.$emit("Attack", {});
      this.fight_data.monster_health = this.monster.health;
      this.fight_data.player_health = this.player.health;

      // perform the dice rolls
      this.fight_data.player_roll1 = this.numGenerator();
      this.fight_data.player_roll2 = this.numGenerator();
      this.fight_data.monster_roll1 = this.numGenerator();
      this.fight_data.monster_roll2 = this.numGenerator();

      // total up the players damage modifier
      this.player.items.forEach(item => {
        if ("damage_modifier" in item) {
          this.fight_data.damage_modifier += item.damage_modifier;
        }
      });

      // calculate total damage
      this.fight_data.player_total_damage =
        this.fight_data.player_roll1 +
        this.fight_data.player_roll2 +
        this.fight_data.damage_modifier;
      this.fight_data.monster_total_damage =
        this.fight_data.monster_roll1 + this.fight_data.monster_roll2;

      // deal damage based on who rolled best this round
      const playerWinsRound =
        this.fight_data.player_total_damage >
        this.fight_data.monster_total_damage;
      if (playerWinsRound) {
        this.dealDamagetoMonster(
          this.fight_data.player_total_damage -
            this.fight_data.monster_total_damage
        );
      }
      const monsterWinsRound =
        this.fight_data.player_total_damage <
        this.fight_data.monster_total_damage;
      if (monsterWinsRound) {
        this.dealDamagetoPlayer(
          this.fight_data.monster_total_damage -
            this.fight_data.player_total_damage
        );
      }

      // check if the fight has ended
      const playerWins = this.fight_data.monster_health <= 0;
      const monsterWins = this.fight_data.player_health <= 0;

      if (playerWins) {
        this.monster = undefined;
        eventBus.$emit("fight-won", {});
      } else if (monsterWins) {
        this.monster = undefined;
        eventBus.$emit("fight-lost", {});
      }
    },

    numGenerator() {
      return Math.ceil(Math.random() * 10);
    },

    winClicked() {
      eventBus.$emit("fight-won", {});
    },
    dieClicked() {
      eventBus.$emit("fight-lost", {});
    },
    dealDamagetoMonster(damageAmount) {
      this.fight_data.monster_health -= damageAmount;
    },
    dealDamagetoPlayer(damageAmount) {
      this.fight_data.player_health -= damageAmount;
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
  background-color: #a89e6f;
}
</style>
