<template>
  <div id="markResponse">
    <h1 v-if="doneMarking">Marking OOPMID2020 Responses</h1>
    <button id="backButton" @click="$router.go(-1)"></button>
    <div id="wrapper" v-if="doneMarking">

    <div class="question" >
      <h3>Question: "Inheritance is:"</h3>
        <li>0:"a has-a relationship between classes",</li>
        <li>1:"an is-a relationship between classes",</li>
        <li>2:"a relationship between classes sharing variables"</li>
      <h4>Student Response: 1. an is-a relationship between classes</h4>
      <h3>Enter marking and feedback:</h3>
      <div class="block">
        <label for="marks"> Marks:</label><input name="marks" type="number" min=0 max=4 required placeholder="0"> 
      </div>
      <div class="block">
          <label for="feedback"> Feedback:</label><input name="feedback" type="text">
      </div>
    </div>

    <div class="question">
      <h3>Question: "What is a function?"</h3>
      <h3>Student Response: a call</h3>
      <h3>Enter marking and feedback:</h3>
      <div class="block">
        <label for="marks"> Marks:</label><input name="marks" type="number" min=0 max=4 required placeholder="0"> 
     </div>
     <div class="block">
        <label for="feedback"> Feedback:</label><input name="feedback" type="text">
      </div>
    </div>

    <div class="question">
      <h3>Question: "Discuss the difference between methods, functions and procedures."</h3>
      <h3>Student Response: april 20th</h3>
      <h3>Enter marking and feedback:</h3>
      <div class="block">
          <label for="marks"> Marks:</label><input name="marks" type="number" min=0 max=8 required placeholder="0">
      </div>
      
           <div class="block">
        <label for="feedback"> Feedback:</label><input name="feedback" type="text">
      </div>
    </div>
    
    <button v-if="doneMarking" id="submitButton" @click="submit()">Submit</button>
    </div>
    <div id="doneMarking" v-if="!doneMarking">
      <h2>Looks like you have no more responses to mark</h2>
      <h2>Press the back button to go back to the homepage</h2>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {

  data()
  {
    return{
      doneMarking: true
    }
  },

  methods:
  {
    submit()
    {
      this.doneMarking = !this.doneMarking
      const url = 'http://localhost:5000/test/default'
    
        axios.get(url).then((data) => 
        {
          console.log(data)
        }).catch( (error) => 
        {
          console.log(error)
        }).finally( () => 
        {
          console.log("How about fuck you ?")
        })
    }
  },
  // mounted()
  // {
  //   if(!this.getValidSession)
  //   {
  //     this.$router.push('/404')
  //   }
  // },

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: lightblue;
    color: #003e68;
    width: 65em;
    padding: 2em;
  }

  #markResponse #wrapper
  {
    background-color: white;
    padding: 5em;
    justify-content: center;
    align-items: center;
  }

  #markResponse #wrapper h1
  {
    text-align: center;
    margin-bottom: 2.5em;
  }
  
  .question
  {
    padding: 1em;
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

  .block
  {
    margin-right: 2em;
  }

  label
  {
    display: inline-block !important;
    text-align: right;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 400px;
    line-height: 26px;
    margin-bottom: 10px;
  }

  /* input {
  height: 20px;
  flex: 0 0 200px;
  margin-left: 10px;
  } */
  
  #submitButton
  {
    background-color: #003e68;
    text-align: center;
    border: none;
    width: 10em;
    height: 3em;
    color: white;
  }

  #doneMarking
  {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  input
  {
    margin-left: 5em;
  }

</style>