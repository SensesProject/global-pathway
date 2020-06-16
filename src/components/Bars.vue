<template>
  <g class="bars">
    <g v-for="(year, y) in years" :key="`${y}-group`">
      <g v-for="(el, i) in year" :key="`${i}-group`"
      :class="{invisible: currentElement < 4 && el.period != 2020 || currentElement === 4 && el.period != 2020 && (el.variable === 'BECCS' || el.variable === 'Land-Use Change')}">
      <rect
      :class="
      [el.variable,
      {nostep: currentElement >= 3 | currentElement === 0 ? currentSector[i] != el.variable : currentSector != el.variable }
      ]"
      width="10"
      :height="el.height"
      :x="el.period === 2050 ? x(el.period - 1.5) : x(el.period - 1.5)"
      :y="el.position"
      />
      <line class="thick"
      :class="
      [el.variable,
      {nostep: currentElement >= 3 | currentElement === 0 ? currentSector[i] != el.variable : currentSector != el.variable }
      ]"
      :x1="el.period === 2050 ? x(el.period - 1.5) : x(el.period - 1.5)"
      :x2="el.period === 2050 ? x(el.period - 1.5) + 10 : x(el.period - 1.5) + 10"
      :y1="el.y"
      :y2="el.y"
      />
      <text
      :class="[el.variable,
      {invisible: currentElement >= 3 | currentElement === 0 ? true : currentSector != el.variable }
      ]"
      :x="el.period === 2050 ? x(2043) : x(2022)"
      :y="el.y">
        {{el.roundvalue + '%'}}
      </text>
      </g>
    </g>
  </g>
</template>

<script>
import * as d3 from 'd3'
import { map, filter } from 'lodash'
import { mapState } from 'vuex'

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
      positions: [2015, 2050],
      currentSector: ['Land-Use Change', 'BECCS', 'Transport', 'Buildings', 'Electricity', 'Non-electric Supply', 'Industry']
    }
  },
  computed: {
    ...mapState(['currentElement']),
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
              roundvalue: Math.round(row.value * 100),
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
  },
  watch: {
    currentElement (current, previous) {
      if (current === 1) {
        this.currentSector = 'Electricity'
      } else if (current === 2) {
        this.currentSector = 'Transport'
      } else {
        this.currentSector = map(this.stackData[0].value, d => { return d.variable })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";
@import "../assets/style/pathways.scss";

svg {
  .invisible {
    visibility: hidden;
  }

  .nostep {
    fill-opacity: 0.1;
    stroke-opacity: 0.1;
  }
}

rect {
  fill-opacity: 0.7;

  &.Change {
    fill: $landchange;
  }

  &.BECCS {
    fill: $BECCS;
  }

  &.Transport {
    fill: $transport;
  }

  &.Industry {
    fill: $industry;
  }

  &.Electricity {
    fill: $electricity;
  }

  &.Buildings {
    fill: $building;
  }

  &.Non-electric {
    fill: $non-electric;
  }

}

line {
  stroke-width: 1.5px;

  &.Change {
    stroke: $landchange-stroke;
  }

  &.BECCS {
    stroke: $BECCS-stroke;
  }

  &.Transport {
    stroke: $transport-stroke;
  }

  &.Industry {
    stroke: $industry-stroke;
  }

  &.Electricity {
    stroke: $electricity-stroke;
  }

  &.Buildings {
    stroke: $building-stroke;
  }

  &.Non-electric {
    stroke: $non-electric-stroke;
  }

}
</style>
