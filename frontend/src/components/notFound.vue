<template>
  <div id="notFound">
    <h1>Error: Page not found</h1>
    <h2> Go back to login page</h2>
    <h3 @click="notFound()">Get me out of here</h3>
  </div>
</template>

<script>
export default {

  methods:
  {
    notFound()
    {
      this.$store.commit("wipeState")
      this.$router.push('/')
    }
  }
}

</script>

<style>

  #notFound
  {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: #003e68;
    margin-top: 3em;
    height: 20em;
  }


  #notFound h3
  {
    background-color: #003e68;
    color: white;
    padding: 0.5em;
    font-size: 1em;
  }

  #notFound h3:hover 
  {
    cursor: pointer;
  }

</style>