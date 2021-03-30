<template>
    <div id="welcome" :style="h2Length">
      <h2>{{getUserName}}</h2>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  data()
  {
    return{
      
    }
  },
  computed:
  {
    ...mapGetters([
      'getUserName',
    ]),

    h2Length(){
      const len = this.getUserName.length
      let width = (3*len)/4 + 2
      if(len > 16)
      {
        width = width + (len**0.4) -2 
      }
      return {
        width: `${width}em`
      }
    }
  }
}
</script>

<style>

  #welcome
  {
    padding: 0.5em;
    padding-top: 0.2em;
    width: 18em;
    height: 4em;
    border: 0.2em solid #003e68;
  }

  #welcome:hover
  {    
    border-color: #003e68;
    border-color: #0362a1;
    cursor: pointer;
    
  }

  #welcome:hover h2
  {
    /* color: white; */
    color: #0362a1;
  }

  #welcome h2{padding-left: 0.25em;}

  img
  {
    position: relative;
    top: 0.12em;
    padding-left: 0.5em;
  }

</style>