const {response_db} = require("../Database/responses.json")
const {test_db} = require("../Database/tests.json")
const path = require("path")
const jsonUpdater = require("update-json-file")



module.exports =
{
    submitTest: (studentID,testID, answer) =>
    {
      const filePath = path.join(
        path.normalize(__dirname + "/..") + "/Database/responses.json",
      )
      let index

      for(i in response_db)
      {
        if(response_db[i].testID === testID)
        {
          index = i
        }
      }

      let newResponse = {"studentID":studentID, "answers":answer, "marks":[],"feedback":[]}
      
      jsonUpdater(filePath, (data) =>
      {
        data.response_db[index].responses.push(newResponse)
  
        return data
      })

    },

   

    getUnmarkedResponse: (testID) =>
    {
      let index

      for(i in response_db)
      {
        if(response_db[i].testID === testID)
        {
          index = i
        }
      }

      let max = response_db[index].responses.length
      let response
      let marked = true
      for(let i=0; i<max; i++)
      {
        if(response_db[index].responses[i].marks.length === 0)
        {
          response = response_db[index].responses[i]
          marked = false
          break;
        }
      }

      if(marked)
      {
        return {"status":"marked"}
      }
      else
      {
        return response
      }

    },

    // response = {marks: [], feedback: []}
    submitResponse: (studentID, testID, response) =>
    {
      const filePath = path.join(
        path.normalize(__dirname + "/..") + "/Database/responses.json",
      )
      let responseDBIndex
      let responsesIndex

      for(i in response_db)
      {
        if(response_db[i].testID === testID)
        {
          responseDBIndex = i
        }
      }

      for(i in response_db[responseDBIndex])
      {
        if(response_db[i].studentID === studentID)
        {
          responsesIndex = i
        }
      }

      jsonUpdater(filePath, (data) =>
      {
        data.response_db[responseDBIndex].responses[responsesIndex].marks = response.marks
        data.response_db[responseDBIndex].responses[responsesIndex].feedback = response.feedback
        return data
      })
    },

    getResponse: (studentID, testID) =>
    {
      let dbIndex
      let rpIndex

      for(const index in response_db)
      {
        if(response_db[index].testID == testID)
        {
          dbIndex = index
        }
      }

      for(const index in response_db[dbIndex].responses)
      {
        if(response_db[dbIndex].responses[index].studentID == studentID)
        {
          rpIndex = index
        }
      }

      return response_db[dbIndex].responses[rpIndex]
    },

    getTestQuestions: (testID) =>
    {
      let test;
      for(i in test_db)
      {
        if(test_db[i].testID === testID)
        {
          test = test_db[i]
        }
      }
      return test.questions
    }
}
