<template>
  <div id=statsDisplay >
    <h1>Select A Test To View Its Statistics</h1>
    <div id="testFileArea">
      <div id="testFile" v-for="(test, index) in displayTests" :key="displayTests[index]" @click="$router.push('/testStatistics')">
        <p>{{test.testID}}</p>
        <span></span>
      </div>
      <div v-if="noTests" id="noTests">
        <h3>Looks like you have no marked tests to view</h3>
        <h3>You can only view statistics of tests that are marked</h3>
      </div>
    </div>
  </div>  
</template>

<script>

import axios from 'axios'
import {mapGetters} from 'vuex'

export default {
  
  data()
  {
    return{
      displayTests:[]
    }
  },

  computed:
  {
    ...mapGetters(['getTests', 'getUserID']),

    noTests()
    {
      if(this.displayTests.length === 0 )
      {
        return true
      }
      return false
    }
  },

  beforeMount()
  {
    for(const test in this.getTests)
    {
      const url = `http://localhost:5000/test/getStatus/${this.getTests[test].testID}/${this.getUserID}`
      axios.get(url).then( (data) =>
      {
        if(data.data == 3)
        {
          this.displayTests.push(this.getTests[test])
        }
      }).catch( (error) => 
      {
        console.log(error)
      })
    }
  }
}
</script>

<style>

  #statsDisplay
  {
    padding: 3em;
    width: 100%;
  }
  
  #statsDisplay h1
  {
    width: 17em;
    padding: 0.5em;
    /* background-color: white; */
    border-bottom: 0.1em solid #003e68;
    /* border-radius: 0.5em; */
    margin-bottom: 3em;
  }

  #testFileArea
  {
    display: flex;
    flex-direction: row !important;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  #testFileArea
  {
    display: flex;
    flex-direction: row !important;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  #testFile
  {
    font-size: 1.2em;
    width: 9em;
    height: 12em;
    background-color: white;
    padding: 1em;
    text-align: center;
    border-radius: 0.8em;
    background-image: url('../../assets/document.png');
    background-repeat: no-repeat;
    background-size: 8em 8em;
    background-position: 55% 65%;
  }

  #testFile:hover 
  {
    box-shadow: 0em 0em 1em 0.5em rgba(0, 62, 104, 0.3);
    cursor: pointer;
  }

  #testFile p
  {
    margin-top: 0em;
    margin-bottom: 0em;
  }

  #noTests
  {
    text-align: center;
  }

</style>