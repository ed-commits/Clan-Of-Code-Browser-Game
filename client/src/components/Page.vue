<template>
  <div>
    <h1>{{ page.name }}</h1>
    <pre>{{ page.narrative_text }}</pre>//pre stands for pre-formatted text so carriage returns are not removed
  </div>
</template>

<script>
export default {
  props: ["page"]
};
</script>

<style>
pre {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  white-space: pre-wrap;
  word-break: keep-all;
}
</style>
