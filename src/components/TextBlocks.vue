<template>
  <div class="textblock">
    <IntersectionObserver :step="0">
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
    <p>
      Looking at the fingerprint of current emissions, there are also some
      differences across the regions: While about 50% of <span class="country" @mouseover="countryChange('Australia')" @mouseleave="countryChange('')">🇦🇺 Australian</span> CO2 emissions
      come from <span class="electricity">electricity generation</span>,
      this share is only about a quarter in the
      <span class="country" @mouseover="countryChange('EU28')" @mouseleave="countryChange('')">🇪🇺 EU</span>.
      This is due to the extensive use of coal power in Australia, while the EU
      uses a higher percentage of nuclear and renewable power sources.
    </p>
    <p>
      The dominance of road travel in the <span class="country" @mouseover="countryChange('US')" @mouseleave="countryChange('')">🇺🇸 US</span> lead to significant share of
      <span class="transport">transport</span> emissions.
      <span class="country" @mouseover="countryChange('Japan')" @mouseleave="countryChange('')">🇯🇵 Japan</span>,
      in contrast, has a relatively small share of transport emission due to
      modern electric rail infrastructure.
    </p>
    <p>
      Without additional policies to promote a low-carbon transformation, CO2
      emissions will not reach net-zero by 2050. Instead, emissions are projected
      to decrease only slightly across the four regions under a
      <span class="emissions">current policies</span>
      scenario, leaving a significant emission gap to a carbon-neutral economy.
    </p>
    <p>
      What needs to happen to bend down the current emissions trajectory?
      To answer this, we simulated regional pathways for net-zero CO2 emissions
      in 2050. We find that an interplay of different mitigation strategies is
      needed to close the emissions gap to net-zero.
    </p>
    <p>
      <span class="EnergyDemandReduction">The first mitigation strategy is to simply use less energy.</span>
      All regions achieve some emission reductions in the net-zero scenario relative to the
      current policies scenario by energy demand reduction through energy
      efficiency improvements and a shift to less energy-intensive consumption.
    </p>
    <p>
      Next, <span class="ElectricityDecarbonization">the decarbonization of electricity saves a significant share of
      emissions.</span> By completely phasing-out coal and gas power for renewable
      electricity in the net-zero scenario, regions can bring down their emissions
      relative to the current policies scenario by a quarter
      (<span class="country" @mouseover="countryChange('US')" @mouseleave="countryChange('')">🇺🇸 US</span>)
      to a third
      (<span class="country" @mouseover="countryChange('Australia')" @mouseleave="countryChange('')">🇦🇺 Australia</span>).
    </p>
    <p>
      <span class="Electrification">To reduce emissions beyond the power sector, electrification of energy
      appliances is key.</span> This includes, for example, switching to electric vehicles
      or using heat pumps in buildings and industry (more on electrification in our
      module <a class="extern" href="https://climatescenarios.org/sector-transition/">Towards an Electric Future</a>).
    </p>
    <p>
      <span class="Nonelectricitydecarbonization">The remaining energy demand, which cannot be electrified, needs to be switched
      to low-carbon fuels such as hydrogen or biofuels.</span> Moreover, this component
      of non-electricity decarbonization also includes emissions reductions in
      district heating plants and from reduced oil refining relative to the
      current policy scenario.
    </p>
    <p>
      <span class="LandUseChangeandCDR">To attain net-zero CO2, residual energy emissions are compensated by carbon
      dioxide removal (CDR) from the atmosphere.</span> The main methods to generate CDR
      are afforestation (<span class="land"
      @mouseover="onHover('Land-Use Change')"
      @mouseleave="onHover('')"
      >land-use change</span>) and the use of bioenergy with subsequent
      carbon capture and storage (<span class="BECCS"
      @mouseover="onHover('BECCS')"
      @mouseleave="onHover('')"
      >BECCS</span>).
    </p>
    <p>
      The significance CDR options may differ across regions. Australia, for
      example, has large land areas available for afforestation and low population
      density. These are promising conditions for scaling up negative emissions.
    </p>
    <p>
      It makes sense to differentiate between <span class="gross">gross emissions</span> which do not include
      CDR and net emissions. Large-scale CDR may reduce the need to abate emissions
      in the energy sector (see <span class="country" @mouseover="countryChange('Australia')" @mouseleave="countryChange('')">🇦🇺 Australia</span>).
      However, as CDR options are uncertain, the near-term energy transition should not rely on anticipating future CDR.
    </p>
    <p>
      In the <span class="netzero">net-zero scenario</span>, residual gross emissions remain in the transport
      and industry sector, in particular, as these are difficult to decarbonize.
      While in <span class="country" @mouseover="countryChange('Japan')" @mouseleave="countryChange('')">🇯🇵 Japan</span> the decarbonization of industry will be crucial, a key
      challenge for Australia and the US is the low-carbon transition of transport.
    </p>
    <p>
      Although CO2 represents the bulk of greenhouse gas (GHG) emissions,
      the above pathways are not necessarily climate-neutral as methane and
      nitrous oxide emissions are not included. To reach GHG neutrality in 2050
      (the current <span class="country" @mouseover="countryChange('EU28')" @mouseleave="countryChange('')">🇪🇺 EU</span> target), CO2 emissions will likely need to be reduced even more.
    </p>
 </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import IntersectionObserver from 'library/src/components/IntersectionObserver.vue'

export default {
  name: 'TextBlocks',
  components: {
    IntersectionObserver
  },
  computed: {
    ...mapState(['currentElement']),
    ...mapActions(['storeHighlight', 'storeCountry'])
  },
  methods: {
    onHover (highlight) {
      return this.$store.dispatch('newHighlight', highlight)
    },
    countryChange (country) {
      return this.$store.dispatch('newCountry', country)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/style/pathways.scss";

.stepnine {
  text-decoration: none;
}

p {
  width: 95%;
  margin: 0 auto;
  margin-top: 10px;
  font-size: 16px;

  span {
    text-decoration: underline;
    text-decoration-style: dashed;
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

</style>
