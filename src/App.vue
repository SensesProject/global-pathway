<template>
  <div id="app" ref="container">
    <SensesMenu :id="'countries-pathways'"/>
      <div class="vis-body" ref="container">
        <div class="vis-container">
          <GlobalStrategy :width="width" :height="height" :element="element"/>
        </div>
      </div>
    </div>
</template>

<script>
import GlobalStrategy from './components/GlobalStrategy.vue'
// import Legend from './components/Legend.vue'
import SensesMenu from 'library/src/components/SensesMenu.vue'

export default {
  name: 'App',
  components: {
    SensesMenu,
    GlobalStrategy
    // Legend
  },
  data () {
    return {
      width: 0,
      height: 0,
      element: 0
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
  .vis-body {
    display: inline-flex;
    // max-width: 1300px;
    margin: 0 auto;

    .suggestions {
      font-size: 12px;
      font-style: italic;
      color: $color-gray;
      margin: 40px auto;
      padding-left: 1em;
      border-left: 1px solid $color-gray;
    }
  }

    .paragraph {
      padding-top: 100px;
      // height: 500px;
      width: 38%;
      padding: 250px 3rem;
      // margin-bottom: 100px;

      .title {
          margin-bottom: $spacing;
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
      }
    }
  }
}
</style>
