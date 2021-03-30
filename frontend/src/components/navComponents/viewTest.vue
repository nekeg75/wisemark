<template>
  <div id="viewTest" @click="$store.commit('setActiveComp','viewTest')">
    <h2>View Tests</h2>
  </div>
</template>

<script>
export default {

}
</script>

<style>

  #viewTest
  {
    padding: 0.5em;
    padding-top: 0.2em;
    width: 9em;
    height: 4em;
    border: 0.2em solid #003e68;
  }

  #viewTest:hover
  {    
    background-color: #0362a1;
    border-color: #0362a1;
    cursor: pointer;
  }

  #viewTest:hover h2 
  {
    color: white;
  }

  #viewTest h2 {text-align: center;}

</style>