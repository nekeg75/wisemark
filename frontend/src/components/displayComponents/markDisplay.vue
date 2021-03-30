<template>
  <div id=markDisplay>
    <h1>Select A Test To Mark</h1>
    <div id="testFileArea">
      <div id="testFile" v-for="(test, index) in displayTests" :key="index" @click="move()">
        <p>{{test.testID}}</p>
        <span></span>
      </div>
      <!-- <router-link to="/markResponse">Mark Test</router-link> -->
      <div v-if="noTests" id="noTests">
        <h3>Looks like you have no tests to mark</h3>
        <h3>You can only mark tests that are awaiting marking</h3>
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

  methods:
  {
    markTest(testID)
    {
      // this.$store.commit('setSessionTest', testID)
      // this.$store.commit('setSessionResponse', testID)
      // this.$store.commit('setSessionQuestions', testID)
      // this.$store.commit('clearActiveComp')
      this.$router.push('/markResponses')
      return
    },

    move()
    {
      this.$router.push('/markResponse')
    }

  },

  created()
  {
    for(const test in this.getTests)
    {
      const url = `http://localhost:5000/test/getStatus/${this.getTests[test].testID}/${this.getUserID}`
      let output
      axios.get(url).then( (data) =>
      {
        if(data.data == 2)
        {
          output = this.getTests[test]
        }
      }).catch( (error) => 
      {
        console.log(error)
      }).finally(() => {
        this.displayTests.push(output)
      })
    }
  }
}
</script>

<style>
  #markDisplay
  {
    padding: 3em;
    width: 100%;
  }
  
  #markDisplay h1
  {
    width: 10.8em;
    padding: 0.5em;
    border-bottom: 0.1em solid #003e68;
    margin-bottom: 3em;
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