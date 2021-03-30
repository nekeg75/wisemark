<template>
  <div id="testStats">
    <button id="backButton"
    @click="$router.go(-1)"></button>
    <div id="wrapper">
      <table class="avg-table">
        <caption>
          Viewing OOPMID2022 Statistics
        </caption>
        <tr>
          <th>Year</th>
          <th>2020</th>
          <th>2019</th>
          <th>2018</th>
          <th>2017</th>
        </tr>
        <tr>
          <td>Mean</td>
          <td>78%</td>
          <td>67%</td>
          <td>83%</td>
          <td>75%</td>
        </tr>
        <tr>
          <td>Median</td>
          <td>75%</td>
          <td>64%</td>
          <td>84%</td>
          <td>77%</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>73%</td>
          <td>68%</td>
          <td>81%</td>
          <td>75%</td>
        </tr>
        <tr>
          <td>Pass Rate</td>
          <td>79%</td>
          <td>65%</td>
          <td>78%</td>
          <td>71%</td>
        </tr>
        
        
      </table>
  </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed:
  {
    ...mapGetters(['getValidSession'])
  },
  // mounted()
  // {
  //   if(!this.getValidSession)
  //   {
  //     this.$router.push('/404')
  //   }
  // }
}
</script>

<style>

  #testStats
  {
    margin-top: 3em;
    background-color: lightblue;
    width: 50em;
    height: 50em;
    padding: 10em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #wrapper 
  {
    background-color: white;
  }
  
  .avg-table
  {
    position: relative;
    color:#003e68;
  }
  
  .MMM-table
  {
    position: relative;
    color:black;
  }
  
  table,th,td
  {
    border: 1px solid #003e68;
    border-collapse: collapse;
    font-weight: bold;
    text-align: center;
    padding: 5em; 
  }
  th {
    padding: 2em;
  }
  td {
    padding: 2em;
  }

  caption
  {
  background-color:#003e68;
    color: white;
    padding: 1px;
    margin: 0;
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