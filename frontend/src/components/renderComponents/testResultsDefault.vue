<template>
  <div id="testResults">
    <button id="backButton"
    @click="$router.push('/home')"></button>
    <div id="wrapper">

    <h2>Total Marks: 8/16</h2>

    <div class="question">
        <h3>Question: "Inheritance is:" </h3>
        <h3>0. a has-a relationship between classes</h3>
        <h3>1. a is-a relationship between classes</h3>
        <h3>2. a relationship between classes sharing variables</h3>
        <h3>Marks: 4</h3>
        <h3>Answer: "an is-a relationship between classes" </h3>
        <h3>Your Mark: 4 </h3>
        <h3>Feedback: "correct answer selected"</h3>
    </div>

    <div class="question">
      <h3>Question: "What is a function?: " </h3>
      <h3>Marks: 4</h3>
      <h3>Answer: function is a method"</h3>
      <h3>Your Mark: 4</h3>
      <h3>Feedback: "A function is indeed a method however it does not explain what can it do and what is it."</h3>
    </div>

    <div class="question">
      <h3>Question: "Discuss the difference between methods, functions and procedures."</h3>
      <h3>Marks: 8</h3>
      <h3>Answer: "function and method not the same idk" </h3>
      <h3>Your Mark: 0 </h3>
      <h3>Feedback: "Revise your lecture notes"</h3>
    </div>
    </div>
  </div>  
</template>

<script>


export default {
  data()
  {
    return{
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
    this.$store.commit("wipeSessionStates")
  }
}

</script>

<style>

  #testResults
  {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: lightblue;
    width: 75%;
    margin-top: 3em;
    padding: 2em;

  }

  #wrapper
  {
    background-color: white;
    padding: 2em;
    text-align: center;
    width: 90%;
    color: #003e68;
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