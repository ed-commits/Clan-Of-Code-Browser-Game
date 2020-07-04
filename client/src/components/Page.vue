<template>
  <div >
    <h1>{{ page.name }}</h1>
    <pre>{{ page.narrative_text }}</pre> //pre stands for pre-formatted text so carriage returns are not removed
  </div>
</template>

<script>
export default {
  props: ["page"]
};
</script>

<style>
pre {
  
}


</style>
