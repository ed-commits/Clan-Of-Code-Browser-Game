<template>
  <div class="narrative">
    <buttons />
    Narrative
  </div>
</template>

<script>
import Buttons from './Buttons.vue'

export default {
    components: {
    "buttons": Buttons
    }
}
</script>

<style>
.narrative {
  outline: 2px solid green;
  height: 50%;
  width: 100%;
}
</style>
