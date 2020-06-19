<template>
  <div id="app" ref="container">
    <SensesMenu/>
    <div class="wrapper">
      <div class="vis-body" ref="container">
        <div class="paragraph">
            <h1 class="title">Global Mitigation Pathways</h1>
            <p>To be in line with the Paris Goal of limiting global temperature
              rise to 1.5-2°C, Industrialized Economies need to reach net-zero
              CO2 emissions by 2050. This requires a major transition to a low-carbon
              economy in only 30 years. But, how can they achieve this? Here,
              we show simulation results that outline possible mitigation
              pathways towards carbon neutrality by 2050 for the EU, Japan,
              Australia and the US. With this tool, you will learn about how
              different mitigation strategies could play together for bending
              down the emission trajectories in the respective regions.
            </p>
            <p class="suggestions">
              By scrolling down you will be presented with graphs for four regions:
              Austarlia, EU28 (which includes ...),USA, Japan. The navigator on the
              bottom left part of the screen will allow you to build the charts step by step.
            </p>
      </div>
        <div class="vis-container">
          <GlobalStrategy :width="width" :height="height" :element="element"/>
          <div
          class="meta-toggle"
          @click="meta = !meta"
          >
          <p>References, downloads and explore</p>
        </div>
        </div>
      </div>
    <div class="meta" v-if="meta === true">
      <div class="meta-body">
          <SensesMeta :id="'transition-path-1'" />
          <div @click="meta = !meta" class="meta-close">&#x3c; back to module</div>
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
      element: 0,
      meta: false
    }
  },
  methods: {
    calcSizes () {
      const { container: el } = this.$refs
      const totalWidth = el.clientWidth
      const totalHeight = el.clientHeight || el.parentNode.clientHeight
      this.width = Math.min(totalWidth, 1500)
      this.height = Math.min(totalHeight, 1000)
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

    max-width: 1500px;
    margin: 0 auto;

      .paragraph {
        padding-top: 100px;
        height: 60vh;
        width: 50%;
        margin: 0 auto;

        .title {
            margin-bottom: $spacing;
          }
      }
      .vis-container {
        max-height: 900px;
        margin: 0 auto;
      }
    .vis-body {
      .suggestions {
        font-size: 12px;
        font-style: italic;
        color: $color-gray;
        margin: 20px auto;
        padding-left: 1em;
        border-left: 1px solid $color-gray;
      }

      .meta-toggle {
        position: absolute;
        transform: rotate(-90deg);
        cursor: pointer;
        left: 88.6%;
        width: 300px;
        top: 100%;
        border: 1px solid getColor(neon, 100);
        border-bottom: none;
        text-align: center;
        border-radius: 4px 4px 0 0;
        padding: 0px 4px 0px 4px;
      }

      .meta-toggle:hover {
        color: $color-neon;
        background-color: getColor(neon, 100);

        transition: color 0.5s, background-color 0.5s;
      }
    }

    .meta {
      position: fixed;
      top: 5%;
      margin: 50px auto;
      max-width: 1500px;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);

      .meta-body {
        margin: 0 auto;
        width: 80%;
        height: 50%;
      }

      .meta-close {
        color: $color-neon;
        font-size: 14px;
        padding-top: 2px;
        cursor: pointer;
      }
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
