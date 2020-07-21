<template>
  <div class="global-strategy" ref="vis">
    <div v-for="(region, i) in regions" v-bind:key="region + i +'label'" class="single-region">
      <svg class="glob_strat" :class="region" :width="groupWidth" :height="groupHeight">
        <XAxis :years="years" :height="groupHeight" :margin="margin" :scale="scales.x"/>
        <text class="region" :x="groupWidth / 2 + 10" :y="groupHeight -( groupHeight / 8)" text-anchor="middle">{{ region }}</text>
          <g :transform="`translate(${margin.left}, ${margin.top * 2})`">
              <transition name="component-fade" mode="out-in">
                <Strategy :data="regionFilter.strategies[i]" :margin="margin" :x="scales.x" :y="scales.y" :years="years"/>
              </transition>
              <transition name="component-fade" mode="out-in">
                <g>
                  <path class="reference_lines pol_emi" :class="{inactive: highlight !== 'Policy' && highlight !== ''}" :d="reference[i].PolEmi" v-show="currentElement >= 4 && currentElement < 7 || currentElement === 13"/>
                  <path class="reference_lines ref_emi" :class="{inactive: highlight !== 'No-Policy' && highlight !== ''}" :d="reference[i].RefEmi" v-show="currentElement >= 3"/>
                  <path class="reference_lines gross_emi" :class="{inactive: highlight !== 'Gross-Policy' && highlight !== ''}" :d="reference[i].GrossEmi" v-show="currentElement >= 4 && currentElement < 7 || currentElement === 13"/>
                </g>
              </transition>
              <Bars v-show="currentElement >= 0" :data="regionFilter.sectors[i]" :margin="margin" :x="scales.x" :y="scales.y" :height="groupHeight"/>
              <YAxis max="75000" :width="groupWidth" :margin="margin" :scale="scales.y"/>
          </g>
      </svg>
    </div>
    <div class="label">
      <div class="description label_rows">
        <Selector :descriptions="Descriptions"/>
          <TextBlocks />
      </div>
      <div class="legend legend-row"><Legend :element="currentElement"/></div>
    </div>
  </div>
</template>

<script>
// Libraries
import * as d3 from 'd3'
import _ from 'lodash'
import { mapState } from 'vuex'

// Data
import DecarbonStrategy from '../assets/data/GlobalStrategy.json'
import Descriptions from '../assets/data/descriptions.json'
import XAxis from './subcomponents/XAxis.vue'
import YAxis from './subcomponents/YAxis.vue'
import Strategy from './Strategies.vue'
import Selector from './subcomponents/Selector.vue'
import Bars from './Bars.vue'
import Legend from './Legend.vue'
import TextBlocks from './TextBlocks.vue'

export default {
  name: 'GlobalStrategy',
  components: {
    XAxis,
    YAxis,
    Strategy,
    Bars,
    Legend,
    Selector,
    TextBlocks
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
    ...mapState(['currentElement', 'highlight']),
    groupHeight () {
      return this.innerHeight < 2000 ? this.innerHeight - (this.innerHeight / 4) : this.innerHeight / 2
    },
    groupWidth () {
      const { innerWidth, margin } = this
      return innerWidth < 600 ? innerWidth - (margin.left + margin.right) : innerWidth / 5
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
          .rangeRound([0, this.groupWidth - (this.margin.left + this.margin.right)]),
        y: d3
          .scaleLinear()
          .domain([-1.5, 1.5])
          .rangeRound([this.groupHeight, 0])
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
      this.innerWidth = Math.max(totalWidth, 100)
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
  height: 80vh;
  margin: 0 auto;

  .label {
    margin: 0 auto;
    padding: 0px;
    display: flex;
    height: 40%;

    .label_rows {
      width: 45%;

      .text {
        width: 100%;
      }
    }

    .legend-row {
      padding-left: 20px;
      width: 55%;
    }

    .legend {
      height: 90%;
    }
  }

  .description {
    // display: inline-flex;
    padding: 0px 20px;
    height: 100%;

    p {
      margin-left: 10px;
      width: 90%;
    }
  }
}

.single-region {
  width: 25%;
  height: 80%;
  display: inline-flex;
  padding: 10px;
  padding-left: 40px;

  .region_label {
    width: 20%;
    top: 100%;
    position: absolute;

    .region {
      font-size: 12px;
      text-transform: uppercase;
      text-align: center;
    }
  }
}

svg {
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

    &.inactive {
      stroke-opacity: 0.2;
    }

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
