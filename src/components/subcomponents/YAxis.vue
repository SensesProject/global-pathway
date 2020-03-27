<template>
  <g class="y-axis">
    <line v-for="value in valueTicks" v-bind:key="value" :y1="scale(value)" :y2="scale(value)" x1="0" :x2="width - (margin.right * 2)" />
    <text v-for="value in valueTicks" v-bind:key="value + 'text'" :y="scale(value) - 10" x="2">{{value}}</text>
  </g>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'YAxis',
  props: {
    width: {
      type: Number,
      default: 0
    },
    margin: {
      type: Object
    },
    scale: {
      type: Function
    },
    max: {
      type: String
    }
  },
  computed: {
    valueTicks () {
      return _.range(0, this.max, 15000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";

line {
  stroke: $color-gray;
  stroke-dasharray: 1 2;
}

text {
  text-anchor: start;
  font-size: 10px;
  fill: $color-gray;
}
</style>
