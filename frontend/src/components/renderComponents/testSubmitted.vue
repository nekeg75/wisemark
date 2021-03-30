<template>
  <div id="testSubmitted">
      <h2>Test Submitted!</h2>
      <h2 id="goHome" @click="home()">Go Home</h2>
  </div>
</template>

<script>
export default {
  data()
  {
    return{

    }
  },
  
  methods: 
  {
    home()
    {
      this.$router.push("/home")
    }
  }
}
</script>

<style>

  #testSubmitted 
  {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: #003e68;
    width: 25em;
    height: 12em;
    max-width: 80%;
    margin-top: 10em;
    padding: 2em;
    border: 0.2em solid #003e68;
    border-radius: 0.5em;
    box-shadow: 0em 1em 2em rgba(0,0,0,.3);
  }

  #goHome 
  {
    justify-content: center;
    align-content: center;
    border-radius: 1em;
    background-color: #003e68;
    color: white;
  }

  #goHome:hover
  {
    cursor:pointer;
  }

</style>