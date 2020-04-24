<template>
  <div class="global-strategy" ref="vis">
    <div v-for="(region, i) in regions" v-bind:key="region + i +'label'">
      <div class="label">
        <div class="highlight">{{ region }}</div>
        <p class="description">{{ Descriptions[i][element] }}</p>
      </div>
      <svg class="glob_strat" :class="region" :width="innerWidth" :height="groupHeight">
      <g :transform="`translate(${margin.left}, 0)`">
        <transition name="component-fade" mode="out-in">
          <Strategy v-show="element > 2" :data="regionFilter.strategies[i]" :margin="margin" :x="scales.x" :y="scales.y" :years="years"/>
        </transition>
        <transition name="component-fade" mode="out-in">
        <g v-show="element > 1">
          <path class="reference_lines pol_emi" :d="reference[i].PolEmi"/>
          <path class="reference_lines ref_emi" :d="reference[i].RefEmi"/>
          <path class="reference_lines gross_emi" :d="reference[i].GrossEmi"/>
        </g>
      </transition>
        <Bars v-show="element >= 1" :data="regionFilter.sectors[i]" :margin="margin" :x="scales.x" :y="scales.y" :height="groupHeight"/>
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
import DecarbonStrategy from '../assets/data/GlobalStrategy.json'
import Descriptions from '../assets/data/descriptions.json'
import XAxis from './subcomponents/XAxis.vue'
import YAxis from './subcomponents/YAxis.vue'
import Strategy from './Strategies.vue'
import Bars from './Bars.vue'

export default {
  name: 'GlobalStrategy',
  components: {
    XAxis,
    YAxis,
    Strategy,
    Bars
  },
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    element: {
      type: Number,
      required: false
    }
  },
  data () {
    return {
      DecarbonStrategy,
      Descriptions,
      regions: _.uniq(_.map(DecarbonStrategy, (s) => s.region)),
      years: _.uniq(_.map(DecarbonStrategy, (s) => s.period)),
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
    groupHeight () {
      return this.innerHeight / (this.regions.length - 1)
    },
    regionFilter () {
      const reference = _.map(this.regions, r => { return _.filter(this.referenceFilter, (data, d) => { return data.region === r }) })
      const sector = _.map(this.regions, r => { return _.filter(this.sectorFilter, (data, d) => { return data.region === r }) })
      const strategy = _.map(this.regions, r => { return _.filter(this.strategyFilter, (data, d) => { return data.region === r }) })

      return {
        references: reference,
        sectors: sector,
        strategies: strategy
      }
    },
    referenceFilter () { return _.filter(this.DecarbonStrategy, (ref, r) => ref.parent === 'reference') },
    strategyFilter () { return _.filter(this.DecarbonStrategy, (ref, r) => ref.parent === 'strategy') },
    sectorFilter () { return _.filter(this.DecarbonStrategy, (ref, r) => ref.parent === 'sector') },
    referenceVariables () { return _.uniq(_.map(this.referenceFilter, (s) => s.variable)) },
    scales () {
      return {
        x: d3
          .scaleLinear()
          .domain([2015, 2050])
          .rangeRound([0, this.innerWidth - (this.margin.left + this.margin.right)]),
        y: d3
          .scaleLinear()
          .domain([-1.5, 1.5])
          .rangeRound([this.groupHeight - this.margin.bottom, 0])
      }
    },
    linegenerator: function () {
      const { x, y } = this.scales
      const years = this.years
      return d3
        .line()
        .x((d, i) => x(years[i]))
        .curve(d3.curveLinear)
        .y(d => (y(d)))
    },
    reference () {
      const { references } = this.regionFilter
      const variables = this.referenceVariables

      return _.map(references, (data, d) => {
        const line = _.map(variables, v => { return _.filter(data, vari => { return vari.variable === v }) })
        return {
          variable: variables,
          GrossEmi: this.linegenerator(_.map(line[0], l => l.value)),
          PolEmi: this.linegenerator(_.map(line[1], l => l.value)),
          RefEmi: this.linegenerator(_.map(line[2], l => l.value))
        }
      })
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

  .description {
    margin-top: 10px;
  }
}

svg {
  margin: 40px auto;
  text {
    font-family: $font-mono;
  }

  .graphic-line {
    stroke-width: 1px;
  }

  .reference_lines {
    fill: none;
    stroke: $color-violet;
    stroke-width: 1.5px;

  &.gross_emi {
    stroke: getColor(blue, 40);
    stroke-dasharray: 4 2;
  }

  &.pol_emi {
    stroke: getColor(blue, 60);
  }

  &.ref_emi {
    stroke: $color-red;
  }
  }
}

.inactive {
  stroke: none;
  fill-opacity: 0.5;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
