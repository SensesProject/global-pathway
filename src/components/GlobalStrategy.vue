<template>
  <div class="global-strategy" ref="vis">
    <LayoutScrollytelling>
            <template v-slot:vis="{ width, height, step }">
            <div class="background">
            <div class="legend-cont">
              <Legend v-if="step === 13"/>
            </div>
            <div class="visualization-container">
            <div v-for="(region, i) in regions" v-bind:key="region + i +'label'" class="single-region" :class="`${region}-region`">
              <svg class="glob_strat" :class="region" :width="groupWidth" :height="svgHeight.height">
                <XAxis :years="years" :height="groupHeight" :margin="margin" :scale="scales.x"/>
                  <g :class="{visibleGraph: region !== country & country !== ''}" :transform="transform" >
                  <text class="region" :x="groupWidth / 2" y="10" text-anchor="middle">{{ icon[i] + ' ' + region }}</text>
                        <transition name="component-fade" mode="out-in">
                          <Strategy :data="regionFilter.strategies[i]" :margin="margin" :x="scales.x" :y="scales.y" :years="years" :currentElement="step"/>
                        </transition>
                        <transition name="component-fade" mode="out-in">
                          <g>
                            <path class="reference_lines area" :class="{inactive: highlight !== 'Policy' && highlight !== ''}" :d="reference[i].RefArea" v-show="step === 4"/>
                            <path class="reference_lines pol_emi" :class="{inactive: highlight !== 'Policy' && highlight !== ''}" :d="reference[i].PolEmi" v-show="step >= 12"/>
                            <path class="reference_lines ref_emi" :class="{inactive: highlight !== 'No-Policy' && highlight !== ''}" :d="reference[i].RefEmi" v-show="step >= 3"/>
                            <path class="reference_lines gross_emi" :class="{inactive: highlight !== 'Gross-Policy' && highlight !== ''}" :d="reference[i].GrossEmi" v-show="step >= 11"/>
                          </g>
                        </transition>
                        <YAxis max="75000" :width="groupWidth" :margin="margin" :scale="scales.y" :step="step"/>
                        <Bars v-show="step >= 0" :data="regionFilter.sectors[i]" :margin="margin" :x="scales.x" :y="scales.y" :height="groupHeight" :currentElement="step"/>
                    </g>
              </svg>
            </div>
          </div>
          </div>
        </template>
        <div slot="text" class="observer">
          <div class="paragraph">
              <h1 class="title">Net-zero Pathways for Industrialized Economies</h1>
              <p>
                To be in line with the Paris goal of limiting global temperature
                rise to 1.5 to 2°C, Industrialized Economies need to move towards
                net-zero CO2 emissions by 2050. This requires a major transition
                to a low-carbon economy in only 30 years. But, how can they achieve
                this? Here, we show simulation results that outline possible mitigation
                pathways towards net-zero CO2 emissions by 2050 for the EU, Japan,
                Australia and the US. With this tool, you will learn about how
                different mitigation strategies could play together for bending
                down CO2 emission trajectories in the respective regions.
              </p>
        </div>
        <IntersectionObserver :step="0" align="left">
        <p>
          Across the four regions, the bulk of annual CO2 emissions currently comes
          from
          <span class="electricity"
          @mouseover="onHover('Electricity')"
          @mouseleave="onHover('')"
          >electricity generation</span>,
          <span class="transport"
          @mouseover="onHover('Transport')"
          @mouseleave="onHover('')"
          >transport</span>,
          <span class="nonelectric"
          @mouseover="onHover('Non-electric Supply')"
          @mouseleave="onHover('')"
          >non-electric supply</span> and from
          <span class="buildings"
          @mouseover="onHover('Buildings')"
          @mouseleave="onHover('')"
          >heating in buildings</span> and
          <span class="industry"
          @mouseover="onHover('Industry')"
          @mouseleave="onHover('')"
          >industry</span>.
          The
          <span class="land"
          @mouseover="onHover('Land-Use Change')"
          @mouseleave="onHover('')"
          >land sector</span> is a small carbon sink in
          each of the regions as afforestation outweighs deforestation.
        </p>
        </IntersectionObserver>
        <IntersectionObserver :step="1" align="left">
        <p>
          Looking at the fingerprint of current emissions, there are also some
          differences across the regions: While about 50% of <span class="country" @mouseover="countryChange('Australia')" @mouseleave="countryChange('')">🇦🇺 Australian</span> CO2 emissions
          come from <span class="electricity">electricity generation</span>,
          this share is only about a quarter in the
          <span class="country" @mouseover="countryChange('EU28')" @mouseleave="countryChange('')">🇪🇺 EU</span>.
          This is due to the extensive use of coal power in Australia, while the EU
          uses a higher percentage of nuclear and renewable power sources.
        </p>
        </IntersectionObserver>
        <IntersectionObserver :step="2" align="left">
        <p>
          The dominance of road travel in the <span class="country" @mouseover="countryChange('US')" @mouseleave="countryChange('')">🇺🇸 US</span> lead to significant share of
          <span class="transport">transport</span> emissions.
          <span class="country" @mouseover="countryChange('Japan')" @mouseleave="countryChange('')">🇯🇵 Japan</span>,
          in contrast, has a relatively small share of transport emission due to
          modern electric rail infrastructure.
        </p>
      </IntersectionObserver>
      <IntersectionObserver :step="3" align="left">
        <p>
          Without additional policies to promote a low-carbon transformation, CO2
          emissions will not reach net-zero by 2050. Instead, emissions are projected
          to decrease only slightly across the four regions under a
          <span class="emissions">current policies</span>
          scenario, leaving a significant emission gap to a carbon-neutral economy.
        </p>
      </IntersectionObserver>
      <IntersectionObserver :step="4" align="left">
        <p>
          What needs to happen to bend down the current emissions trajectory?
          To answer this, we simulated regional pathways for net-zero CO2 emissions
          in 2050. We find that an interplay of different mitigation strategies is
          needed to close the emissions gap to net-zero.
        </p>
      </IntersectionObserver>
      <IntersectionObserver :step="5" align="left">
        <p>
          <span class="EnergyDemandReduction" @mouseover="strategyChange('EnergyDemandReduction')" @mouseleave="strategyChange('')">The first mitigation strategy is to simply use less energy.</span>
          All regions achieve some emission reductions in the net-zero scenario relative to the
          current policies scenario by energy demand reduction through energy
          efficiency improvements and a shift to less energy-intensive consumption.
        </p>
      </IntersectionObserver>
      <IntersectionObserver :step="6" align="left">
        <p>
          Next, <span class="ElectricityDecarbonization" @mouseover="strategyChange('ElectricityDecarbonization')" @mouseleave="strategyChange('')">the decarbonization of electricity saves a significant share of
          emissions.</span> By completely phasing-out coal and gas power for renewable
          electricity in the net-zero scenario, regions can bring down their emissions
          relative to the current policies scenario by a quarter
          (<span class="country" @mouseover="countryChange('US')" @mouseleave="countryChange('')">🇺🇸 US</span>)
          to a third
          (<span class="country" @mouseover="countryChange('Australia')" @mouseleave="countryChange('')">🇦🇺 Australia</span>).
        </p>
      </IntersectionObserver>
      <IntersectionObserver :step="7" align="left">
        <p>
          <span class="Electrification" @mouseover="strategyChange('Electrification')" @mouseleave="strategyChange('')">To reduce emissions beyond the power sector, electrification of energy
          appliances is key.</span> This includes, for example, switching to electric vehicles
          or using heat pumps in buildings and industry (more on electrification in our
          module <a class="extern" href="https://climatescenarios.org/sector-transition/">Towards an Electric Future</a>).
        </p>
      </IntersectionObserver>
      <IntersectionObserver :step="8" align="left">
        <p>
          <span class="Nonelectricitydecarbonization" @mouseover="strategyChange('Nonelectricitydecarbonization')" @mouseleave="strategyChange('')">The remaining energy demand, which cannot be electrified, needs to be switched
          to low-carbon fuels such as hydrogen or biofuels.</span> Moreover, this component
          of non-electricity decarbonization also includes emissions reductions in
          district heating plants and from reduced oil refining relative to the
          current policy scenario.
        </p>
      </IntersectionObserver>
      <IntersectionObserver :step="9" align="left">
        <p>
          <span class="LandUseChangeandCDR" @mouseover="strategyChange('LandUseChangeandCDR')" @mouseleave="strategyChange('')">To attain net-zero CO2, residual energy emissions are compensated by carbon
          dioxide removal (CDR) from the atmosphere.</span> The main methods to generate CDR
          are afforestation (land-use change) and the use of bioenergy with subsequent
          carbon capture and storage (BECCS).
        </p>
      </IntersectionObserver>
      <IntersectionObserver :step="10" align="left">
        <p>
          The significance CDR options may differ across regions. Australia, for
          example, has large land areas available for afforestation and low population
          density. These are promising conditions for scaling up negative emissions.
        </p>
      </IntersectionObserver>
      <IntersectionObserver :step="11" align="left">
        <p>
          It makes sense to differentiate between <span class="gross">gross emissions</span> which do not include
          CDR and net emissions. Large-scale CDR may reduce the need to abate emissions
          in the energy sector (see <span class="country" @mouseover="countryChange('Australia')" @mouseleave="countryChange('')">🇦🇺 Australia</span>).
          However, as CDR options are uncertain, the near-term energy transition should not rely on anticipating future CDR.
        </p>
      </IntersectionObserver>
      <IntersectionObserver :step="12" align="left">
        <p>
          In the <span class="netzero">net-zero scenario</span>, residual gross emissions remain in the transport
          and industry sector, in particular, as these are difficult to decarbonize.
          While in <span class="country" @mouseover="countryChange('Japan')" @mouseleave="countryChange('')">🇯🇵 Japan</span> the decarbonization of industry will be crucial, a key
          challenge for Australia and the US is the low-carbon transition of transport.
        </p>
      </IntersectionObserver>
      <IntersectionObserver :step="13" align="left" class="last-step">
        <p>
          Although CO2 represents the bulk of greenhouse gas (GHG) emissions,
          the above pathways are not necessarily climate-neutral as methane and
          nitrous oxide emissions are not included. To reach GHG neutrality in 2050
          (the current <span class="country" @mouseover="countryChange('EU28')" @mouseleave="countryChange('')">🇪🇺 EU</span> target), CO2 emissions will likely need to be reduced even more.
        </p>
      </IntersectionObserver>
     </div>
  </LayoutScrollytelling>
  <div class="meta-component">
    <div>
      <SensesMeta :id="'countries-pathways'"/>
    </div>
  </div>
  </div>
