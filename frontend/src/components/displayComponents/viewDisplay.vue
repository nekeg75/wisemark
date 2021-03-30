<template>
  <div id=viewDisplay>
    <h1>Select A Test To View</h1>
    <div id="testFileArea">
      <div id="testFile" v-for="(test, index) in getTests" :key="index" @click="openInfo(test.testID)">
        <p>{{test.testID}}</p>
        <div id="infoBanner">
            <h2></h2>
        </div>
        <div id="informationBox" v-if="infoBox">
          <div id="infoHeader">
            <h2>{{test.testID}}</h2>
            <img
              src="../../assets/cancel.png"
              height="8%"
              width="8%"
              alt="close">
          </div>
          <h4>Test Date: {{test.date}}</h4>
          <h4>Start Time: {{test.start}}</h4>
          <h4>End Time: {{test.end}}</h4>
          <h4>Test Status: {{localState}}</h4>
          <button id="takeTestButton" v-if="state === 1" @click="takeTest(test.testID)">Take Test</button>
          <button id="accessTestResults" v-if="state === 3" @click="accessResults(test.testID)">View Results</button>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>import {mapGetters} from 'vuex'

export default {
  data()
  {
    return{
      infoBox: false,
      state: "Getting test state"
    }
  },

  computed:
  {
    ...mapGetters(['getTests', 'getTempState']),

    localState()
    {
      if(this.state === 0)
      {
        return "Upcoming test"
      }
      if(this.state === 1)
      {
        return "Ready to take"
      }
      if(this.state === 2)
      {
        return "Awaiting Marking"
      }
      if(this.state === 3)
      {
        return "Test Marked"
      }
      return this.state
    }
  },

  methods:
  {
    openInfo(testID)
    {
      this.$store.commit("setTempState",testID)
      this.state = this.getTempState
      this.infoBox = !this.infoBox
    },

    takeTest(testID)
    {
      this.$store.commit("setSessionTest", testID)
      this.$store.commit("setSessionQuestions", testID)
      this.$router.push("/test")
    },

    accessResults(testID)
    {
      this.$store.commit("setSessionTest", testID)
      this.$store.commit("setSessionResults", testID)
      this.$store.commit("setSessionQuestions", testID)
      this.$router.push("/testResults")
    }
  }
}
</script>

<style>
  #viewDisplay
  {
    padding: 3em;
    width: 100%;
  }
  
  #viewDisplay h1
  {
    width: 10.45em;
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
    width: 100%;
    position: relative;
    left: 0%;
    margin-top: 0em;
    margin-bottom: 0em;
    /* background-color: #003e68;
    color: white; */
  }

  #informationBox
  {
    position: fixed;
    height: 20em;
    width: 20em;
    background-color: white;
    border: 0.2em solid #003e68;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -70%);
    cursor: default;
    text-align: center;
  }

  #infoHeader
  {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  #infoHeader img 
  {
    position: relative;
    right: -2em;
    top: 0.1em;
  }

  #infoHeader img:hover 
  {
    cursor: pointer;
  }

  #takeTestButton, #accessTestResults
  {
    width: 7em;
    height: 3em;
    background-color: #003e68;
    color: white;
    border-radius: 1em;
    border: none;
    padding: 0em;
    font-size: 1em;
  }

  #takeTestButton:hover, #accessTestResults:hover
  {
    cursor: pointer;
  }

</style>