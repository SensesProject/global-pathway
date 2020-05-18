<template>
  <div id="app" ref="container">
    <SensesMenu/>
    <div class="wrapper">
      <div class="vis-body" ref="container">
      <div class="vis-container">
        <GlobalStrategy :width="width" :height="height" :element="element"/>
      </div>
      </div>
    <div class="paragraph">
        <h1 class="title">Global Mitigation Pathways</h1>
        <p>Renewable expansion and electrification are promising strategies for a
          successful future decarbonization of the energy system. However, other
          measures like energy efficiency improvements, the switch to low-carbon
          fuels like biofuels or hydrogen and the deployment of negative emissions
          play a role in future decarbonization scenarios as well. To explore in
          more detail how the interplay of these strategies can bring us to net-zero
          emissions, you can use the Global Pathway Tool.
        </p>
        <div class="meta">
          <SensesMeta :id="'transition-path-1'" />
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import GlobalStrategy from './components/GlobalStrategy.vue'
// import Legend from './components/Legend.vue'
import SensesMenu from 'library/src/components/SensesMenu.vue'
import SensesMeta from 'library/src/components/SensesMeta.vue'

export default {
  name: 'App',
  components: {
    SensesMenu,
    SensesMeta,
    GlobalStrategy
    // Legend
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

      .paragraph {
        padding-top: 100px;
        height: 100vh;
        width: 60%;
        margin: 0 auto;

        .title {
            margin-bottom: $spacing;
          }

        .meta {
          margin-top: 20px;
        }
      }
      .vis-container {
        margin: 0 auto;
      }

    .selector {
      width: 100%;
      margin: 0 auto;
      background-color: rgba(255, 255, 255, 0.8);
      display: inline-flex;
      padding: 1em 0;
      top: 50px;
      position: sticky;

      .legend-row {
        flex: 33%;
        margin-right: $spacing;
        align-content: center;
        font-size: 1.5em;

        &#last {
          margin-right: 0;
        }

        .right {
          text-align: right;
        }

        .build {
          display: inline;
        }

        .glyph-angle-left, .glyph-angle-right {
          font-size: 1.5em;
        }
      }
    }
  }
}
</style>
