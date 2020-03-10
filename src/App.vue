<template>
  <div id="app" ref="container">
    <div class="initialtext">
    <h1>Mitigation Strategies Tool</h1>
      <p>Renewable expansion and electrification are promising strategies for a
        successful future decarbonization of the energy system. However, other
        measures like energy efficiency improvements, the switch to low-carbon
        fuels like biofuels or hydrogen and the deployment of negative emissions
        play a role in future decarbonization scenarios as well. To explore in
        more detail how the interplay of these strategies can bring us to net-zero
        emissions, you can use the Global Pathway Tool.
      </p>
    </div>
    <GlobalStrategy :width="width" :height="height" />
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
      height: 0
    }
  },
  methods: {
    calcSizes () {
      const { container: el } = this.$refs
      const totalWidth = el.clientWidth
      const totalHeight = el.clientHeight || el.parentNode.clientHeight
      this.width = Math.max(totalWidth, 500)
      this.height = Math.max(totalHeight, 500)
      console.log(this.width)
      console.log(this.height)
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
  font-family: $font-sans;
  height: 100vh;

  .initialtext {
    margin: 0 auto;
    max-width: 900px;
    padding-top: 80px;
    padding-bottom: 80px;
    border-bottom: 1px solid black;
  }

  p, h1 {
    padding-top: 30px;

    max-width: 720px;
    margin: 0 auto;

    text-align: left;
  }
}
</style>
