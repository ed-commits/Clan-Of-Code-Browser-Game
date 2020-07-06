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
    background: rgb(223, 167, 13);
  border: 2px solid black;
  width: 30px;
  height: 30px;
  margin: 3px;
  text-align: center;
  font-size: 1.3rem;
}
</style>
