<template>
  <div class="global-strategy" ref="vis">
    <div v-for="(scenario, i) in scenarios" v-bind:key="scenario +'label'">
      <div class="label"><div class="highlight">{{ scenario }}</div></div>
      <svg class="glob_strat"
        :class="scenario"
        :data="logSome"
        :width="innerWidth"
        :height="groupHeight"
      >
      <g :transform="`translate(${margin.left}, 0)`">
        <path v-for="(path, p) in paths[i]" v-bind:key="p + 'path'"
          class="chunks"
          :class="path.klass[p]"
          :d="path.d"
          :fill="path.color[p]"
        />
        <path v-for="(line, l) in lines[i]" v-bind:key="l + 'line'"
          class="graphic-line"
          :d="line"
          fill="none"
          :stroke="strokes[l]"
        />
        <XAxis :years="years" :height="groupHeight" :margin="margin" :scale="scales.x"/>
        <YAxis max="75000" :width="innerWidth" :margin="margin" :scale="scales.y"/>
      </g>
      </svg>
    </div>
  </div>
</template>

<script>
// Libraries
import * as d3 from 'd3'
import _ from 'lodash'

// Data
import DecarbonStrategy from '../assets/data/waterfall-toydata.json'

import XAxis from './subcomponents/XAxis.vue'
import YAxis from './subcomponents/YAxis.vue'

export default {
  name: 'GlobalStrategy',
  components: {
    XAxis,
    YAxis
  },
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      DecarbonStrategy,
      scenarios: _.uniq(_.map(DecarbonStrategy, (s) => s.Scenario)),
      years: _.uniq(_.map(DecarbonStrategy, (s) => s.Year)),
      margin: {
        left: 15,
        top: 10,
        bottom: 10,
        right: 15
      },
      innerWidth: 0,
      innerHeight: 0
    }
  },
  computed: {
    logSome () {
      console.log('hello stranger!')
      console.log(this.lines)
      console.log(this.strokes)
      return 0
    },
    groupHeight () {
      return this.innerHeight / this.scenarios.length
    },
    strategies: function () {
      return [
        { key: 'Emi|CO2|Policy', color: '#FFADC1', stroke: '#AC0030' },
        { key: 'Abatement|Electrification', color: '#FFE3BA', stroke: '#D09236' },
        { key: 'Abatement|CDR', color: '#A9CDD5', stroke: '#2C889D' },
        { key: 'Abatement|Energy Demand Reduction', color: '#A9CDD5', stroke: '#2C889D' },
        { key: 'Abatement|Fuel Decarbonization', color: '#A9CDD5', stroke: '#2C889D' },
        { key: 'Abatement|Electricity Decarbonization', color: '#A9CDD5', stroke: '#2C889D' }
      ]
    },
    scales () {
      return {
        x: d3
          .scaleLinear()
          .domain([2015, 2050])
          .rangeRound([0, this.innerWidth - (this.margin.left + this.margin.right)]),
        y: d3
          .scaleLinear()
          .domain([0, 75000])
          .rangeRound([this.groupHeight - this.margin.bottom, 0])
      }
    },
    areaGenerator: function () {
      const { x, y } = this.scales
      const years = this.years
      return d3
        .area()
        .x((d, i) => x(years[i]))
        .curve(d3.curveLinear)
        .y0(d => y(d[0]))
        .y1(d => y(d[1]))
    },
    lineGenerator: function () {
      const { x, y } = this.scales
      const years = this.years
      return d3
        .line()
        .x((d, i) => x(years[i]))
        .curve(d3.curveLinear)
        .y(d => y(d[1]))
    },
    filterData () {
      return _.map(this.scenarios, (s) => { return _.filter(this.DecarbonStrategy, d => d.Scenario === s) })
    },
    paths () {
      return _.map(this.filterData, (d, i) => {
        const stacked = d3.stack().keys(this.strategies.map(d => d.key))(d)
        const path = _.map(stacked, (path, p) => {
          return {
            d: this.areaGenerator(path),
            klass: _.map(this.strategies, e => e.key),
            color: _.map(this.strategies, e => e.color)
          }
        })
        return path
      })
    },
    lines () {
      return _.map(this.filterData, (d, i) => {
        const stacked = d3.stack().keys(this.strategies.map(d => d.key))(d)
        const lines = _.map(stacked, (line, l) => {
          return this.lineGenerator(line)
        })
        return lines
      })
    },
    strokes () {
      return _.map(this.strategies, e => e.stroke)
    }
  },
  methods: {
    innerSizes () {
      const { vis: el } = this.$refs
      const totalWidth = el.clientWidth
      const totalHeight = el.clientHeight || el.parentNode.clientHeight
      this.innerWidth = Math.max(totalWidth, 500)
      this.innerHeight = Math.max(totalHeight, 500)
    }
  },
  mounted () {
    this.innerSizes()
    window.addEventListener('resize', this.innerSizes, false)
  },
  updated () {
    this.innerSizes()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.innerSizes, false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";

.global-strategy {
  height: 200vh;
  margin: 0 auto;

  .label {
    border-bottom: 1px solid $color-violet;
    padding: 10px;
  }
}

svg {
  margin: 40px auto;
  text {
    font-family: $font-mono;
  }

  .graphic-line {
    stroke-width: 1.5px;
  }

  .chunks {
    fill-opacity: 0.5;
  }
}

path {
  stroke-width: 1;
  fill-opacity: 0.7;
}

.inactive {
  stroke: none;
  fill-opacity: 0.5;
}

text {
  transition: y 1s;
}
</style>
