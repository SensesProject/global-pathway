<template>
  <g class="chunks">
    <path
    v-for="(path, i) in paths"
    :key="`${i}chunk`"
    :class="[
    path.strategy,
    {noselection: path.strategy != visible[i],
    nohighlight: path.strategy !== highlight && highlight !== ''
    }
    ]"
    :d="path.path"/>
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
    years: Array,
    currentElement: Number
  },
  computed: {
    ...mapState(['currentStrategy', 'highlight']),
    strategies: function () {
      return uniq(map(this.data, d => d.variable))
    },
    areaGenerator: function () {
      const { x, y } = this
      return d3
        .area()
        .x(d => x(d.period - 0.6))
        // .curve(d3.curveLinear)
        .y0(d => y(d.floor))
        .y1(d => y(d.ceiling))
    },
    line: function () {
      const { x, y } = this
      return d3
        .line()
        .x(d => x(d.period - 1))
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
      if (this.currentElement === 5) {
        strategies.push('EnergyDemandReduction')
        return strategies
      } if (this.currentElement === 6) {
        strategies.push('EnergyDemandReduction', 'ElectricityDecarbonization')
      } if (this.currentElement === 7) {
        strategies.push('EnergyDemandReduction', 'ElectricityDecarbonization', 'Electrification')
      } if (this.currentElement === 8) {
        strategies.push('EnergyDemandReduction', 'ElectricityDecarbonization', 'Electrification', 'Nonelectricitydecarbonization')
      } if (this.currentElement === 9) {
        strategies.push('EnergyDemandReduction', 'ElectricityDecarbonization', 'Electrification', 'Nonelectricitydecarbonization', 'LandUseChangeandCDR')
      } if (this.currentElement >= 10) {
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
  fill-opacity: 0.3;
  transition: fill-opacity, 0.5s;
  transition-delay: 0.5s;

  &.visible {
    fill-opacity: 0.3;
    transition: fill-opacity 0.5s;
    transition-delay: 0.5s;
  }

  &.PolicyEmissions {
    fill: none;
  }
  &.ElectricityDecarbonization {
    fill: #a26f6e;
  }

  &.Electrification {
    fill: #d67d39;
  }

  &.LandUseChangeandCDR {
    fill: #5c8c5f;
  }

  &.Nonelectricitydecarbonization {
    fill: #294c80;
  }

  &.EnergyDemandReduction {
    fill: #9295c3;
  }

  &.border {
    transition: stroke-opacity 0.5s;
    transition-delay: 0.5s;
    fill: none;

    &.invisible {
      stroke-opacity: 0.2;
    }

    &.ElectricityDecarbonization {
      stroke: #a26f6e;
    }

    &.Electrification {
      stroke: #d67d39;
      // stroke: #ffd89a;
    }

    &.LandUseChangeandCDR {
      stroke: #5c8c5f;
    }

    &.EnergyDemandReduction {
      stroke: #9295c3;
    }

    &.Nonelectricitydecarbonization {
      stroke: #294c80;
    }

    &.LandUseChangeandCDR {
      stroke: #5c8c5f;
      // stroke: #a3d1ea;
    }

  }
}

.noselection, .nohighlight {
  fill-opacity: 0;
  stroke-opacity: 0;
  transition: fill-opacity stroke-opacity, 0.5s;
  transition-delay: 0.5s;
}

</style>
