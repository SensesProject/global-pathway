<template>
  <g class="x-axis">
    <!-- <line x1="0" :x2="scale(2050)" :y1="height - margin.bottom" :y2="height - margin.bottom" /> -->
    <rect v-for="year in yearsTicks" v-bind:key="year" :y="height - (margin.bottom * 8)" :x="scale(year)" width="2px" height="6px"/>
    <text v-for="year in yearsTicks" v-bind:key="year + 'text'" :y="height - (margin.bottom * 6)" :x="scale(year)">{{year}}</text>
  </g>
</template>

<script>
export default {
  name: 'XAxis',
  props: {
    height: {
      type: Number,
      default: 0
    },
    margin: {
      type: Object
    },
    scale: {
      type: Function
    },
    years: {
      type: Array
    }
  },
  computed: {
    yearsTicks () {
      return this.years.map(y => y)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";

rect {
  fill: $color-gray;
}

text {
  text-anchor: middle;
  font-size: 10px;
}
</style>
