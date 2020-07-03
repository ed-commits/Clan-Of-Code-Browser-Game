<template>
  <span>{{button.button_text}}</span>
</template>

<script>
export default {
  props: ["button"]
};
</script>

<style>
.buttons {
  outline: 2px solid blue;
}
</style>
