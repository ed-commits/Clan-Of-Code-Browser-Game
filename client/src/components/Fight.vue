<template>
  <div class="fight">
    <div class="combat-box">
      <!-- player box -->
      <div class="items"></div>
      <div class="character-and-health">
        <!-- <div class="background">
          <img class="background-image" src="/assets/Background_1.png">
        </div>-->
        <div class="character">
          <h2>{{ player.name }}</h2>
          <img class="character_image" :src="player.image" />
          
        </div>
        <healthbar :amount="player.health" max="100" />
      </div>
      <div class="damage-dealt">
        <div class="damage-dealt-message"></div>
        <div class="dice">
          <dice :number="diceRoll.player.d1" />
          <dice :number="diceRoll.player.d2" />
        </div>
      </div>
    </div>
    <div class="damage-box">
      <div class="damage_animation-parent">
        <div class="roll_total">
          <transition name="total_animation">
            <span v-if="this.show_player_roll">{{this.fight_data.player_total_damage}}</span>
          </transition>
        </div>
        <div class="damage_excess">
          <transition name="damage_excess_animation">
           <span v-if="this.show_damage_excess">+{{this.fight_data.damage_dealt}}</span>
          </transition> 
        </div>
        <div class="roll_total">
          <span v-if="this.show_monster_roll">{{this.fight_data.monster_total_damage}}</span>
        </div>
      </div>
      <div class="button_holder">
        <div class="attack-button-parent">
          <transition name="fade">
            <img class="attack_button" v-if="monster" v-on:click="rollDice" src="/assets/atk.png" />
          </transition>
        </div>
        <div class="magic-button-parent" v-if="monster">
          <transition name="fade">
            <img
              class="magic_button"
              v-if="show_fireball_button"
              v-on:click="rollMagicDice"
              src="/assets/fireballwithmagic.png"
            />
          </transition>
          <img
            class="magic_button"
            v_if="show_used_fireball_button"
            src="/assets/fireball_used.png"
          />
        </div>
      </div>
    </div>
    <div class="combat-box">
      <!-- monster box -->

      <div class="damage-dealt">
        <div class="damage-dealt-message">
          <i v-if="monster">"{{ monster.taunt }}"</i>
        </div>
        <div class="dice">
          <dice :number="diceRoll.monster.d1" />
          <dice :number="diceRoll.monster.d2" />
        </div>
      </div>
      <div class="character-and-health">
        <div class="character">
          <transition name="fade">
            <h2 v-if="monster">{{ monster.name }}</h2>
          </transition>
          <transition name="slide">
            <img class="character_image" v-if="monster" :src="monster.img_file" />
            <!-- <audio autoplay v-if="monster" :src="monster.music_file"></audio> -->
          </transition>
          <img class="fire_gif" v-if="this.show_fireball" src="/assets/Fireball_animation.gif" />
        </div>
        <healthbar
          v-if="monster != undefined"
          :amount="this.monster.health"
          :max="this.monster.maxHealth"
        />
      </div>
      <div class="items"></div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
import Dice from "./Dice.vue";
import Healthbar from "./Healthbar.vue";

