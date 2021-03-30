<template>
  <div id="end">
    <h1>Logout successful</h1>
    <button @click="submitLogin()">Login</button>
  </div>
</template>

<script>

// import {mapGetters} from 'vuex'

export default {

  // computed:
  // {
  //   ...mapGetters(['getValidSession'])
  // },

  methods:
  {
    submitLogin()
    {
      this.$router.push('/')
    }
   }/*,

  mounted()
  {
    console.log("mounted call")
    if(!this.getValidSession)
    {
      console.log("reached")
      this.$router.push('/404')
    }
  } */
}
</script>

<style>
  
  #end
  {
    position: relative;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    padding: 2em;
    margin-top: 3em;
    border: 0.2em solid #003e68;
    color: #003e68;
    width: 20em;
    box-shadow: 0em 1em 2em rgba(0,0,0,.3);
  }

  #end button
  {
    margin: auto;
    display: block;
    margin-top: 1em;
    width: 5em;
    height: 2em;
    color: white;
    font-size: 1.5em;
    border: none;
    background-color: #003e68;
    border-radius: 0.2em;
  }

  #end button:hover
  {
    cursor: pointer;
  }

</style>