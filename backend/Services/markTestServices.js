const testS = require("./testServices.js")

module.exports = {

  //makes isMarked true for a test

  finishMarkingTest: (testID) => {
    test = testS.getTest(testID)
    test.isMarked = true
    testS.setTest(testID, test)
  },

  //returns the index of the first unmarked response in responses array

  getFirstUnmarkedResponseIndex(testID) {
    responseTest = testS.getTest(testID, true)
    for (i in responseTest.responses) {
      if ((responseTest.responses[i] = null)) {
        return i
      }
    }
  },
  
  //its like an object in the responsedb array

  getUnmarkedResponses: (testID) => {

    responseTest = testS.getTest(testID, true)
    output = []
    indexOfFirstUnmarked = this.getFirstUnmarkedResponseIndex(testID)
    for (i = indexOfFirstUnmarked; i < responseTest.responses.length; i++) {
      output.push(responseTest.responses[i])
    }
    return output
  },

  //something that examiner calls every time he marks a response
  //it will add marks to unmarked responses starting with the firs unmarked
  //as they will be marked in that order no problems should occur
  //marksForTests is an array of arrays of numbers

  addMarksToFirstUnmarkedResponse: (testID, marksForTests) => {
    responseTest = testS.getTest(testID, true)
    indexOfFirstUnmarked = this.getFirstUnmarkedResponseIndex(testID)
    for (i = indexOfFirstUnmarked; i < responseTest.responses.length; i++) {
      responseTest.responses[i] = marksForTests.shift()
    }
    testS.setTest(testID, test, true)
  },
}
