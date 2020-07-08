<template>

  <div class="health-bar">
    <div class="number" style="z-index: 1; position: absolute; " >{{this.displayAmount}}</div>
    <div class="health" v-bind:style="{ width: cssPercent }"></div>
  </div>
</template>

<script>
export default {
  props: ["amount", "max"],
  data() {
    return {
      displayAmount: 0
    };
  },
  computed: {
    cssPercent() {
      let percent = (100 * parseInt(this.displayAmount)) / parseInt(this.max);
      if (percent < 0) percent = 0;
      if (percent > 100) percent = 100;
      return `${percent}%`;
    }
  },
  mounted() {
    this.displayAmount = this.amount;
  },
  ready() {
    this.displayAmount = this.amount;
  },
  watch: {
    amount() {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        if (this.displayAmount < this.amount) {
          this.displayAmount++;
        } else if (this.displayAmount > this.amount) {
          this.displayAmount--;
        } else {
          clearInterval(this.interval);
        }
      }, 10);
    }
  }
};
</script>

<style>
.number {
  color: rgb(211, 243, 243);
  text-align: right;
}
.health-bar {
  border: 2px solid black;
  background-color: red;
  width: 80%;
  text-align: left;
  height: 25px;
  margin-bottom: 3px;
}

.health {
  background-color: green;
  height: 100%;
  padding: 0;
  margin: 0;
  z-index: 2;
}
</style>
