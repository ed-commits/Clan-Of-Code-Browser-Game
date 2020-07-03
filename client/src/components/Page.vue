<template>
  <div>
      <h1>{{ page.name }}</h1>
      <p>{{ page.narrative_text }}</p>
      </div>
</template>

<script>
export default {
  props: ["page"]
};
</script>

<style>
</style>