</template>

<script>
// Libraries
import * as d3 from 'd3'
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
import LayoutScrollytelling from 'library/src/components/LayoutScrollytelling.vue'
import IntersectionObserver from 'library/src/components/IntersectionObserver.vue'
import SensesMeta from 'library/src/components/SensesMeta.vue'

// Data
import DecarbonStrategy from '../assets/data/GlobalStrategy.json'
import Descriptions from '../assets/data/descriptions.json'
import XAxis from './subcomponents/XAxis.vue'
import YAxis from './subcomponents/YAxis.vue'
import Strategy from './Strategies.vue'
import Bars from './Bars.vue'
import Legend from './Legend.vue'

export default {
  name: 'GlobalStrategy',
  components: {
    XAxis,
    YAxis,
    Strategy,
    Bars,
    Legend,
    LayoutScrollytelling,
    IntersectionObserver,
    SensesMeta
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
    ...mapActions(['storeHighlight', 'storeCountry']),
    groupHeight () {
      return this.innerHeight / 2
    },
    svgHeight () {
      const { innerWidth, innerHeight, groupHeight } = this
      let height = innerHeight / 2
      let y = groupHeight / 5

      if (innerWidth < 600) {
        height = innerHeight - groupHeight / 3
      } else if (innerWidth >= 600 && innerWidth <= 1024) {
        height = groupHeight / 2
        y = groupHeight - groupHeight / 5
      } else {
        height = this.innerHeight / 2
      }
      return { height, y }
    },
    transform () {
      const { margin } = this
      return this.innerWidth < 600 ? 'translate(' + (margin.left + 4) + ',' + margin.top + ')' : 'translate(' + margin.left + ',' + margin.top + ')'
    },
    groupWidth () {
      const { innerWidth } = this
      let width = innerWidth

      if (innerWidth < 600) {
        width = innerWidth
      } else if (innerWidth >= 600 && innerWidth <= 1024) {
        width = innerWidth / 2
      } else {
        width = innerWidth / 4
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
          .rangeRound([this.groupHeight, -20])
      }
    },
    linegenerator: function () {
      const { x, y } = this.scales
      const years = this.years
      return d3
        .line()
        .x((d, i) => x(years[i] - 0.6))
        .curve(d3.curveLinear)
        .y(d => (y(d)))
    },
    areagenerator: function () {
      const { x, y } = this.scales
      const years = this.years
      return d3.area()
        .x((d, i) => x(years[i] - 0.6))
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
          variable: variables[d],
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
    },
    onHover (highlight) {
      return this.$store.dispatch('newHighlight', highlight)
    },
    countryChange (country) {
      return this.$store.dispatch('newCountry', country)
    },
    strategyChange (strategy) {
      return this.$store.dispatch('newStrategy', strategy)
    },
    getStepsPos () {
      const divs = document.getElementsByClassName('intersection-observer')
      const steps = []
      _.map(divs, (div, d) => {
        steps.push(div.offsetTop)
      })
    }
  },
  mounted () {
    this.innerSizes()
    window.addEventListener('resize', this.innerSizes, false)
    this.getStepsPos()
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
@import "../assets/style/pathways.scss";

.global-strategy {
  // max-width: 1300px;
  height: 95vh;
  margin: 0 auto;

  .meta-component {
    width: 1200px;
    height: 500px;
    margin: 10% auto;
  }

  .legend-cont {
    width: 35%;
    // height: 90%;
    padding-top: 20px;
    padding-left: 2rem;
    position: absolute;
    bottom: 30px;
    }

  .background {
    display: inline-flex;
    width: 100%;
    height: 100%;
  }

  .visualization-container {
    width: 60%;
    padding-top: 20px;
    position: absolute;
    right: 0;
  }

  .label {
    margin: 0 auto;
    padding: 0px;
    padding-top: 50px;
    border-right: 1px solid black;

    .label_rows {
      width: 100%;
      height: 60%;

      .text {
        width: 100%;
      }
    }

    .legend-row {
      padding-left: 20px;
      width: 100%;
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

  .intersection-observer {
    padding: 10vh 2rem 20vh;

    &.last-step {
      padding-bottom: 150vh;
    }
  }
  .country {
    text-decoration: underline;
  }

  .emissions {
    color: $color-red;
  }

  .gross {
    color: getColor(blue, 40);
  }

  .netzero {
    color: $pol-emi;
    text-decoration: none;
    border-bottom: 2px solid $pol-emi;
  }

  .electricity {
    color: $electricity-stroke;
  }

  .transport {
    color: $transport-stroke;
  }

  .buildings {
    color: $building-stroke;
  }

  .nonelectric {
    color: $non-electric-stroke;
  }

  .industry {
    color: $industry-stroke;
  }

  .land {
    color: $landchange-stroke;
  }

  .BECCS {
    color: $BECCS-stroke;
  }

  .decarb {
    color: $color-yellow;
  }

  .Nonelectricitydecarbonization {
    text-decoration: none;
    color: #294c80;
  }

  .EnergyDemandReduction {
    text-decoration: none;
    color: #9295c3;
  }

  .ElectricityDecarbonization {
    text-decoration: none;
    color: #a26f6e;
  }

  .Electrification {
    text-decoration: none;
    color: #d67d39;
  }

  .LandUseChangeandCDR {
    text-decoration: none;
    color: #a9ac73;
  }
}

.single-region {
  // width: 50%;
  // height: 40%;
  display: inline-flex;
  padding: 0px;
  padding-left: 50px;

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

      &.inactive {
        opacity: 0.8;
      }
    }
  }

  .graphic-line {
    stroke-width: 1px;
  }

  .reference-labels {
    font-size: 10px;
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
