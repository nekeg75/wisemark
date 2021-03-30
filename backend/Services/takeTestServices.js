const testS = require("./testServices.js")
module.exports = {
  //adds no answers, if the session is closed before the test is submitted this is only thing that is submitted therefore student gets 0%
  startTest: (studentID, testID) => {
    responseTest = testS.getTest(testID, true)
    testLength = testS.getTest(testID).questions.length
    emptyAnswers = []
    for (i = 0; i < testLength; i++) {
      emptyAnswers[i] = ""
    }
    this.submitAnswers(studentID, testID, emptyAnswers)
  },

  submitAnswers: (studentID, testID, answers) => {
    responseTest = testS.getTest(testID, true)
    for (i in responseTest.responses) {
      if (responseTest.responses[i].studentID === studentID) {
        for (j in answers) {
          responseTest.responses[i].answers[j] = answers[j]
        }
        return
      }
    }
  },

  hasTakenTest(testID, studentID) {
    responses = testS.getTestResponses(testID)

    for (i in responses) {
      if (responses[i].studentID == studentID) {
        return true
      }
    }
    return false
  },
}
