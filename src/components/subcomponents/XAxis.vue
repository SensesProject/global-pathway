<template>
  <g class="x-axis" :transform="`translate(0, ${height - (margin.bottom * 10)})`">
    <line :x1="scale(2020)" :x2="scale(2050)" y1="0" y2="0" />
    <rect v-for="year in yearsTicks" v-bind:key="year" y="0" :x="scale(year)" width="2px" height="6px"/>
    <text v-for="year in yearsTicks" v-bind:key="year + 'text'" y="20" :x="scale(year)">{{year}}</text>
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
      // return this.years.map(y => y)
      return [2020, 2050]
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

line {
  stroke: $color-gray;
}

text {
  text-anchor: middle;
  font-size: 10px;
}
</style>
