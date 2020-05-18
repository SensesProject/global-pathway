<template>
  <g class="bars">
    <g v-for="(year, y) in years" :key="`${y}-group`">
      <rect v-for="(el, i) in year" :key="`${i}-rect`"
      :class="el.variable"
      width="10"
      :height="el.height"
      :x="el.period === 2050 ? x(el.period) : x(el.period) - 10"
      :y="el.position"
      />
      <line v-for="(thick, t) in year" :key="`${t}-thick`"
      class="thick"
      :class="thick.variable"
      :x1="thick.period === 2050 ? x(thick.period) : x(thick.period) - 10"
      :x2="thick.period === 2050 ? x(thick.period) + 10 : (x(thick.period) - 10) + 10"
      :y1="thick.y"
      :y2="thick.y"
      />
    </g>
  </g>
</template>

<script>
import * as d3 from 'd3'
import { map, filter } from 'lodash'

export default {
  name: 'Bars',
  props: {
    data: Array,
    x: Function,
    y: Function,
    margin: Object,
    height: Number
  },
  data () {
    return {
      // linea 265 nei dati ha un problema "-1.48E-06", temporaneamente cambiato a valore x simile
      positions: [2015, 2050]
    }
  },
  computed: {
    years () {
      return {
        firstYear: filter(this.ungroup, d => d.period === 2020),
        lastYear: filter(this.ungroup, d => d.period === 2050)
      }
    },
    nest () {
      const nest = d3.nest()
        .key(d => d.variable)
        .rollup(d => d.map(e => e.value).reduce((a, b) => a + b))
        .entries(this.data)

      return nest
    },
    sortedNest () {
      const nest = this.nest
      return nest.sort((a, b) => b.value - a.value)
    },
    keys () { return map(this.nest, a => a.key) },
    stackData () {
      const y = this.y
      return d3.nest()
        .key(d => d.period)
        .rollup(function (d) {
          const sortedData = d.sort((a, b) => b.key - a.key)
          const sortedValues = sortedData.map(d => d.value)
          return sortedData.map(function (row, i) {
            const diff = sortedValues.filter(v => v < 0).reduce((a, b) => a + b, 0)
            const ceiling = sortedValues.slice(0, i + 1).reduce((a, b) => Math.abs(a) + Math.abs(b)) + diff

            const floorH = i === 0 ? 0 : sortedValues.slice(0, i).reduce((a, b) => a + b)
            const ceilingH = sortedValues.slice(0, i + 1).reduce((a, b) => a + b)
            return {
              variable: row.variable,
              value: row.value,
              period: row.period,
              position: row.variable === 'Land-Use Change' ? y(sortedValues[1]) : y(ceiling),
              y: row.variable === 'Land-Use Change' ? y(sortedValues[1]) : y(ceiling),
              height: Math.abs(y(ceilingH) - y(floorH))
            }
          })
        })
        .entries(this.data)
    },
    ungroup () { return map(this.stackData, kv => kv.value).reduce((x, y) => x.concat(y)) }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";

rect {
  fill-opacity: 0.4;

  &.Change {
    fill: getColor(green, 80);
  }

  &.BECCS {
    fill: getColor(green, 40);
  }

  &.Transport {
    fill: getColor(orange, 20);
  }

  &.Industry {
    fill: getColor(orange, 100);
  }

  &.Electricity {
    fill: getColor(orange, 60);
  }

  &.Buildings {
    fill: getColor(orange, 40);
  }

  &.Non-electric {
    fill: getColor(orange, 80);
  }

}

line {
  stroke-width: 1.5px;

  &.Change {
    stroke: getColor(green, 40);
  }

  &.BECCS {
    stroke: getColor(green, 20);
  }

  &.Transport {
    stroke: getColor(orange, 0);
  }

  &.Industry {
    stroke: getColor(orange, 80);
  }

  &.Electricity {
    stroke: getColor(orange, 40);
  }

  &.Buildings {
    stroke: getColor(orange, 20);
  }

  &.Non-electric {
    stroke: getColor(orange, 60);
  }

}
</style>
