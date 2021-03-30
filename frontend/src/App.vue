<template>
  <div id="app">
    <div id="banner">
      <h1>WiseMark</h1>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Lato&family=Sen:wght@700&display=swap');
  
  html, *
  {
    margin: 0em;
    font-family: 'Sen', sans-serif;
  }

  #banner 
  {
    display: flex;
    justify-content: center;
    background-color: #003e68;
    font-size: 3em;
    padding:0em 0.5em 0em 0.5em ;
    color: white;
  }

  #app
  {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 1em;
  } 
</style>
