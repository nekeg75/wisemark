<template>
  <div id="testResults">
    <button id="backButton"
    @click="$router.go(-1)"></button>
    <div id="results" v-for="(question, index) in getSessionQuestions" :key="index">
      <h3>Question: {{question.question}}</h3>
      <h3>Marks: {{question.marks}}</h3>
      <h3>Answer: {{getSessionResults.answer[index]}}</h3>
      <h3>Your Mark: {{getSessionResults.marks[index]}}</h3>
      <h3>Feedback: {{getSessionResults.feedback[index]}}</h3>
    </div> 
    <h2>Total Marks: {{totalMarks}}</h2>
  </div>  
</template>

<script>

import axios from 'axios'
import {mapGetters} from 'vuex'

export default {
  data()
  {
    return{
    }
  },

  computed:
  {
    ...mapGetters(['getValidSession', 'getSessionTestID', 'getUserID', 'getSessionQuestions', 'getSessionResults']),

    totalMarks()
    {
      if(this.getSessionResults != null)
      {
      let total 

      for(const i in this.responseData)
      {
        total += this.getSessionResults.marks[i]
      }

      return total
      }
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
    this.$store.commit("wipeSessionStates")
  }
}

</script>

<style>

  #testResults
  {
    display: flex;
    margin-bottom: 3em;

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

</style>