<template>
  <g>
    <g class="labels" v-for="(label, i) in labels" v-bind:key="i">
      <line
      class='axis'
      x1='0'
      :x2='width'
      :y1='label.y'
      :y2='label.y'
      />
      <text
      text-anchor="end"
      :class="label"
      x='-10'
      :y='label.y + 3'
      >
      {{ label.perc }}
    </text>
    </g>
</g>
</template>

<script>
import map from 'lodash/map'

export default {
  name: 'YAxis',
  props: ['width', 'height', 'scale'],
  computed: {
    labels: function () {
      const labels = [
        [0],
        [10000],
        [20000],
        [30000],
        [40000],
        [50000],
        [60000]
      ]

      return map(labels, pair => {
        const [perc] = pair
        return {
          y: this.scale(perc),
          perc
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/variables.scss";

.axis {
  stroke: getColor(gray, 50);
  stroke-dasharray: 4px 2px;

}

</style>
