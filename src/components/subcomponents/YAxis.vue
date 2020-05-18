<template>
  <g class="y-axis">
    <line v-for="(value, i) in valueTicks" :key="`${i}lines`" :y1="scale(value.value)" :y2="scale(value.value)" x1="0" :x2="width - (margin.right * 2)" />
    <text v-for="(value, i) in valueTicks" :key="`${i}text`" :y="scale(value.value) - 10" x="-10">{{value.label}}%</text>
  </g>
</template>

<script>
import { map } from 'lodash'
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
      const rangeNum = [-0.5, -0.25, 0, 0.25, 0.5, 0.75, 1]
      return map(rangeNum, r => {
        return {
          label: r * 100,
          value: r
        }
      })
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
