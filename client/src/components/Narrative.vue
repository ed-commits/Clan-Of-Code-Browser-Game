<template>
  <div class="narrative">
    <page v-for=" (page, index) in pages" :key="index" :page="page" />
    <buttons />
    Narrative
  </div>
</template>

<script>
import Buttons from './Buttons.vue'
import Page from './Page.vue'

export default {
    components: {
    "buttons": Buttons,
    "page": Page
    },
    props: ["pages"]
}
</script>

<style>
.narrative {
  outline: 2px solid green;
  height: 50%;
  width: 100%;
}
</style>
