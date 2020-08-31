<template>
  <div id="app" ref="container">
    <SensesMenu :id="'countries-pathways'" :disableScrollLock="true"/>
    <div class="wrapper">
      <div class="vis-body" ref="container">
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
            <p class="suggestions" v-if="width > 600">
              By scrolling down you will be presented with graphs for four regions:
              Australia, EU28, USA, Japan. The navigator on the bottom left part
              of the screen will allow you to build the charts step by step.
            </p>
            <p class="suggestions" v-if="width < 600">
              By scrolling down you will be presented with graphs for four regions:
              Australia, EU28, USA, Japan. You can navigate through the steps by using the
              navigator on demand by tapping on "story".
            </p>
            <div
              class="meta-toggle"
              @click="toggleMeta(!meta)"
              >
              <p>References, downloads and explore</p>
            </div>
      </div>
        <div class="vis-container">
          <GlobalStrategy :width="width" :height="height" :element="element"/>
        </div>
      </div>
      <div class="meta" v-if="meta === true">
        <div class="meta-body">
            <SensesMeta :id="'countries-pathways'"/>
            <div @click="toggleMeta(!meta)" class="meta-close">&#x3c; back to module</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GlobalStrategy from './components/GlobalStrategy.vue'
// import Legend from './components/Legend.vue'
import SensesMenu from 'library/src/components/SensesMenu.vue'
import SensesMeta from 'library/src/components/SensesMeta.vue'

export default {
  name: 'App',
  components: {
    SensesMenu,
    GlobalStrategy,
    SensesMeta
    // Legend
  },
  data () {
    return {
      width: 0,
      height: 0,
      element: 0
    }
  },
  computed: {
    ...mapState(['meta']),
    ...mapActions(['storeMeta'])
  },
  methods: {
    calcSizes () {
      const { container: el } = this.$refs
      const totalWidth = el.clientWidth
      const totalHeight = el.clientHeight || el.parentNode.clientHeight
      this.width = Math.min(totalWidth, 1500)
      this.height = Math.min(totalHeight, 1000)
    },
    toggleMeta (meta) {
      return this.$store.dispatch('metaToggle', meta)
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
        height: 500px;
        width: 50%;
        margin: 0 auto;
        margin-bottom: 100px;

        .title {
            margin-bottom: $spacing;
          }

        .meta-toggle {
          text-transform: uppercase;
          font-size: 12px;
          text-decoration: underline;
          color: $color-neon;
          cursor: pointer;
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

@media only screen and (min-width: 601px) and (max-width: 1024px) {
  #app {
    .wrapper {
      .paragraph {
        width: 80%;
        height: 550px;
      }
      .global-strategy {
        width: 100%;
        .single-region {
          padding-left: 25px;
          width: 50%;
          height: 45%;
        }

        .US-region, .Japan-region {
          margin-bottom: 60%;
        }

        .label {
          padding-top: 25px;
          position: fixed;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.9);
          height: 23%;

          .legend-sections {
            &.emissions {
              div {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  #app {
    .wrapper {

      h1.title {
        font-size: 25px;
      }

      .paragraph {
        width: 80%;
        height: 70%;
        margin-bottom: 20%;
      }

      .global-strategy {
        .single-region {
          display: inline-block;
          width: 100%;
          margin: 0 auto;
          padding: 10px;
        }

        .label {
          display: block;
          position: fixed;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.9);
          height: 50%;
          transition: height 0.5s;

          .label_rows {
            margin-top: 2%;
            width: 100%;
            height: 100%;

            .textblock {
              width: 90%;
              margin: 0 auto;
            }
          }

          .legend-row {
            width: 100%;
            height: 100%;
          }
        }
      }
      .vis-body {
        .meta-toggle {
          position: relative;
        }
      }
    }
  }
}
</style>
