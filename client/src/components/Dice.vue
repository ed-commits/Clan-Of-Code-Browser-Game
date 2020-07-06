<template>
  <div class="dicebox">{{ displayNumber }}</div>
</template>

<script>
export default {
  data() {
    return {
      displayNumber: 0,
      interval: undefined
    };
  },
  props: ["number"],
  ready() {
    this.displayNumber = this.number;
  },
  watch: {
    number() {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        if (this.displayNumber != this.number)
          this.displayNumber = Math.ceil(Math.random() * 10);
      }, 15);
    }
  }
};
</script>

<style>
.dicebox {
  border: 1px solid black;
  width: 30px;
  height: 30px;
  text-align: center;
}
</style>
