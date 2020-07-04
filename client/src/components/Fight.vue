<template>
  <div class="fight">{{ player.health }}</div>
</template>

<script>

export default {
  props: ['player']

}
</script>

<style>
.fight {
    outline: 2px solid red;
    height: 50%;
    width: 100%;
}
</style>
