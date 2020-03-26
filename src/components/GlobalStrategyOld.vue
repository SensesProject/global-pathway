<template>
  <div class="global-strategy">
    <svg class="glob_strat"
    :width="innerWidth"
    :height="innerHeight"
    :transform="`translate(${margin.left / 2},0)`">
      <g :transform="`translate(${margin.left + 10},${this.innerHeight / 10})`">
        <g :transform="`translate(0,${margin.bottom * 2.5})`">
            <YAxis
            :scale='scales.y'
            :width='chartWidth - margin.left'
            :height= 'innerHeight - (innerHeight / 5)'
            />
            <path
              v-for="(chunk, i) in stackData"
              v-bind:key="i"
              :d="chunk.d"
              :fill="chunk.color"
              :stroke="chunk.stroke"
              :id="chunk.id"
              class="emission__chunks"
            />
        </g>
        <XAxis
        :scale='scales.x'
        :x='innerHeight - (innerHeight / 5)'
        :width='chartWidth - margin.left'
        />
      </g>
    </svg>
    <div class="selector">
       <img id="colorslegend" src="../assets/legend/colors-coding.svg" />
    </div>
  </div>
</template>

<script>
// Libraries
import * as d3 from 'd3'
// import { group, groups, rollup, rollups } from 'd3-array'
import _ from 'lodash'

// Data
import DecarbonStrategy from '../assets/data/waterfall-toydata.json'

// Components
import YAxis from './subcomponents/YAxis.vue'
import XAxis from './subcomponents/XAxis.vue'

export default {
  name: 'GlobalStrategy',
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
  components: {
    XAxis,
    YAxis
  },
  data () {
    return {
      DecarbonStrategy,
      modelSelected: 'REMIND',
      scenariosSelected: 'IC_80_noCDR',
      margin: {
        left: 150,
        top: 30,
        bottom: 30,
        right: 30
      }
    }
  },
  computed: {
    innerWidth () {
      return this.width - this.margin.left
    },
    chartWidth () {
      return this.innerWidth - this.margin.left - 30
    },
    innerHeight () {
      return this.height - this.margin.top
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
          .rangeRound([0, this.chartWidth - this.margin.left]),
        y: d3
          .scaleLinear()
          .domain([0, 65000])
          .rangeRound([this.innerHeight - (this.innerHeight / 3), 0])
      }
    },
    areaGenerator: function () {
      const { x, y } = this.scales
      return d3
        .area()
        .x(d => x(d.data.Year))
        .curve(d3.curveCardinal)
        .y0(d => y(d[0]))
        .y1(d => y(d[1]))
    },
    scenariosArray () {
      const data = this.DecarbonStrategy
      const scenarios = []
      _.map(data, (l) => {
        scenarios.push(l.Scenario)
      })
      return _.uniq(scenarios)
    },
    filterData () {
      const newData = this.DecarbonStrategy
      const scenario = this.scenariosSelected
      const selectData = _.filter(newData, { Scenario: scenario })
      return selectData
    },
    stackData () {
      const newData = this.filterData
      const stacked = d3.stack().keys(this.strategies.map(d => d.key))(newData)
      const paths = stacked.map((d, i) => ({
        d: this.areaGenerator(d),
        id: this.strategies[i].key,
        color: this.strategies[i].color,
        stroke: this.strategies[i].stroke
      }))
      return paths
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";

.selector {
  margin: 100px auto  10px auto;
  max-width: 860px;
  padding-top: 30px;

  #selector-position {
    margin: 0 auto;
  }

  #scenario {
    margin-left: 5px;
  }

  #select {
    position: absolute;
  }

  #colorslegend {
    margin-left: 330px;
  }
}

.global-strategy {
  height: 100vh;
  margin: 0 auto;
}

svg {
  margin: 0 auto;
  text {
    font-family: $font-mono;
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

/*Media queries*/

@media screen and (min-width: 1600px)  {
    .global-strategy {
      width: 55%;
      height: 90%;
      margin: 0 auto;
    }

    svg {
      margin-top: 150px;
    }

    .scenarioselect {
      margin-top: 150px;
    }

}

</style>
