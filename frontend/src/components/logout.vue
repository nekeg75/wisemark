<template>
  <div id="logout"
   @click="logout()">
    <h2>Logout
    <img src="../assets/logout.png"
    height="17%"
    width="17%"
    alt="arrow"></h2>
  </div>
</template>

<script>
export default {
  methods:
  {
    logout()
    {
      this.$store.commit("wipeState")
      this.$router.push('/end')
    }
  }
}

</script>

<style>

  #logout
  {
    padding: 0.5em;
    padding-top: 0.2em;
    width: 9em;
    height: 4em;
    border: 0.2em solid #003e68;
  }

  #logout:hover
  {    
    background-color: #0362a1;
    border-color: #0362a1;
    cursor: pointer;
    
  }

  #logout:hover h2
  {
    color: white;
  }
    
  #logout:hover img 
  {
    filter: invert(1)
  }

  #logout h2{padding-left: 0.25em;}

  img
  {
    position: relative;
    top: 0.16em;
    padding-left: 0.5em;
  }


</style>