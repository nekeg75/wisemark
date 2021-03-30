<template>
  <div id="markTest" @click="$store.commit('setActiveComp','markTest')">
    <h2>Mark Test</h2>
  </div>
</template>

<script>
export default {
  data(){
    return{
    }
  }
}
</script>

<style>

  #markTest
  {
    padding: 0.5em;
    padding-top: 0.2em;
    width: 9em;
    height: 4em;
    border: 0.2em solid #003e68;
  }

  #markTest:hover
  {    
    background-color: #0362a1;
    border-color: #0362a1;
    cursor: pointer;
  }

  #markTest:hover h2
  {
    color: white;
  }

  #markTest h2 {text-align: center;}

</style>