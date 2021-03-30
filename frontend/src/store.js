import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'

Vue.use(vuex)

export const store = new vuex.Store({
  state: {
    user: { id: "default", name: "default", type: "default"},
    tests: [{testID:"default"}],
    activeComp: {
      viewTest: false,
      viewStats: false,
      markTest: false
    },
    sessionTest: null,
    sessionQuestions: [],
    sessionResults: null,
    sessionResponse: null,
    tempState: "Getting test state"
  },

  getters: {

    getUserID(state)
    {
      return state.user.ID
    },

    getUserName(state)
    {
      return state.user.name
    },

    getUserType(state)
    {
      return state.user.type
    },

    getTests(state)
    {
      return state.tests
    },

    getTempState(state)
    {
      return state.tempState
    },

    viewTest(state)
    {
      return state.activeComp.viewTest
    },

    viewStats(state)
    {
      return state.activeComp.viewStats
    },

    markTest(state)
    {
      return state.activeComp.markTest
    },

    getSessionTest(state)
    {
      return state.sessionTest
    },

    getSessionTestID(state)
    {
      return state.sessionTest.testID
    },

    getSessionQuestions(state)
    {
      return state.sessionQuestions
    },

    getSessionQuestionLength(state)
    {
      return state.sessionQuestions.length
    },

    getSessionResults(state)
    {
      return state.sessionResults
    },

    getSessionResponse(state)
    {
      return state.sessionResponse
    },

    getValidSession(state)
    {
      if(state.user.id === "default")
      {
        return false
      }
      return true
    }

  },

  mutations:
  {
    updateUser(state, user)
    {
      state.user = user
    },

    updateTests(state, userID)
    {
      const url = `http://localhost:5000/test/getAllTests/${userID}`
      let responseTest
      axios.get(url).then( (data) =>
      {
        responseTest = data.data.tests

      }).catch( (error) => 
      {
        console.log(error)
      }).finally(() =>
      {
        state.tests = responseTest
      })
      
    },
    
    setTempState(state, testID)
    {
      const url = `http://localhost:5000/test/getStatus/${testID}/${state.user.ID}`
      let newTempState
      axios.get(url).then( (data) =>
      {
        newTempState = data.data
      }).catch( (error) => 
      {
        console.log(error)
      }).finally(() => 
      {
        state.tempState = newTempState
      })
    },

    //Wipes app state to all default values
    wipeState(state)
    {
      state.tests = [{testID:"default"}]
      state.activeComp = {viewTest: false,viewStats: false,markTest: false}
      state.user = { id: "default", name: "default", type: "default"}
    },

    setActiveComp(state, component)
    {
      for(const key in state.activeComp)
      {
        if(key == component)
        {
          state.activeComp[key] = true
        }
        else
        {
          state.activeComp[key] = false
        }
      }
    },

    clearActiveComp(state)
    {
      for(const key in state.activeComp)
      {
        state.activeComp[key] = false
      }
    },

    setSessionTest(state, payloadtestID)
    {
      for(const index in state.tests)
      {
        if(state.tests[index].testID === payloadtestID)
        {
          state.sessionTest = state.tests[index]
        }
      }
    },

    startTest(state, testID)
    {
      const url = `http://localhost:5000/startTest/${testID}/${state.user.ID}`
      axios.get(url).then( (data) =>
      {
        console.log(data)
      }).catch( (error) => 
      {
        console.log(error)
      })
      
    },

    wipeSessionStates(state)
    {
      state.sessionTest = null
      state.sessionQuestions = null
      state.sessionResults = null
      state.sessionResponse = null
    },

    setSessionQuestions(state, testID)
    {
      const url = `http://localhost:5000/test/getTestQuestions/${testID}`
      let questions
      axios.get(url).then( (data) => 
      {
        questions = data.data
      }).catch((error) => 
      {
        console.log(error)
      }).finally(() => 
      {
        state.sessionQuestions = questions
      })
      
    },

    setSessionResults(state, testID)
    {
      const url = `http://localhost:5000/test/getResponse/${state.user.ID}/${testID}`
      let output

      axios.get(url).then( (data) => 
      {
        output = data.data
      }).catch( (error) => 
      {
        console.log(error)
      }).finally( () => 
      {
        state.sessionResults = output  
      })

    },

    setSessionResponse(state, testID)
    {
      let responseOutput 
      let url = `http://localhost:5000/test/getMarking/${testID}`
  
      axios.get(url).then((data) => 
      {
        responseOutput = data.data
      }).catch((error) => {
        console.log(error)
      }).finally(() => 
      {
        state.sessionResponse = responseOutput
      })
    }
  }
})