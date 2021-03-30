<template> 
  <div id="login" v-bind:style="{ height: computedHeight }">
    <h3>Login</h3>
    <div v-if="authError" id="errorMessages">
      <!-- <p v-for="(message, index) in errorMessage" :key="`message-${index}`">{{message}}</p> -->
      <p v-if="loginAttempts >= 1">{{errorMessages[0]}}</p>
      <p v-if="loginAttempts > 2">{{errorMessages[1]}}</p>
    </div>
    <input type="email" placeholder="Email" class="" v-model="emailInput">
    <br>
    <input type="password" placeholder="Password" v-model="passInput">
    <button v-if="hasEnteredInputs" @click="submitLogin()">Submit</button>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data()
  {
    return{
      emailInput: "",
      passInput: "",
      authError: false,
      errorMessages: [],
      loginAttempts: 0,
      height: "12em"
    }
  },
  computed: 
  {
    hasEnteredInputs()
    {
      if(this.emailInput && this.passInput)
      {
        this.height = "15em"
        if(this.loginAttempts > 0 && this.loginAttempts <= 2)
        {
          this.height = "18em"
          return true
        }
        if(this.loginAttempts > 2)
        {
          this.height = "20em"
          return true
        }
        return true
      }

      if(this.loginAttempts  > 0 && this.loginAttempts <= 2)
      {
        this.height = "15em"
        return false
      }
      if(this.loginAttempts > 2)
      {
        this.height = "18em"
        return false
      }

      this.height = "12em"
      return false
    },

    computedHeight()
    {
      return this.height
    },

    loginError()
    {

      return this.authError
    }
  },
  methods:
  {
    submitLogin()
    {

      this.loginAttempts++
      
      let url = 'http://localhost:5000/login'
      
      axios.post(url,{
        "email": `${this.emailInput}`,
        "password": `${this.passInput}`
      })
      .then((response) =>
      {
        const auth = this.validateUser(response.data)
        if(auth)
        {
          this.$store.commit('updateUser',response.data[0])
          this.authError = false;
        }
        else
        {
          this.unsuccessfulLogin(response.data)
        }
      })
      .catch((error) =>
      {
      })
      .finally(() =>
      {
        if(!this.authError)
        {
          this.$router.push('/home')
        }
      })
    },

    validateUser(user)
    {
      if(user.hasOwnProperty("errorMessages"))
      {
        return false
      }
      return true
    },

    unsuccessfulLogin(error)
    {
      this.errorMessages = error.errorMessages
      this.authError = true

      return
    }
  },

  beforeDestroy()
  {
    this.$store.commit("updateTests", this.$store.getters.getUserID)
  }

}
</script>

<style>

  * {font-family: 'Sen', sans-serif;}

  #login 
  {
    width: 25em;
    height: 12em;
    max-width: 80%;
    margin-top: 10em;
    padding: 2em;
    border: 0.2em solid #003e68;
    border-radius: 0.5em;
    box-shadow: 0em 1em 2em rgba(0,0,0,.3);
  }

  #login h3
  {
    position: relative;
    top: -1.4em;
    left: 29%;
    background-color: white;
    width: 3.3em;
    height: 1em;
    text-align: center;
    font-size: 300%;
    color: #003e68;
    margin-top: 0em;
    margin-bottom: 0em;
    padding: 0em;
    
  }

  #login input 
  {
    display: block;
    width: 94%;
    height: 2em;
    font-size: 1em;
    padding: 0.5em;
    color: #003e68;
  }

  #login input:focus
  {
    border-color: #003e68;
    outline-style:none;
    box-shadow:none;
    border-style: solid;
  }

  #login button
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
  }

  #login button:hover
  {
    cursor: pointer;
  }

  #errorMessages
  {
    position: relative;
    top: -2em;
    text-align: center;
    color: red;
  }


</style>