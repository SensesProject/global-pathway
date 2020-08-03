<template>
  <svg height="20%" width="100%" ref="svg">
    <rect
      :x="dotsPosition[0] - 5"
      :y="innerHeight - (innerHeight / 2.5)"
      :width="dotsPosition[13] - 8"
      height="16"
      rx="8"
    />
    <circle
      class="highlight-bg"
      :cx="dotsPosition[element]"
      :cy="innerHeight - (innerHeight / 4)"
      r="13"
    />
    <g v-for="(d, i) in descriptions.steps" :key="`selector-${i}`">
      <circle
        :class="{highlight: element === (i)}"
        r="8"
        :cx="dotsPosition[i]"
        :cy="innerHeight - (innerHeight / 4)"/>
      <text
      :class="{highlight: element === (i)}"
      :x="dotsPosition[i]"
      y="15"
      :text-anchor="i < 10 ? 'start' : 'end'"
      >
        {{ title[i] }}
      </text>
      <rect
        v-on:click="changeChapter(i)"
        class="clickarea"
        width="40"
        height="40"
        :x="dotsPosition[i] - 20"
        :y="(innerHeight / 2) / 4"
        />
    </g>
    <!-- <text :x="dotsPosition[currentElement]" y="13">{{ currentElement }}</text> -->
  </svg>
</template>

<script>
import { map } from 'lodash'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Selector',
  props: {
    descriptions: Object
  },
  data () {
    return {
      innerWidth: 0,
      innerHeight: 0,
      element: 0,
      title: ['Current Emissions', 'Electricity', 'Transport', 'Current Pathway', 'Closing the Gap', 'Energy Demand Reduction', 'Electricity Decarbonization', 'Electrification', 'Non-electricity Decarbonization', 'CDR', 'CDR - Regional Perspective', 'Gross and Net Emissions', 'Residual Emissions', 'Climate-Neutral Pathways?']
    }
  },
  computed: {
    ...mapState(['currentElement']),
    dotsPosition () {
      let initialX = 20
      return map(this.descriptions.steps, (pos, p, positions) => {
        const x = initialX
        initialX = x + (this.innerWidth / positions.length)
        return x
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
      if (el === 10) {
        this.$store.dispatch('newCountry', 'Australia')
      } else {
        this.$store.dispatch('newCountry', '')
      }
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
  // display: block;

  circle {
   fill: white;
   stroke: getColor(violet, 40);

   &.highlight {
     fill: $color-neon;
   }

   &.highlight-bg {
     fill: $color-neon;
     fill-opacity: 0.5;
     transition: cx 0.5s;
     stroke: none;
   }

  }

  text {
    fill: $color-neon;
    text-transform: uppercase;
    visibility: hidden;
    &.highlight {
      visibility:visible;
    }
  }

  rect {
    fill: getColor(violet, 100);
    fill-opacity: 0.5;
  }

  .clickarea {
    fill-opacity: 0;
  }
}
</style>
