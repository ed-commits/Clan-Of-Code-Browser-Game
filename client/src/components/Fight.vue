<template>
  <div class="fight">
    <div class="combat-box">
      <!-- player box -->
      <div class="items"></div>
      <div class="character-and-health">
        <div class="character">
          <h2>{{ player.name }}</h2>
          <img class="character_image" :src="player.image" />
        </div>
        <div class="health">Health:{{ player.health }}</div>
      </div>
      <div class="damage-dealt">
        <div v-if="diceRoll">
          <div class="dicebox">{{ diceRoll.player.d1 }}</div>
          <div class="dicebox">{{ diceRoll.player.d2 }}</div>
        </div>
      </div>
    </div>
    <div class="damage-box">
      <div class="damage_animation-parent"></div>
      <div class="attack-button-parent">
        <transition name="fade">
          <img class="attack_button" v-if="monster" v-on:click="rollDice" src="/assets/atk.png" />
        </transition>
      </div>
    </div>
    <div class="combat-box">
      <!-- monster box -->

      <div class="damage-dealt">
        <i v-if="monster">"{{ monster.taunt }}"</i>
      </div>
      <div class="character-and-health">
        <div class="character">
          <transition name="fade">
            <h2 v-if="monster">{{ monster.name }}</h2>
          </transition>
          <transition name="slide">
            <img class="character_image" v-if="monster" :src="monster.img_file" />
          </transition>
        </div>
        <div class="health">
          <span v-if="monster">Health:{{ monster.health }}</span>
        </div>
      </div>
      <div class="items"></div>
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
        player_roll1: 0,
        player_roll2: 0,
        monster_roll1: 0,
        monster_roll2: 0,
        player_total_damage: 0,
        monster_total_damage: 0,
        damage_modifier: 0,
        damage_dealt: 0
      },
      diceRoll: undefined
    };
  },
  mounted() {
    eventBus.$on("start-fight", character => {
      this.monster = character.monster;
      this.fight_data.monster_health = this.monster.health;
      this.player = character.player;
    });
  },
  methods: {
    rollDice() {
      this.playAudio();
      eventBus.$emit("Attack", {});

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
      const playerWins = this.monster.health <= 0;
      const monsterWins = this.player.health <= 0;

      if (playerWins) {
        this.monster = undefined;
        eventBus.$emit("fight-won", {});
      } else if (monsterWins) {
        this.monster = undefined;
        eventBus.$emit("fight-lost", {});
      }
    },
    rollMagicDice(){
      this.fight_data.player_roll1 = this.numGenerator();
      this.fight_data.player_roll2 = this.numGenerator();

      this.fight_data.player_total_damage =
        this.fight_data.player_roll1 +
        this.fight_data.player_roll2;

      const playerMagicAtk = this.dealDamagetoMonster(
          this.fight_data.player_total_damage
        )
            const playerWins = this.monster.health <= 0;
      const monsterWins = this.player.health <= 0;

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
      this.monster = undefined;
      eventBus.$emit("fight-won", {});
    },
    dieClicked() {
      this.monster = undefined;
      eventBus.$emit("fight-lost", {});
    },
    dealDamagetoMonster(damageAmount) {
      this.monster.health -= damageAmount;
    },
    dealDamagetoPlayer(damageAmount) {
      this.player.health -= damageAmount;
    },
    playAudio() {
      const buttonAudio = new Audio("/assets/music/sword_impact.mp3");
      buttonAudio.volume = 0.1;
      buttonAudio.play();
    }
  }
};
</script>

<style>
.fight {
  outline: 2px solid red;
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.combat-box {
  height: 100%;
  width: 40%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.damage-box {
  height: 100%;
  width: 20%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.damage_animation-parent {
  width: 100%;
  height: 60%;
  background-color: violet;
}

.attack-button-parent {
  width: 100%;
  height: 40%;
  background-color: teal;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.attack_button {
  width: auto;
  height: 95%;
  cursor: pointer;
}
.attack_button:hover {
  height: 100%;
}

.attack_button:active {
  height: 80%;
}

.items {
  height: 100%;
  width: 30%;
  height: 100%;
  background-color: tomato;
}
.character-and-health {
  height: 100%;
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.character {
  height: 70%;
  width: 100%;
  background-color: maroon;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.character h2 {
  margin: 0;
}

@keyframes breathing {
  from {
    height: 70%;
  }

  to {
    height: 68%;
  }
}

.character_image {
  height: 70%;
  width: auto;
  animation-duration: 1s;
  animation-name: breathing;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  /* animation-timing-function: ease-in-out; */
}

.health {
  height: 30%;
  width: 100%;
  background-color: blueviolet;
}

.damage-dealt {
  height: 100%;
  width: 30%;
  height: 100%;
  background-color: yellow;
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

.slide-enter-active,
.slide-leave-active {
  transition: margin-left 1s;
  transition-timing-function: ease-out;
}
.slide-enter,
.slide-leave-to {
  margin-left: 400px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.dicebox {
  border: 1px solid black;
  width: 30px;
  height: 30px;
  text-align: center;
}
</style>
