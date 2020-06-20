<template>
  <div class="legend">
  <svg width="100%" height="100%" viewBox="-10 0 825 190" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Artboard" transform="translate(-21, -30)">
            <transition name="fade">
              <g id="emissions" transform="translate(242, 30)" v-show="element >= 3">
                  <g id="ref" transform="translate(42, 41)" v-show="element >= 3">
                      <text id="Reference" font-size="12" font-weight="normal" letter-spacing="0.0669642" fill="#000000">
                          <tspan x="74" y="12">Reference</tspan>
                      </text>
                      <line x1="0.5" y1="8" x2="57" y2="7.5" id="Path-4-Copy" stroke="#AC0030" stroke-width="3"></line>
                  </g>
                  <g id="pol" transform="translate(42, 68)" v-show="element >= 4">
                      <text id="Policy" font-size="12" font-weight="normal" letter-spacing="0.0669642" fill="#000000">
                          <tspan x="74" y="12">Policy</tspan>
                      </text>
                      <line x1="0.5" y1="8" x2="57" y2="7.5" id="Path-4-Copy-2" stroke="#64D7FC" stroke-width="3"></line>
                  </g>
                  <g id="gross-pol" transform="translate(42, 95)" v-show="element >= 4">
                      <text id="Gross-Policy" font-size="12" font-weight="normal" letter-spacing="0.0669642" fill="#000000">
                          <tspan x="74" y="12">Gross Policy</tspan>
                      </text>
                      <line x1="0.5" y1="8" x2="57" y2="7.5" id="Path-4-Copy-3" stroke="#4189A0" stroke-width="3" stroke-dasharray="6,2"></line>
                  </g>
                  <g id="Group-2">
                      <line x1="104.472973" y1="77.5" x2="-50.2094595" y2="77.75" id="Path-5-Copy" stroke="#644FFF" transform="translate(27, 78) rotate(-90) translate(-27, -78) "></line>
                      <text id="CO2" transform="translate(9, 78) rotate(-90) translate(-9, -78) " font-size="10" font-weight="normal" letter-spacing="0.0558035" fill="#644FFF">
                          <tspan x="-1" y="79">CO2</tspan>
                      </text>
                  </g>
              </g>
            </transition>
            <transition name="fade">
              <g id="strategies" transform="translate(479, 30)" v-show="element >= 8">
                  <g id="Electrification" transform="translate(41, 97)" @mouseover="onClick('Electrification')" @mouseleave="onClick('')"  v-show="element >= 10">
                      <g id="Group">
                          <g id="Group-6">
                              <rect id="Rectangle" fill="#FFE3BA" x="0" y="0" width="14" height="15"></rect>
                              <line x1="0" y1="0.5" x2="14" y2="0.5" id="Path-4" stroke="#D09236" stroke-width="3"></line>
                              <text id="Electrification" font-size="12" font-weight="normal" letter-spacing="0.0669642" fill="#000000">
                                  <tspan x="31" y="12">Electrification</tspan>
                              </text>
                          </g>
                      </g>
                  </g>
                  <g id="EnergyDemandReduction" transform="translate(41, 0)" @mouseover="onClick('EnergyDemandReduction')" @mouseleave="onClick('')"  v-show="element >= 8">
                      <rect id="Rectangle" fill-opacity="0.2" fill="#A3D1EA" x="0" y="0" width="14" height="15"></rect>
                      <line x1="0" y1="0.5" x2="14" y2="0.5" id="Path-4" stroke="#A3D1EA" stroke-width="4"></line>
                      <text id="En.-Demand-Reduction" font-size="12" font-weight="normal" letter-spacing="0.0669642" fill="#000000">
                          <tspan x="31" y="12">En. Demand Reduction</tspan>
                      </text>
                  </g>
                  <g id="ElectricityDecarbonization" transform="translate(41, 129)" @mouseover="onClick('ElectricityDecarbonization')" @mouseleave="onClick('')"  v-show="element >= 9">
                      <g id="Group">
                          <g id="Group-5">
                              <rect id="Rectangle" fill="#FFE3BA" x="0" y="0" width="14" height="15"></rect>
                              <line x1="0" y1="0.5" x2="14" y2="0.5" id="Path-4" stroke="#D09236" stroke-width="3"></line>
                              <text id="Electricity-Decarbon" font-size="12" font-weight="normal" letter-spacing="0.0669642" fill="#000000">
                                  <tspan x="31" y="12">Electricity Decarbonization</tspan>
                              </text>
                          </g>
                      </g>
                  </g>
                  <g id="Nonelectricitydecarbonization" transform="translate(41, 32)" @mouseover="onClick('Nonelectricitydecarbonization')" @mouseleave="onClick('')"  v-show="element >= 11">
                      <rect id="Rectangle" fill-opacity="0.2" fill="#A3D1EA" x="0" y="0" width="14" height="15"></rect>
                      <text id="Non-Electricity-deca" font-size="12" font-weight="normal" letter-spacing="0.0669642" fill="#000000">
                          <tspan x="31" y="12">Non Electricity decarbonization</tspan>
                      </text>
                      <line x1="0" y1="0.5" x2="14" y2="0.5" id="Path-4" stroke="#A3D1EA" stroke-width="3"></line>
                  </g>
                  <g id="LandUseChangeandCDR" transform="translate(41, 65)" @mouseover="onClick('LandUseChangeandCDR')" @mouseleave="onClick('')" v-show="element >= 12">
                      <rect id="Rectangle" fill-opacity="0.2" fill="#A3EAA6" x="0" y="0" width="14" height="15"></rect>
                      <line x1="0" y1="0.5" x2="14" y2="0.5" id="Path-4" stroke="#74AB5C" stroke-width="3"></line>
                      <text id="Land-Use-Change-and" font-size="12" font-weight="normal" letter-spacing="0.0669642" fill="#000000">
                          <tspan x="31" y="12">Land Use Change and CDR</tspan>
                      </text>
                  </g>
                  <g id="Group-3">
                      <line x1="104.472973" y1="77.5" x2="-50.2094595" y2="77.75" id="Path-5" stroke="#644FFF" transform="translate(27, 78) rotate(-90) translate(-27, -78) "></line>
                      <text id="Mitigation-Strategie" transform="translate(7, 78.500000) rotate(-90) translate(-7, -78.500000) " font-size="10" font-weight="normal" letter-spacing="0.0558035" fill="#644FFF">
                          <tspan x="-51" y="82">Mitigation Strategies</tspan>
                      </text>
                  </g>
              </g>
            </transition>
              <g id="sectors" transform="translate(18, 30)">
                  <g id="Industry" transform="translate(43, 1)">
                      <rect stroke-width="0.5" x="0" y="0" width="14" height="15"></rect>
                      <text font-size="12" font-weight="normal" letter-spacing="0.0669642" fill="#000000">
                          <tspan x="31" y="12">Industry</tspan>
                      </text>
                  </g>
                  <g id="Non-electric-Supply" transform="translate(43, 24)">
                      <rect stroke-width="0.5" fill-opacity="0.4" x="0" y="0" width="14" height="15"></rect>
                      <text font-size="12" font-weight="normal" letter-spacing="0.0669642" fill="#000000">
                          <tspan x="31" y="12">Non-electric Supply</tspan>
                      </text>
                  </g>
                  <g id="Electricity" transform="translate(43, 47)">
                      <rect stroke-width="0.5" fill-opacity="0.4" x="0" y="0" width="14" height="15"></rect>
                      <text font-size="12" font-weight="normal" letter-spacing="0.0669642" fill="#000000">
                          <tspan x="31" y="12">Electricity</tspan>
                      </text>
                  </g>
                  <g id="Buildings" transform="translate(43, 70)">
                      <rect stroke-width="0.5" fill-opacity="0.4" x="0" y="0" width="14" height="15"></rect>
                      <text font-size="12" font-weight="normal" letter-spacing="0.0669642" fill="#000000">
                          <tspan x="31" y="12">Buildings</tspan>
                      </text>
                  </g>
                  <g id="Transport" transform="translate(43, 92)">
                      <rect stroke-width="0.5" fill-opacity="0.4" x="0" y="0" width="14" height="15"></rect>
                      <text font-size="12" font-weight="normal" letter-spacing="0.0669642" fill="#000000">
                          <tspan x="31" y="12">Transport</tspan>
                      </text>
                  </g>
                  <g id="Land-Use-Change" transform="translate(43, 138)">
                      <rect stroke-width="0.5" fill-opacity="0.4" x="0" y="0" width="14" height="15"></rect>
                      <text font-size="12" font-weight="normal" letter-spacing="0.0669642" fill="#000000">
                          <tspan x="31" y="12">Land-Use Change</tspan>
                      </text>
                  </g>
                  <g id="BECCS" transform="translate(43, 115)">
                      <rect stroke-width="0.5" fill-opacity="0.4" x="0" y="0" width="14" height="15"></rect>
                      <text font-size="12" font-weight="normal" letter-spacing="0.0669642" fill="#000000">
                          <tspan x="31" y="12">BECCS</tspan>
                      </text>
                  </g>
                  <g id="Group-4">
                      <line x1="104.472973" y1="77.5" x2="-50.2094595" y2="77.75" id="Path-5-Copy" stroke="#644FFF" transform="translate(27, 78) rotate(-90) translate(-27, -78) "></line>
                      <text id="Sectors" transform="translate(7, 78.500000) rotate(-90) translate(-7, -78.500000) " font-size="10" font-weight="normal" letter-spacing="0.0558035" fill="#644FFF">
                          <tspan x="-11" y="82">Sectors</tspan>
                      </text>
                  </g>
              </g>
          </g>
      </g>
  </svg>
 </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Legend',
  props: {
    element: {
      type: Number,
      required: false
    }
  },
  data () {
    return {
      clicked: false
    }
  },
  computed: {
    ...mapActions(['newStrategy'])
  },
  methods: {
    onClick (value) {
      return this.$store.dispatch('newStrategy', value)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/style/pathways.scss";

.legend {
    width: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

svg {
    #Non-electric-Supply rect {
        fill: $non-electric;
        stroke: $non-electric-stroke;
    }

    #Industry rect {
        fill: $industry;
        stroke: $industry-stroke;
    }

    #Electricity rect {
        fill: $electricity;
        stroke: $electricity-stroke;
    }

    #Buildings rect {
        fill: $building;
        stroke: $building-stroke;
    }

    #Transport rect {
        fill: $transport;
        stroke: $transport-stroke;
    }

    #Land-Use-Change rect {
        fill: $landchange;
        stroke: $landchange-stroke;
    }

    #BECCS rect {
        fill: $BECCS;
        stroke: $BECCS-stroke;
    }
}
</style>
