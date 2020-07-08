<template>
  <div class="fight">
    <div class="combat-box">
      <!-- player box -->
      
      <div class="items">
          <transition name="fade">
            <img class="backpack_image" v-if="player.items.length" src="/assets/Backpack.png"/>
          </transition>
          <transition name="fade">
            <div class="backpack" v-if="player.items.length" > 
              <ul>
                <li v-for="(item, key) in player.items" :key="key">
                  <img :src="item.img_file" width="32px" />
                    {{ item.name }}
                  <span style="font-size: 0.5em;">({{ item.modifierDescription }})</span>
                </li>
              </ul>
            </div>
          </transition>
      </div>
      <div class="character-and-health">
        <div class="character">
          <h2>{{ player.name }}</h2>
          <div class="character_image_parent">
            <transition name="heroslash">
              <img class="hero_slash" v-if="this.show_hero_slash" src="/assets/hero_slash.svg" />
            </transition>
            <img :class="this.monsterDamageIsActive ? 'character_image__active' : 'character_image'" :src="player.image" /> 
 
          </div>
        </div>
        <healthbar :amount="player.health" max="100" />
      </div>
      <div class="damage-dealt">
        <div class="damage-dealt-message"></div>
        <div class="dice" v-if="monster">
          <dice :number="diceRoll.player.d1" />
          <dice :number="diceRoll.player.d2" />
        </div>
      </div>
    </div>
    <div class="damage-box">
      <div class="damage_animation-parent">
        <div class="roll_total">
          <transition name="total_animation">
            <span id="hero_total_text" class="total_animation" v-if="this.show_player_roll">{{this.fight_data.player_total_damage}}</span>
          </transition>
        </div>
        <div class="damage_excess">
          <transition name="damage_excess_animation">
            <span style ="color: #e60000" v-if="this.show_damage_excess">{{this.fight_data.damage_dealt}}</span>
          </transition>
        </div>
        <div class="roll_total">
          <transition name="total_animation">
            <span id="monster_total_text" class="total_animation" v-if="this.show_monster_roll">{{this.fight_data.monster_total_damage}}</span>
          </transition>
        </div>
      </div>
      <div class="button_holder">
        <div class="attack-button-parent" v-if="monster">
          <transition name="fade">
            <img class="attack_button" style="z-index: 2; position: absolute;" v-if="show_attack_button" v-on:click="rollDice" src="/assets/atk.png" />
          </transition>
            <img class="button_used" style="z-index: 1; position: absolute;" src="/assets/atk_used.png" />
        </div>
        <div class="magic-button-parent" v-if="monster">
          <transition name="fade">
            <img
              class="magic_button"
              style="z-index: 2; position: absolute;"
              v-if="this.show_fireball_button"
              v-on:click="this.rollMagicDice"
              src="/assets/fireballwithmagic.png"
            />
          </transition>
          <transition name="fade">
            <img class="magic_button_used" v-if="monster" src="/assets/fireball_used.png"/>
          </transition>
        </div>
      </div>
    </div>
    <div class="combat-box">
      <!-- monster box -->

   <div class="damage-dealt">
        <div class="damage-dealt-message"></div>
        <div class="dice" v-if="monster">
          <dice :number="diceRoll.monster.d1" />
          <dice :number="diceRoll.monster.d2" />
        </div>
        <div class="damage-dealt-message">
          <i v-if="monster">"{{ monster.taunt }}"</i>
        </div>
      </div>
      <div class="character-and-health">
        <div class="character">
          <transition name="fade">
            <h2 v-if="monster">{{ monster.name }}</h2>
          </transition>
          <div class="character_image_parent">
            <transition name="monsterslash">
              <img class="monster_slash" v-if="this.show_monster_slash" src="/assets/monster_slash.svg" />
            </transition>
            <transition name="slide">
              <img :class="this.heroDamageIsActive ? 'character_image__active' : 'character_image'" v-if="monster" :src="monster.img_file" />
            </transition>
          </div>

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
      roundInProgress: false,
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
      show_attack_button: false,
      show_used_attack: false,
      show_fireball: false,
      show_fireball_button: false,
      show_used_fireball: false,
      show_hero_slash: false,
      show_monster_slash: false,
      monsterDamageIsActive: false,
      heroDamageIsActive: false,
    };
  },
  mounted() {
    eventBus.$on("start-fight", character => {
      this.monster = character.monster;
      this.monster.maxHealth = this.monster.health;
      this.player = character.player;
      this.show_fireball_button = true
      this.show_attack_button = true

      this.mermanBattleMusic();
      this.draugrBattleMusic();
      this.ghostBattleMusic();
      this.dragonBattleMusic();
      this.hydraBattleMusic();
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
    hydraBattleMusic() {
      if (this.monster.name === "Hydra") this.playDraugrBattleMusic();
    },

    combatEnd() {
      if (this.monster == undefined) return;

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

      this.roundInProgress = false;
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async rollDice() {
      if (this.roundInProgress) return;
      this.roundInProgress = true;
      this.show_attack_button = false
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
      await this.sleep(1000);
      this.fight_data.damage_dealt = Math.abs(
        this.fight_data.player_total_damage -
          this.fight_data.monster_total_damage
      );
      console.log(
        "player total damage:",
        this.fight_data.player_total_damage,
        "monster total damage:",
        this.fight_data.monster_total_damage,
        "damage dealt:",
        this.fight_data.damage_dealt
      );

      const playerWinsRound =
        this.fight_data.player_total_damage >
        this.fight_data.monster_total_damage;

      const monsterWinsRound =
        this.fight_data.player_total_damage <
        this.fight_data.monster_total_damage;

      const draw = 
        this.fight_data.player_total_damage ===
        this.fight_data.monster_total_damage;

      if (draw) this.fight_data.damage_dealt ="DRAW"

      this.show_player_roll = true;
      await this.sleep(500);
      this.show_monster_roll = true;
      await this.sleep(2000);
      this.show_damage_excess = true;
      await this.sleep(1000);
      if (playerWinsRound) this.show_hero_slash = true;
      if (monsterWinsRound) this.show_monster_slash = true
      await this.sleep(1000);
      if (monsterWinsRound) this.monsterDamageIsActive = true
      if (playerWinsRound) this.heroDamageIsActive = true;
      if (!draw) await this.sleep(1000);
      if (monsterWinsRound) this.monsterDamageIsActive = false
      if (playerWinsRound) this.heroDamageIsActive = false
      this.show_monster_slash = false;
      this.show_hero_slash = false;
      this.show_player_roll = false;
      this.show_monster_roll = false;
      this.show_damage_excess = false;

      if (playerWinsRound) {
        this.dealDamagetoMonster(
          this.fight_data.player_total_damage -
            this.fight_data.monster_total_damage
        );
      }

      if (monsterWinsRound) {
        this.dealDamagetoPlayer(
          this.fight_data.monster_total_damage -
            this.fight_data.player_total_damage
        );
      }
      this.show_attack_button = true
      this.combatEnd();

    },

    async rollMagicDice() {
      if (this.roundInProgress) return;
      this.roundInProgress = true;

      this.show_fireball = true;
      this.show_fireball_button = false;
      this.show_used_fireball_button = true;
      this.playFireballAudio();
      this.fight_data.player_roll1 = 5 + this.numGenerator();
      await this.sleep(1000);
      this.heroDamageIsActive = true
      await this.sleep(1000);
      this.show_fireball = false;
      this.heroDamageIsActive = false

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
      if (this.monster != undefined) this.monster.health -= damageAmount;
    },
    dealDamagetoPlayer(damageAmount) {
      if (this.player != undefined) this.player.health -= damageAmount;
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
  font-weight: bold;
}

.damage_excess {
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
}

.button_holder {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40%;
}

.attack-button-parent {
  width: 100%;
  display: flex;
}

.magic-button-parent {
  width: 50%;
  display: flex;
}

.attack_button {
  cursor: pointer;
  height: 13%;
  width: auto;
  margin-left: 15px;
}

.attack_button:hover {
  height: 13.5%;
  width: auto;
}

.attack_button:active {
  height: 13%;
  width: auto;
}

.magic_button {
  cursor: pointer;
  height: 13%;
  width: auto;
}

.magic_button_used {
    height: 13%;
    width: auto;
    z-index: 1; 
    position: absolute; 
}

.magic_button:hover {
  height: 13.5%;
  width: auto;
}

.magic_button:active {
  height: 13%;
  width: auto;
}

.button_used {
  height: 13%;
  width: auto;
  z-index: 1; 
  position: absolute;
  margin-left: 15px;

}

.backpack {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 50%;
  background-color: rgba(123, 126, 124, 0.637);
  border-radius: 10px;
  overflow: scroll;
}

.backpack ul {
width: 100%;
padding: 0;
padding-top: 5vh;
box-sizing: border-box;
display: flex;
flex-direction: column;
height: 100%;
margin: 0;
}

.backpack li {
  list-style-type: none;
  color: white;
  margin: 5px;
}

.backpack li img {
  float: left;
  filter: drop-shadow(3px 3px 5px #00000078) drop-shadow(-3px -4px 5px #000000a3);
}

.backpack_image{
  width: auto;
  height: 30%;
  z-index: 3;
  transform: translateY(30%);
}

.items {
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  color: rgb(211, 243, 243);
}

@keyframes breathing {
  from {
    height: 100%;
  }

  to {
    height: 98%;
  }
}
.character_image_parent {
  height: 70%;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

.hero_slash {
  width: auto;
  height: 30%;
  z-index: 0;
  margin-bottom: -60%;
  animation-duration: 0.05s;
  animation-name: slash_flash;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  margin-left: 2500%;
}

@keyframes slash_flash {
  from {
    filter: brightness(0) saturate(100%) invert(78%) sepia(46%) saturate(615%)
      hue-rotate(159deg) brightness(108%) contrast(103%);
  }

  to {
    filter: brightness(0) saturate(100%) invert(20%) sepia(56%) saturate(6020%)
      hue-rotate(293deg) brightness(96%) contrast(125%);
  }
}

.monster_slash {
  width: auto;
  height: 30%;
  z-index: -9;
  margin-bottom: -60%;
  animation-duration: 0.05s;
  animation-name: monsterslash_flash;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  margin-right: 2500%;
}

@keyframes monsterslash_flash {
  from {
    filter: brightness(0) saturate(100%) invert(27%) sepia(83%) saturate(3099%) hue-rotate(342deg) brightness(82%) contrast(115%);
  }

  to {
    filter: none
  }
}

#monster_total_text{
  animation-duration: 0.5s;
  animation-name: monsterslash_flash;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  margin-left: 40%
}

#hero_total_text{
  animation-duration: 0.5s;
  animation-name: slash_flash;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  margin-right: 40%
}

.total_animation{
 font-size: 0px;
}

.character_image {
  height: 100%;
  width: auto;
  animation-duration: 1s;
  animation-name: breathing;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  z-index: 2;
}

.character_image__active {
  height: 100%;
  width: auto;
  animation-duration: 1s;
  animation-name: breathing;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  z-index: 2;
  animation-duration: 0.1s;
  animation-name: damage_hit;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  
}

@keyframes damage_hit {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.damage-dealt {
  height: 100%;
  width: 30%;
  height: 100%;
}

.damage-dealt-message {
  color: rgb(211, 243, 243);
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
}

.heroslash-enter {
  margin-left: 0%;
}
.heroslash-enter-active {
  transition: margin-left 2s ease-in;
}

.monsterslash-enter {
  margin-right: 0%;
}
.monsterslash-enter-active {
  transition: margin-right 2s ease-in;
}


.total_animation-enter {
  font-size: 500px;
}
.total_animation-enter-active {
  transition: font-size 3s ;
}

.damage_excess_animation-enter {
  font-size: 500px;
}
.damage_excess_animation-enter-active {
  transition: font-size 3s ;
}

.slide-enter-active {
  transition: margin-left 1s;
  transition-timing-function: ease-out;
}
.slide-enter {
  margin-left: 400px;
}

.slide-leave-active {
  transition: margin-bottom 1s;
}

.slide-leave-to {
  margin-bottom: -200%
}



.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
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


</style>
