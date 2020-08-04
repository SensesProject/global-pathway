<template>
  <div class="global-strategy" ref="vis">
    <div v-for="(region, i) in regions" v-bind:key="region + i +'label'" class="single-region" :class="`${region}-region`">
      <svg class="glob_strat" :class="region" :width="groupWidth" :height="svgHeight.height">
        <XAxis :years="years" :height="groupHeight" :margin="margin" :scale="scales.x"/>
        <text class="region" :x="groupWidth / 2 + 10" :y="svgHeight.y" text-anchor="middle">{{ icon[i] + ' ' + region }}</text>
          <g :class="{visibleGraph: region !== country & country !== ''}" :transform="transform" >
              <transition name="component-fade" mode="out-in">
                <Strategy :data="regionFilter.strategies[i]" :margin="margin" :x="scales.x" :y="scales.y" :years="years"/>
              </transition>
              <transition name="component-fade" mode="out-in">
                <g>
                  <path class="reference_lines area" :class="{inactive: highlight !== 'Policy' && highlight !== ''}" :d="reference[i].RefArea" v-show="currentElement === 4"/>
                  <path class="reference_lines pol_emi" :class="{inactive: highlight !== 'Policy' && highlight !== ''}" :d="reference[i].PolEmi" v-show="currentElement >= 12"/>
                  <path class="reference_lines ref_emi" :class="{inactive: highlight !== 'No-Policy' && highlight !== ''}" :d="reference[i].RefEmi" v-show="currentElement >= 3"/>
                  <path class="reference_lines gross_emi" :class="{inactive: highlight !== 'Gross-Policy' && highlight !== ''}" :d="reference[i].GrossEmi" v-show="currentElement >= 11"/>
                </g>
              </transition>
              <YAxis max="75000" :width="groupWidth" :margin="margin" :scale="scales.y"/>
              <Bars v-show="currentElement >= 0" :data="regionFilter.sectors[i]" :margin="margin" :x="scales.x" :y="scales.y" :height="groupHeight"/>
          </g>
      </svg>
    </div>
    <div class="label" :class="{storyinactive: open === false}">
      <div class="mobile-togglers">
        <p v-if="innerWidth < 600" class="togglenav" v-on:click="open = !open">{{ open === true ? 'close' : 'open'}}</p>
        <p v-if="innerWidth < 600" class="togglestory" v-on:click="(story = true) & (legend = false)">Story</p>
        <p v-if="innerWidth < 600" class="togglelegend" v-on:click="(legend = true) & (story = false)">Legend</p>
      </div>
      <div class="description label_rows" :class="{showlegend: open === true}">
        <Selector :descriptions="Descriptions"/>
          <TextBlocks v-show="innerWidth < 600 ? legend === false & story === true : true"/>
      </div>
      <div class="legend legend-row" v-show="innerWidth < 600 ? open === true & legend === true & story === false : true">
        <Legend :element="currentElement"/>
      </div>
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
      icon: ['🇦🇺', '🇪🇺', '🇯🇵', '🇺🇸'],
      margin: {
        left: 15,
        top: 10,
        bottom: 10,
        right: 15
      },
      innerWidth: 0,
      innerHeight: 0,
      story: true,
      legend: false,
      open: true
    }
  },
  computed: {
    ...mapState(['currentElement', 'highlight', 'country']),
    groupHeight () {
      return this.innerHeight - (this.innerHeight / 3)
    },
    svgHeight () {
      const { innerWidth, innerHeight, groupHeight } = this
      let height = innerWidth
      let y = groupHeight - (groupHeight / 8)

      if (innerWidth < 600) {
        height = innerHeight - groupHeight / 3
      } else if (innerWidth >= 600 && innerWidth <= 1024) {
        height = groupHeight - groupHeight / 5
        y = groupHeight - groupHeight / 5
      } else {
        height = this.innerHeight - (this.innerHeight / 3)
      }
      return { height, y }
    },
    transform () {
      const { margin } = this
      return this.innerWidth < 600 ? 'translate(' + (margin.left + 4) + ',' + margin.top + ')' : 'translate(' + margin.left + ',' + margin.top + ')'
    },
    groupWidth () {
      const { innerWidth, margin } = this
      let width = innerWidth

      if (innerWidth < 600) {
        width = innerWidth - (margin.left + margin.right)
      } else if (innerWidth >= 600 && innerWidth <= 1024) {
        width = innerWidth / 2.5
      } else {
        width = innerWidth / 5
      }
      return width
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
        .x((d, i) => x(years[i] - 1))
        .curve(d3.curveLinear)
        .y(d => (y(d)))
    },
    areagenerator: function () {
      const { x, y } = this.scales
      const years = this.years
      return d3.area()
        .x((d, i) => x(years[i] - 1))
        .curve(d3.curveLinear)
        .y0(d => (y(0)))
        .y1(d => (y(d)))
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
          RefEmi: this.linegenerator(_.map(line[2], l => l.value)),
          RefArea: this.areagenerator(_.map(line[2], l => l.value))
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

  }
}

svg {

  g {
    &.visibleGraph {
      opacity: 0.4;
    }
  }
  text {
    font-family: $font-mono;

    &.region {
      font-size: 14px;
      text-anchor: middle;
    }
  }

  .graphic-line {
    stroke-width: 1px;
  }

  .reference_lines {
    fill: none;
    stroke: $color-violet;
    stroke-width: 1.5px;
    transition: stroke-opacity 0.5s;
    transition-delay: 0.5s;

    &.inactive {
      stroke-opacity: 0;
      transition: stroke-opacity 0.5s;
      transition-delay: 0.5s;
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

  &.area {
    stroke: none;
    fill: #FFE5F1;
    fill-opacity: 0.5;
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

@media only screen and (max-width: 600px) {
  .global-strategy {

    .single-region {
      height: 50%;
    }

    .US-region {
      svg {
        margin-bottom: 50% !important;
      }
    }

    .label {
      border-top: 1px solid $color-neon;
      &.storyinactive {
        width: 100%;
        height: 180px !important;
        transition: height 0.5s;
      }

    }

    .showlegend {
      height: 20% !important;
    }

    .mobile-togglers {
      margin: 0 auto;
      text-align: center;

      .togglestory, .togglelegend, .togglenav {
        display: inline-flex;
        cursor: pointer;
        padding-top: 5px;
        text-align: center;
        text-transform: uppercase;
        font-size: 12px;
        align-self: center;
      }

      .togglenav, .togglestory {
        padding-right: 40px;
      }
    }
    .description {
      padding: 0 auto;

      p {
        margin: 0;
      }
    }
  }
}
</style>
