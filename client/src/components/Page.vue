<template>
  <div>
    <!-- <h1>{{ page.name }}</h1> -->
    <pre>{{ page.narrative_text }}</pre>
  </div>
</template>

<script>
export default {
  props: ["page"]
};
</script>

<style>
pre {
  font-family: "Fondamento";
  white-space: pre-wrap;
  word-break: keep-all;
}
</style>
