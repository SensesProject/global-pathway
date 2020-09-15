<template>
  <g>
    <defs>
    <linearGradient id="MyGradient" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="red" stop-opacity="0.1" />
      <stop offset="30%" stop-color="white" stop-opacity="0" />
    </linearGradient>
    </defs>
    <text :transform="`rotate(-90,20,30)`" x="35" :y="width - 10" class="labelaxis" v-show="step >= 3">Emissions (% 2020)</text>
    <rect x="20" :width="rectWidth" height="50" :y="scale(valueTicks[2].value) - 50"/>
  <g class="y-axis">
    <line v-for="(value, i) in valueTicks" :key="`${i}lines`" :class="value.value === 0 ? 'zero' : ''" :y1="scale(value.value)" :y2="scale(value.value)" x1="20" :x2="width - (margin.right * 2)" />
    <text v-for="(value, i) in valueTicks" :key="`${i}text`" :y="scale(value.value)" x="15">{{value.label}}%</text>
  </g>
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
    },
    step: {
      type: Number
    }
  },
  computed: {
    rectWidth () { return this.width - (this.margin.right * 2) - 20 },
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

  &.zero {
    stroke: $color-red;
  }
}

rect {
  fill: url(#MyGradient);
}

text {
  text-anchor: end;
  font-size: 10px;
  fill: $color-gray;

  &.labelaxis {
    // transform:  translateX(-50%) translateY(-50%) rotate(-90);
  }
}
</style>
