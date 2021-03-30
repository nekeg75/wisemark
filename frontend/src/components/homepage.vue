<template>
  <div id="dashboard">
    <nav>
      <welcomeTag>Test</welcomeTag>
      <viewTest></viewTest>
      <viewStats></viewStats>
      <markTest v-if="getUserType === 1"></markTest>
      <logout></logout>
    </nav>
    <display>
    </display>
  </div>
</template>

<script>

//library imports
import axios from 'axios'
import {mapGetters} from 'vuex'

//navbar components
import welcomeTag from './navComponents/welcomeTag.vue'
import viewTest from './navComponents/viewTest.vue'
import viewStats from './navComponents/viewStatistics.vue'
import markTest from './navComponents/markTest.vue'
import logout from './logout.vue'

//display component
import display from './displayComponents/display.vue'

export default {
  
  computed:{
    ...mapGetters(['getUserType','getValidSession'])
  },

  components:
  {
    logout,
    viewTest,
    markTest,
    viewStats,
    welcomeTag,
    display,
  },

  mounted()
  {
    if(!this.getValidSession)
    {
      this.$router.push('/404')
    }
  }
}
</script>

<style>

  * {font-family: 'Sen', sans-serif}

  #dashboard 
  {
    color: #003e68;
    display: flex;
    flex-direction: column;
    width: 85%;
    height: 55em;
    margin-top: 3em;
    box-shadow: 0em 0em 1em 0.5em rgba(0, 62, 104, 0.3);
  }
  
  nav
  {
    margin-top: 3em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 2em;
    height: 8em;
    justify-content:space-evenly;
    /* border-bottom: 0.5em solid #003e68; */
  }

</style>