export default {
  props: ["player"],
  components: {
    dice: Dice,
    healthbar: Healthbar
  },
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
      diceRoll: {
        player: { d1: 0, d2: 0 },
        monster: { d1: 0, d2: 0 }
      },
      show_player_roll: false,
      show_monster_roll: false,
      show_damage_excess: false,
      show_fireball: false,
      show_fireball_button: true,
      show_used_fireball: false
    };
  },
  mounted() {
    eventBus.$on("start-fight", character => {
      this.monster = character.monster;
      this.monster.maxHealth = this.monster.health;
      this.player = character.player;
      this.mermanBattleMusic();
      this.draugrBattleMusic();
      this.ghostBattleMusic();
      this.dragonBattleMusic();
    });
  },
  methods: {
    mermanBattleMusic() {
      if (this.monster.name === "Merman") this.playMermanBattleMusic();
    },
    draugrBattleMusic() {
      if (this.monster.name === "Draugr") this.playDraugrBattleMusic();
    },
    ghostBattleMusic() {
      if (this.monster.name === "Ghost") this.playGhostBattleMusic();
    },
    dragonBattleMusic() {
      if (this.monster.name === "Dragon") this.playDragonBattleMusic();
    },

    combatEnd() {
      if(this.monster == undefined)
        return;
      
      // check if the fight has ended
      const playerWins = this.monster.health <= 0;
      const monsterWins = this.player.health <= 0;

      if (playerWins) {
        this.monster = undefined;
        eventBus.$emit("fight-won", {});
        this.stopMermanMusic();
        this.stopDraugrMusic();
        this.stopGhostMusic();
        this.stopDragonMusic();
      } else if (monsterWins) {
        this.monster = undefined;
        eventBus.$emit("fight-lost", {});
        this.stopMermanMusic();
        this.stopDraugrMusic();
        this.stopGhostMusic();
        this.stopDragonMusic();
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async rollDice() {
      this.playSwordAudio();
      eventBus.$emit("Attack", {});

      // perform the dice rolls
      this.fight_data.player_roll1 = this.numGenerator();
      this.fight_data.player_roll2 = this.numGenerator();
      this.fight_data.monster_roll1 = this.numGenerator();
      this.fight_data.monster_roll2 = this.numGenerator();
      this.diceRoll.player.d1 = this.fight_data.player_roll1;
      this.diceRoll.player.d2 = this.fight_data.player_roll2;
      this.diceRoll.monster.d1 = this.fight_data.monster_roll1;
      this.diceRoll.monster.d2 = this.fight_data.monster_roll2;

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
      await this.sleep(2000);
      this.fight_data.damage_dealt = Math.abs(this.fight_data.player_total_damage-this.fight_data.monster_total_damage)
      console.log("player total damage:", this.fight_data.player_total_damage, "monster total damage:" , this.fight_data.monster_total_damage, "damage dealt:", this.fight_data.damage_dealt)


      this.show_player_roll = true;
      this.show_monster_roll = true;
      await this.sleep(2000)
      this.show_damage_excess = true;
      await this.sleep(4000)
      this.show_player_roll = false;
      this.show_monster_roll = false;
      this.show_damage_excess = false;
      

      
     

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
      this.combatEnd();
    },

    async rollMagicDice() {
      this.show_fireball = true;
      this.show_fireball_button = false;
      this.show_used_fireball_button = true;
      this.playFireballAudio();
      this.fight_data.player_roll1 = this.numGenerator();

      await this.sleep(1000);
      this.show_fireball = false;

      const playerMagicAtk = this.dealDamagetoMonster(
        this.fight_data.player_roll1
      );
      this.combatEnd();
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
      if(this.monster != undefined)
        this.monster.health -= damageAmount;
    },
    dealDamagetoPlayer(damageAmount) {
      if(this.player != undefined)
        this.player.health -= damageAmount;
    },
    playSwordAudio() {
      const buttonSwordAudio = new Audio("/assets/music/sword_impact.mp3");
      buttonSwordAudio.volume = 0.05;
      buttonSwordAudio.play();
    },
    playFireballAudio() {
      const buttonFireballAudio = new Audio("/assets/music/fireball_sound.mp3");
      buttonFireballAudio.volume = 0.05;
      buttonFireballAudio.play();
    },
    playMermanBattleMusic() {
      this.mermanMusic = new Audio("/assets/music/merman_battle.mp3");
      this.mermanMusic.volume = 0.2;
      this.mermanMusic.play();
    },
    playDraugrBattleMusic() {
      this.draugrMusic = new Audio("/assets/music/draugr_battle.mp3");
      this.draugrMusic.volume = 0.2;
      this.draugrMusic.play();
    },
    playGhostBattleMusic() {
      this.ghostMusic = new Audio("/assets/music/ghost_battle.mp3");
      this.ghostMusic.volume = 0.2;
      this.ghostMusic.play();
    },
    playDragonBattleMusic() {
      this.dragonMusic = new Audio("/assets/music/dragon_battle.mp3");
      this.dragonMusic.volume = 0.2;
      this.dragonMusic.play();
    },
    stopMermanMusic() {
      if (this.mermanMusic != undefined) this.mermanMusic.pause();
    },
    stopDraugrMusic() {
      if (this.draugrMusic != undefined) this.draugrMusic.pause();
    },
    stopGhostMusic() {
      if (this.ghostMusic != undefined) this.ghostMusic.pause();
    },
    stopDragonMusic() {
      if (this.dragonMusic != undefined) this.dragonMusic.pause();
    }
  }
};
</script>

<style>
.fight {
  background-image: url("/assets/Background_1.png");
  background-size: cover;
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin: 0px;
  padding: 0px;
}

.combat-box {
  height: 100%;
  width: 40%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.fire_gif {
  height: 50%;
  width: auto;
  position: absolute;
  margin: 0 auto;
  z-index: 3;
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

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.roll_total {
  height: 10%;
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: violet;
}
.damage_excess {
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* background-color: orange; */
  font-size: xx-large;
}

.button_holder {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40%;
}
.attack-button-parent {
  width: 50%;
}
.magic-button-parent {
  width: 50%;
}

.attack_button {
  cursor: pointer;
  height: 90%;
  width: auto;
}
.attack_button:hover {
  height: 100%;
  width: auto;
}
.attack_button:active {
  height: 80%;
  width: auto;
}
.magic_button {
  cursor: pointer;
  height: 90%;
  width: auto;
}
.magic_button:hover {
  height: 100%;
  width: auto;
}
.magic_button:active {
  height: 80%;
  width: auto;
}

.items {
  height: 100%;
  width: 30%;
  height: 100%;
  /* background-color: tomato; */
}
.character-and-health {
  height: 100%;
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

.character {
  height: 85%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
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
  z-index: 2;
}

.damage-dealt {
  height: 100%;
  width: 30%;
  height: 100%;
  /* background-color: yellow; */
}

.damage-dealt-message {
  color: black;
  margin: 30px 0px 0px 0px;
}

.monster {
  float: right;
  margin: 20px;
}
.monster_health {
  margin: auto;
  width: 50%;
  height: 8%;
  /* background-color: #ca812e; */
}
.total_animation-enter-active,
.total_animation-leave-active {
  transition: opacity 0.5s;
}
.total_animation-enter,
.total_animation-leave-to {
  opacity: 0;
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

.dice {
  margin: auto;
  width: 80px;
  display: flex;
  flex-direction: row;
}

/* .background-image {
  height: 50%;
  padding: 0;
  margin: 0;
  position: absolute;
  z-index: 1;
} */
</style>
