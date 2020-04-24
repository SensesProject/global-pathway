<template>
  <div id="app" ref="container">
    <div class="wrapper">
      <div class="paragraph">
        <h1 class="title">Mitigation Strategies Tool</h1>
        <p>Renewable expansion and electrification are promising strategies for a
          successful future decarbonization of the energy system. However, other
          measures like energy efficiency improvements, the switch to low-carbon
          fuels like biofuels or hydrogen and the deployment of negative emissions
          play a role in future decarbonization scenarios as well. To explore in
          more detail how the interplay of these strategies can bring us to net-zero
          emissions, you can use the Global Pathway Tool.
        </p>
      </div>
      <div class="selector">
        <div class="legend-row">
          <p>Next {{ element }}</p>
          <span class="glyph-angle-left" v-on:click="element > 1 ? element -= 1 : element = 1"/>
          <span class="glyph-angle-right" v-on:click="element < 3 ? element += 1 : element = 1"/>
        </div>
         <img class="legend-row" id="colorslegend" src="./assets/legend/colors-coding.svg" />
      </div>
      <div class="vis-container">
        <GlobalStrategy :width="width" :height="height" :element="element"/>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalStrategy from './components/GlobalStrategy.vue'

export default {
  name: 'App',
  components: {
    GlobalStrategy
  },
  data () {
    return {
      width: 0,
      height: 0,
      element: 1
    }
  },
  methods: {
    calcSizes () {
      const { container: el } = this.$refs
      const totalWidth = el.clientWidth
      const totalHeight = el.clientHeight || el.parentNode.clientHeight
      this.width = Math.max(totalWidth, 500)
      this.height = Math.max(totalHeight, 500)
    }
  },
  mounted () {
    this.calcSizes()
    window.addEventListener('resize', this.calcSizes, false)
  },
  updated () {
    this.calcSizes()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcSizes, false)
  }

}
</script>

<style lang="scss">
@import "library/src/style/base.scss";
@import "library/src/style/variables.scss";

#app {
  .wrapper {
    max-width: 800px;
    margin: 0 auto;

      .paragraph {
        padding-top: 100px;

        .title {
          margin-bottom: $spacing;
        }
      }
    .selector {
      margin: $spacing * 2 auto;
      background-color: white;
      display: flex;
      padding: $spacing 0;
      top: 0px;
      position: sticky;

      .legend-row {
        flex: 40%;
        margin-right: $spacing;

        .glyph-angle-left, .glyph-angle-right {
          font-size: 2em;
        }
      }
    }
  }
}
</style>
