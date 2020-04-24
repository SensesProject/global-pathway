<template>
  <g class="chunks">
    <path v-for="(path, i) in paths" :key="`${i}chunk`" :class="path.strategy" :d="path.path"/>
    <path v-for="(path, i) in paths" :key="`${i}line`" class="border" :class="path.strategy" :d="path.line"/>
  </g>
</template>

<script>
import * as d3 from 'd3'
import { map, uniq, filter } from 'lodash'

export default {
  name: 'Strategies',
  props: {
    data: Array,
    x: Function,
    y: Function,
    margin: Object,
    years: Array
  },
  computed: {
    strategies: function () {
      return uniq(map(this.data, d => d.variable))
    },
    areaGenerator: function () {
      const { x, y } = this
      return d3
        .area()
        .x(d => x(d.period))
        // .curve(d3.curveLinear)
        .y0(d => y(d.floor))
        .y1(d => y(d.ceiling))
    },
    line: function () {
      const { x, y } = this
      return d3
        .line()
        .x(d => x(d.period))
        .curve(d3.curveLinear)
        .y(d => y(d.ceiling))
    },
    nest () {
      const nest = d3.nest()
        .key(d => d.variable)
        .rollup(d => d.map(e => e.value).reduce((a, b) => a + b))
        .entries(this.data)

      return nest
    },
    sortedEl () {
      const nest = this.nest
      return nest.sort((a, b) => b.value - a.value)
    },
    keys () { return map(this.nest, a => a.key) },
    stackData () {
      // const sortedEl = this.sortedEl
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
              period: row.period,
              floor: floor,
              ceiling: ceiling
            }
          })
        })
        .entries(this.data)
    },
    ungroup () { return map(this.stackData, kv => kv.value).reduce((x, y) => x.concat(y)) },
    paths () {
      return map(this.strategies, strategy => {
        const selData = filter(this.ungroup, d => d.variable === strategy)
        return {
          strategy: strategy.replace(/\s+/g, ''),
          path: this.areaGenerator(selData),
          line: this.line(selData)
        }
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
path {
  fill-opacity: 0.3;

  &.PolicyEmissions {
    fill: #dd5f84;
  }

  &.Electrification {
    fill: #ffd89a;
  }

  &.EnergyDemandReduction,
  &.ElectricityDecarbonization,
  &.Nonelectricitydecarbonization,
  &.LandUseChangeandCDR {
    fill: #a3d1ea;
  }

  &.border {
    fill: none;

    &.PolicyEmissions {
      stroke: #dd5f84;
    }

    &.Electrification {
      stroke: #ffd89a;
    }

    &.EnergyDemandReduction,
    &.ElectricityDecarbonization,
    &.Nonelectricitydecarbonization,
    &.LandUseChangeandCDR {
      stroke: #a3d1ea;
    }

  }

}
</style>
