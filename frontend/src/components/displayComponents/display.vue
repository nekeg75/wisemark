<template>
  <div id="display">
    <viewDisplay v-if="viewTest"></viewDisplay>
    <statsDisplay v-if="viewStats"></statsDisplay>
    <markDisplay v-if="markTest"></markDisplay>
  </div>
</template>

<script>

//Display components
import viewDisplay from './viewDisplay.vue'
import statsDisplay from './statsDisplay.vue'
import markDisplay from './markDisplay.vue'

import {mapGetters} from 'vuex'

export default {
  computed:{
    ...mapGetters(['viewTest', 'viewStats', 'markTest'])
  },
  components:
  {
    viewDisplay,
    statsDisplay,
    markDisplay
  }
}
</script>

<style>
  #display
  {
    display: flex;
    height: 100%;
    margin-top: 1em;
    border-top: 0.3em solid #003e68;
    background-color: lightblue;
  }
</style>