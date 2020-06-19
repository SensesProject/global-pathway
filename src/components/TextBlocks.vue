<template>
  <div>
    <p v-if="currentElement === 0">
      Across the four regions, the bulk of annual CO2 emissions currently comes
      from
      <span class="electricity"
      @mouseover="onHover('electricity')"
      @mouseleave="onHover('')"
      >electricity generation</span>,
      <span class="transport">transport</span> and from
      <span class="buildings">heating in buildings</span> and
      <span class="industry">industry</span>.
      The <span class="land">land sector</span> is a small carbon sink in
      each of the regions as afforestation outweighs deforestation.
    </p>
    <p v-if="currentElement === 1">
      Looking at the fingerprint of current emissions, there are also some
      differences across the regions: While about 50% of Australian CO2 emissions
      come from <span class="electricity">electricity generation</span>,
      this share is only about a quarter in the EU. This is due to the extensive
      use of coal power in Australia, while the EU uses a higher percentage of
      nuclear and renewable power sources.
    </p>
    <p v-if="currentElement === 2">
      The dominance of road travel in the US lead to significant share of
      <span class="transport">transport</span> emissions.
      Japan, in contrast, has a relatively small share of transport
      emission due to modern electric rail infrastructure.
    </p>
    <p v-if="currentElement === 3">
      Without additional policies to promote the low-carbon transformation,
      CO2 emissions will not reach net-zero by 2050.
      Instead, emissions are projected to decrease only slightly across the four
      regions under a <span class="emissions">current policies</span> scenario.
    </p>
    <p v-if="currentElement === 4">
      In our <span class="netzero">net-zero scenario</span>,
      each of the regions reaches carbon neutrality by
      2050. Most importantly, emissions from the energy sector are strongly
      reduced up to 2050. The electricity generation is completely decarbonized,
      yet some residual emissions remain in the <span class="transport">transport</span>
      and <span class="industry">industry sector</span>,
      which are more difficult to decarbonize.
    </p>
    <p v-if="currentElement === 5">
      To attain net-zero, residual energy emissions are compensated by carbon
      dioxide removal (CDR) from the atmosphere. The main methods to generate
      such negative emissions are <span class="land">afforestation (land-use change)</span>
      and the use of bioenergy with subsequent
      <span class="BECCS">carbon capture and storage (BECCS)</span>.
    </p>
    <p v-if="currentElement === 6">
      The significance of carbon dioxide removal (CDR) options may differ across
      regions. Australia, for example, has large land areas available for
      afforestation and low population density. These are promising conditions
      for scaling up negative emissions.
    </p>
    <p v-if="currentElement === 7">
      What needs to happen to bend down the current emissions trajectory? To
      better understand the transition, we will attribute the emissions
      reductions between the current policy and the net-zero scenario to
      different mitigation strategies.
    </p>
    <p v-if="currentElement === 8">
      The first mitigation strategy is to simply use less energy than in the
      current policies scenario. This can be achieved by shifting consumption
      patterns to less energy-intensive goods and services or by increasing
      the energy efficiency of, for example, cars or industrial processes. All
      regions achieve some significant emission reductions in the net-zero scenario
      relative to the current policies scenario only by energy demand reduction.
    </p>
    <p v-if="currentElement === 9" class="stepnine">
      An even larger abatement effect has the
      <span class="decarb">decarbonization of the electricity sector</span>.
      By completely phasing-out coal and gas power for renewable electricity
      in the net-zero scenario, the regions can bring down their emissions relative
      to the current policies scenario by a quarter (US) to a third (Australia).
    </p>
    <p v-if="currentElement === 10">
      To reduce emissions beyond the power sector, electrification of energy
      appliances is key. This includes, for example, switching to electric
      vehicles or using heat pumps in buildings and industry.
    </p>
    <p v-if="currentElement === 11">
      The remaining energy demand, which cannot be electrified, needs to be
      switched to low-carbon fuels such as hydrogen or biofuels. Moreover,
      emissions from oil refineries and gas or coal-powered district heating
      plants, that are not needed anymore are avoided. All those emission r
      eductions are subsumed under non-electricity decarbonization.
    </p>
    <p v-if="currentElement === 12">
      To reach net-zero the remaining gap needs to be filled by reducing
      emissions from land-use change (halt deforestation) and deploying carbon
      dioxide removal (CDR) options such as afforestation and bioenergy with
      carbon capture and storage (BECCS).
    </p>
    <p v-if="currentElement === 13">
      Carbon dioxide removal may reduce the need to abate emission in the energy
      sector. While the EU and Japan reduce more emissions by electrification
      and non-electricity decarbonization in our scenario, Australia uses more
      carbon dioxide removal to get to net-zero. However, the future availability
      of afforestation and BECCS is still uncertain. Hence, the energy transition
      should not be postponed only by relying on CDR in the future.
    </p>
 </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TextBlocks',
  computed: {
    ...mapState(['currentElement']),
    ...mapActions(['storeHighlight'])
  },
  methods: {
    onHover (highlight) {
      return this.$store.dispatch('newHighlight', highlight)
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

  span {
    text-decoration: underline;
    text-decoration-style: dashed;
  }

  .emissions {
    color: $color-red;
  }

  .netzero {
    color: getColor(blue, 40);
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

}

</style>
