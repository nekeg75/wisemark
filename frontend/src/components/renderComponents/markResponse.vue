<template>
  <div id="markResponse">
    <button id="backButton"
    @click="$router.go(-1)"></button>
    <div id="markSpace" v-if="!doneMarking">
      <h1>Marking {{this.getSessionTestID}} Responses</h1>
      <div id="response" v-for="(answer, index) in this.getSessionResponse.answers" :key="index">
        <h3>Question: {{this.getSessionQuestions[index].question}}</h3>
          <div id="mcqOptions" v-if="this.getSessionQuestions[index].type === 0">
            <p v-for="(option, optIndex) in this.getSessionQuestions[index].options" :key="optIndex">{{options[optIndex]}}</p>
          </div>
        <h3>Student Response: {{answer[index]}}</h3>
        <h3>Enter marking and feedback</h3>
        <h4> Marks</h4><input type="number" min=0 max=4 v-model="marks[index]" >
        <h4> Feedback</h4><input type="text" v-model="feedback[index]">
      </div>
        <button id="submitButton" @click="getNextResponse()" v-if="!doneMarking">Submit Response</button>
    </div>
    <div id="doneMarking" v-if="doneMarking">
      <h2>Looks like you have no more responses to mark</h2>
      <h2>Press the back button to go back to the homepage</h2>
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
      nextSessionResponse: null,
      doneMarking: false,
      marks: [],
      feedback: [],
    }
  },

  computed:
  {
    ...mapGetters(['getValidSession','getUserID','getSessionTestID','getSessionResponse','getSessionQuestions'])
  },

  methods:
  {
    getNextResponse()
    {
      let output 
      let url = `http://localhost:5000/test/getMarking/${this.getSessionTestID}`
      
      axios.get(url).then((data) => 
      {
        output = data.data
      }).catch((error) => {
        console.log(error)
      }).finally(() => 
      {
        if(output.hasOwnProperty("status"))
        {
          this.doneMarking = true
        }
        this.nextSessionResponse = output
        this.submitResponse()
      })


    },

    submitResponse()
    {
      const url = 'http://localhost:5000/test/submitMarking'
      let output

      axios.post(url, {
        'marks': this.marks,
        'feedback': this.feedback
      }).then( (data) => 
      {
      }).catch( (error) => 
      {
        console.log(error)
      }).finally( () => 
      {
        if(!this.nextSessionResponse.hasOwnProperty("status"))
        {
          return
        }
        this.$store.commit("setSessionResponse", this.getSessionTestID)
        this.nextSessionResponse = this.getSessionResponse 
        
      })
    }
  },

  mounted()
  {
    if(!this.getValidSession)
    {
      this.$router.push('/404')
    }
  },

  beforeDestroy()
  {
    this.$store.commit('wipeSessionStates')
  }

}
</script>

<style>

  #markResponse
  {
    margin-top: 3em;
  }

  #backButton
  {
    position: absolute;
    left: 2.7em;
    height: 5em;
    width: 5em;
    border-radius: 100%;
    background-image: url('../../assets/arrow.png');
    background-repeat: no-repeat;
    background-color: white;
    border: none;
    background-size: 4em 4em;
    background-position: center;
  }

  #backButton:hover 
  {
    cursor: pointer;
  }

  #submitButton
  {
    background-color: #003e68;
    width: 10em;
    height: 3em;
  }

  #doneMarking
  {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

</style>