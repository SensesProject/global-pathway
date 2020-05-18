<template>
  <svg height="100%" width="10%" ref="svg" :data="dotsPosition">
    <rect
      :x="backgroundX"
      :y="dotsPosition[0] - 5"
      width="10"
      :height="dotsPosition[4]"
      rx="10"
    />
    <circle
      class="highlight-bg"
      :cx="innerWidth / 2"
      :cy="dotsPosition[element]"
      r="10"
    />
    <circle v-for="(d, i) in descriptions.steps" :key="`selector-${i}`"
      v-on:click="changeChapter(i)"
      :class="{highlight: element === (i)}"
      r="5"
      :cx="innerWidth / 2"
      :cy="dotsPosition[i]"/>
  </svg>
</template>

<script>
import { map } from 'lodash'
import { mapActions } from 'vuex'

export default {
  name: 'Selector',
  props: {
    descriptions: Object
  },
  data () {
    return {
      innerWidth: 0,
      innerHeight: 0,
      element: 1
    }
  },
  computed: {
    dotsPosition () {
      console.log(this.descriptions)
      let initialY = 10
      return map(this.descriptions.steps, (pos, p, positions) => {
        const y = initialY
        initialY = y + (this.innerHeight / positions.length)
        return y
      })
    },
    backgroundX () {
      return (this.innerWidth / 2) - 5
    },
    ...mapActions(['newElement'])
  },
  methods: {
    innerSizes () {
      const { svg: el } = this.$refs
      const totalWidth = el.clientWidth
      const totalHeight = el.clientHeight || el.parentNode.clientHeight
      this.innerWidth = totalWidth
      this.innerHeight = totalHeight
    },
    changeChapter (el) {
      this.element = el
      return this.$store.dispatch('newElement', el)
    }
  },
  mounted () {
    this.innerSizes()
    window.addEventListener('resize', this.innerSizes, false)
  },
  updated () {
    this.innerSizes()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.innerSizes, false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";

svg {
  display: inline-grid;

  circle {
   fill: getColor(violet, 40);

   &.highlight {
     fill: $color-neon;
   }

   &.highlight-bg {
     fill: $color-neon;
     fill-opacity: 0.5;
     transition: cy 0.5s;
   }

  }

  rect {
    fill: getColor(violet, 100);
  }
}
</style>
