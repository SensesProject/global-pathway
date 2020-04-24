<template>
  <g class="bars">
    <g v-for="(year, y) in years" :key="`${y}-group`">
      <rect v-for="(el, i) in year" :key="`${i}-rect`"
      :class="el.variable"
      width="10"
      :height="el.height"
      :x="x(el.period)"
      :y="el.position"
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
          const sortedData = d.sort((a, b) => b.key - a.key).reverse()
          const sortedValues = sortedData.map(d => d.value)
          return sortedData.map(function (row, i) {
            const floor = i === 0 ? 0 : sortedValues.slice(0, i).reduce((a, b) => a + b)
            const ceiling = sortedValues.slice(0, i + 1).reduce((a, b) => a + b)
            return {
              variable: row.variable,
              value: row.value,
              period: row.period,
              floor: floor,
              ceiling: ceiling,
              position: row.value < 0 ? y(Math.min(0, floor)) : y(Math.max(floor, ceiling)),
              height: Math.abs(y(ceiling) - y(floor))
            }
          })
        })
        .entries(this.data)
    },
    ungroup () { return map(this.stackData, kv => kv.value).reduce((x, y) => x.concat(y)) }

  },
  mounted () {
    console.log('here I am!')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
rect {
  fill-opacity: 0.4;
  fill: blue;
  stroke: blue;
}
</style>
