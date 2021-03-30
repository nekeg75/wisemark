<template>
  <div id="viewStats" @click="$store.commit('setActiveComp','viewStats')"> 
    <h2>View Statistics</h2>
  </div>
</template>

<script>
export default {
  data()
  {
    return{

    }
  }
}
</script>

<style>

  #viewStats
  {
    padding: 0.5em;
    padding-top: 0.2em;
    width: 11em;
    height: 4em;
    border: 0.2em solid #003e68;
  }
  
  #viewStats:hover
  {    
    background-color: #0362a1;
    border-color: #0362a1;
    cursor: pointer;
  }
  
  #viewStats:hover h2
  {
    color: white;
  }

  #viewStats h2 {text-align: center;}
  
</style>