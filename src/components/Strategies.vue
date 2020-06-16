<template>
  <g class="chunks">
    <path
    v-for="(path, i) in paths"
    :key="`${i}chunk`"
    :class="[
    path.strategy,
    {noselection: path.strategy != visible[i]}
    ]"
    :d="path.path"/>
    <path
    v-for="(path, i) in paths"
    :key="`${i}line`"
    class="border"
    :class="[path.strategy,
    {noselection: path.strategy != visible[i]}
    ]"
    :d="path.line"/>
  </g>
</template>

<script>
import * as d3 from 'd3'
import { map, uniq, filter } from 'lodash'
import { mapState } from 'vuex'

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
    ...mapState(['currentStrategy', 'currentElement']),
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
    },
    visible () {
      const strategies = []
      if (this.currentElement === 8) {
        strategies.push('EnergyDemandReduction')
        return strategies
      } if (this.currentElement === 9) {
        strategies.push('EnergyDemandReduction', 'ElectricityDecarbonization')
      } if (this.currentElement === 10) {
        strategies.push('EnergyDemandReduction', 'ElectricityDecarbonization', 'Electrification')
      } if (this.currentElement === 11) {
        strategies.push('EnergyDemandReduction', 'ElectricityDecarbonization', 'Electrification', 'Nonelectricitydecarbonization')
      } if (this.currentElement === 12) {
        strategies.push('EnergyDemandReduction', 'ElectricityDecarbonization', 'Electrification', 'Nonelectricitydecarbonization', 'LandUseChangeandCDR')
      } if (this.currentElement >= 13) {
        strategies.push('EnergyDemandReduction', 'ElectricityDecarbonization', 'Electrification', 'Nonelectricitydecarbonization', 'LandUseChangeandCDR', 'PolicyEmissions')
      }
      return strategies
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
path {
  fill-opacity: 0.2;
  transition: visibility fill-opacity, 0.5s;

  &.visible {
    fill-opacity: 0.3;
    transition: fill-opacity 0.5s;
  }

  &.PolicyEmissions {
    fill: none;
  }
  &.ElectricityDecarbonization,
  &.Electrification {
    fill: #ffd89a;
  }

  &.LandUseChangeandCDR {
    fill: #A3EAA6;
  }
  &.Nonelectricitydecarbonization,
  &.EnergyDemandReduction {
    fill: #a3d1ea;
  }

  &.border {
    fill: none;

    &.invisible {
      stroke-opacity: 0.2;
    }

    &.PolicyEmissions {
      stroke: #dd5f84;
    }

    &.ElectricityDecarbonization,
    &.Electrification {
      stroke: #ffd89a;
    }

    &.LandUseChangeandCDR {
      stroke: #A3EAA6;
    }

    &.EnergyDemandReduction,
    &.Nonelectricitydecarbonization,
    &.LandUseChangeandCDR {
      stroke: #a3d1ea;
    }

  }
}

.noselection {
  visibility: hidden;
}

</style>
