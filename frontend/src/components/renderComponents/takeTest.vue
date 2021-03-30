<template>
  <div id="takeTest">
    <div id="testSpace">
      <h1 style="font-size: 3em;">{{getSessionTest.testID}}</h1>
      <h1>{{now}}</h1>

      <div id="question"
      v-for="(q, i) in getSessionTest.questions" :key="q">
        <h3>Question {{i}}:</h3>
        <span>Marks: {{q.marks}}</span>
        <h3 style="padding-left: 0em;">{{q.question}}</h3>

          <div id="answers">
            <div id="mcq" v-if="q.type === 0">
              <p v-for="(opt, optIndex) in q.options" :key="opt">{{optIndex}}: {{opt}}</p>
              <input
              v-if="q.type === 0"
              type="text"
              v-model="answers[i]">
            </div>
            
            <input
              v-if="q.type === 1"
              type="text"
              v-model="answers[i]">
            <textarea
              v-if="q.type === 2"
              v-model="answers[i]">
            </textarea>
          </div>
          <!-- <p v-if="checkSubmit">{{checkSubmitText}}</p> -->
      </div>
      <button v-if="showSubmit" @click="submitTest()" id="submitButton">Submit</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import moment from 'moment'
import {mapGetters} from 'vuex'

export default {
  
  data()
  {
    return{
      now: null,
      submit: true,
      answers: [],
      checkSubmitText: "You haven't answered a question. Are you sure you want to submit ? ",
      showSubmit: true,
      checkSubmit: false
    }
  },
  
  computed:
  {
    ...mapGetters(['getSessionTest', 'getUserID', "getSessionTestID", "getValidSession", "getSessionQuestionLength"])
  },

  created() {
      const interval = setInterval(() => this.now = moment().format('MMMM Do YYYY, h:mm:ss a'), 1000);
  },

  mounted()
  {
    if(!this.getValidSession)
    {
      this.$router.push('/404')
    }
  },

  methods:
  {

    test()
    {
      if(this.answers.length != this.getSessionQuestionLength)
      {
        return
      }

      if(this.submit)
      {
        this.submitTest()
      }

    },

    submitTest()
    {
      if(this.submit)
      {
        this.showSubmit = !this.showSubmit
        let url = 'http://localhost:5000/test/submitTest'
        
        axios.post(url,
        {
          "studentID": `${this.getUserID}`,
          "testID": `${this.getSessionTestID}`,
          "answers": this.answers
        })
        .then((response) =>
        {
          
        })
        .catch((error) =>
        {
          console.log(error)
        })
        .finally(() =>
        {
            this.$router.push('/testSubmitted')
            this.$store.commit('wipeSessionStates')
        })
      }

    }
  }

}
</script>

<style>

  #takeTest
  {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 60%;
      height: 100%;
      margin-top: 3em;
      padding: 3em;
      background-color: lightblue;
      align-items: center;
      font-size: 90%;
      color: #003e68;
  }

  #testSpace 
  {
    background-color: white;
    padding: 3em;
    height: 80%;
    max-width: 80%;
    width: 100%;
    border: 0.2em solid #003e68;
  }

  #testSpace h1 
  {
    text-align: center;
  }

  #submitButton
  {
    margin: auto;
    display: block;
    font-size: 2em;
    margin-top: 1em;
    width: 5em;
    height: 2em;
    color: white;
    border: none;
    background-color: #003e68;
  }

  #submitButton:hover
  {
    cursor: pointer;
  }

  #testSpace input 
  {
    /* display: block; */
    width: 20em;
    height: 2em;
    font-size: 1em;
    padding: 0.5em;
    color: #003e68;
  }

  #testSpace input:focus
  {
    border-color: #003e68;
    outline-style:none;
    box-shadow:none;
    border-style: solid;
  }

  #question 
  {
    display: flex;
    position: relative;
    flex-direction: row !important;
    margin-bottom: 5em;
    width: 100%;
    height: 10em;
  }

  #question h3
  {
    width: 20%;
  }

  #question span
  {
    position: absolute;
    top: 2.5em;
  }
  
  #answers
  {
    display: flex;
    flex-direction: column !important;
    position: relative;
    top: 1.5em;
    left: 2em;
    /* padding: 2em; */
  }

  #mcq
  {
    text-align: center;
    width: 100%;
    height: 1em;
    padding: 0.5em;
    /* padding-top: 0em;
    padding-bottom: 0em; */
    margin-bottom: 1em;
  }


  textarea
  {
    resize: none;
    height: 8em;
    width: 20em;
    font-size: 1em;
    padding: 0.5em;
    color: #003e68;
  }

  textarea:focus
  {
    border-color: #003e68;
    outline-style:none;
    box-shadow:none;
    border: 0.2em;
    border-style: solid;
  }

</style>