<template>
  <div class="legend">
      <div class="legend-sections strategies">
          <div>
              <h5>Strategies →</h5>
              <span class="strategy" :class="classes" id="Demand-Reduction" @mouseover="onClick('EnergyDemandReduction')" @mouseleave="onClick('')"><span>●</span> Demand Reduction</span>
              <span class="strategy" :class="classes" id="Ele-Decarbonization" @mouseover="onClick('ElectricityDecarbonization')" @mouseleave="onClick('')"><span>●</span> Electricity Decarbonization</span>
              <span class="strategy" :class="classes" id="Electrification" @mouseover="onClick('Electrification')" @mouseleave="onClick('')"><span>●</span> Electrification</span>
              <span class="strategy" :class="classes" id="No-Ele-Decarb" @mouseover="onClick('Nonelectricitydecarbonization')" @mouseleave="onClick('')"><span>●</span> Non Electricity Decarbonization</span>
              <span class="strategy" :class="classes" id="Land-Use" @mouseover="onClick('LandUseChangeandCDR')" @mouseleave="onClick('')"><span>●</span> Land Use change and CDR</span>
          </div>
      </div>
     <div class="legend-sections sectors">
         <h5>Sectors →</h5>
         <div class="highlight" :class="classes" id="Industry" @mouseover="onClick('Industry')" @mouseleave="onClick('')">Industry</div>
         <div class="highlight" :class="classes" id="Non-electric-Supply" @mouseover="onClick('Non-electric Supply')" @mouseleave="onClick('')">Non-electric Supply</div>
         <div class="highlight" :class="classes" id="Electricity" @mouseover="onClick('Electricity')" @mouseleave="onClick('')">Electricity</div>
         <div class="highlight" :class="classes" id="Buildings" @mouseover="onClick('Buildings')" @mouseleave="onClick('')">Heating</div>
         <div class="highlight" :class="classes" id="Transport" @mouseover="onClick('Transport')" @mouseleave="onClick('')">Transport</div>
         <div class="highlight" :class="classes" id="BECCS" @mouseover="onClick('BECCS')" @mouseleave="onClick('')">BECCS</div>
         <div class="highlight" :class="classes" id="Land-Use-Change" @mouseover="onClick('Land-Use Change')" @mouseleave="onClick('')">Land Use</div>
     </div>
     <div class="legend-sections emissions">
         <h5>Emissions →</h5>
         <div class="dotted-legend" :class="classes" id="No-Policy" @mouseover="onClick('No-Policy')" @mouseleave="onClick('')">Current Policies</div>
         <div class="dotted-legend" :class="classes" id="Gross-Policy" @mouseover="onClick('Gross-Policy')" @mouseleave="onClick('')">Net Zero (Gross)</div>
         <div class="dotted-legend" :class="classes" id="Policy" @mouseover="onClick('Policy')" @mouseleave="onClick('')">Net Zero</div>
     </div>
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
      active: '',
      classes: {}
    }
  },
  computed: {
    ...mapActions(['storeHighlight'])
  },
  methods: {
    onClick (value) {
      this.active = value
      this.classes = {
        selected: this.active === value,
        notselected: this.active !== value,
        notinitial: this.active !== '',
        neutral: this.active === ''
      }
      return this.$store.dispatch('newHighlight', value)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/style/pathways.scss";
.legend {
    display: flex;
    flex-wrap: wrap;
}
.legend-sections {
    padding-bottom: 10px;
    margin-top: 20px;
    padding-left: 20px;
    height: 50%;
    h5 {
        // display: inline;
        margin-top: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid $color-neon;
    }
}

.sectors {
    width: 65%;
    .highlight {
        margin: 4px;
    }

    .notselected {
        background-color: white;
    }

    #Non-electric-Supply {
        background-color: lighten($non-electric, 10);
        color: $non-electric-stroke;
    }

    #Industry {
        background-color: lighten($industry, 10);
        color: $industry-stroke;
    }

    #Electricity {
        background-color: lighten($electricity, 10);
        color: $electricity-stroke;
    }

    #Buildings {
        background-color: lighten($building, 10);
        color: $building-stroke;
    }

    #Transport {
        background-color: lighten($transport, 10);
        color: $transport-stroke;
    }

    #Land-Use-Change {
        background-color: lighten($landchange, 10);
        color: $landchange-stroke;
    }

    #BECCS {
        background-color: lighten($BECCS, 50);
        color: $BECCS-stroke;
    }
}

.emissions {
    width: 35%;

    .notselected {
        opacity: 0.5;
    }

    .dotted-legend {
        margin-right: 10px;
        margin-left: 10px;
        // margin-top: 10px;

        &#No-Policy {
            color: $color-red;
            border-bottom: 2px solid $color-red;
        }

        &#Gross-Policy {
            color: $gross-emi;
            border-bottom: 2px dashed $gross-emi;
        }

        &#Policy {
            color: $pol-emi;
            border-bottom: 2px solid $pol-emi;
        }
    }
}

.strategies {
    width: 100%;
    margin-bottom: 0;
    .strategy {
        margin: 4px;

        &#Demand-Reduction {
            span {
                color: #9295c3;
            }
        }

        &#Ele-Decarbonization {
            span {
                color: #a26f6e;
            }
        }

        &#Electrification {
            span {
                color: #d67d39;
            }
        }

        &#No-Ele-Decarb {
            span {
                color: #294c80;
            }
        }

        &#Land-Use {
            span {
                color: #a9ac73;
            }
        }
    }
}

@media only screen and (max-width: 600px) {
    .legend-sections {
        padding-right: 5px;
    }
    .highlight {
        font-size: 14px;
    }

    .emissions {
        div {
            font-size: 14px;
            display: inline;
        }
    }

    .strategies {
        div {
            font-size: 14px;
        }
    }
}
</style>
