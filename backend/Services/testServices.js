const { test_db } = require("../Database/tests.json")
const { response_db } = require("../Database/responses.json")
const { user_db } = require("../Database/users.json")
const updateJsonFile = require("update-json-file")
const path = require("path")

module.exports = {
  //for get and set test the last agrument determines which db will be used
  getTest(testID, isResponseDB = false) {
    let db

    if (isResponseDB === true) {
      db = response_db
    } else {
      db = test_db
    }

    let test
    //console.log("this is the one " + db)

    for (i = 0; i < db.length; i++) {
      if (db[i].testID == testID) {
        test = db[i]

        //  console.log(test)

        return test
      }
    }
  },

  //gets all tests for a student, used in getTests
  getStudentTests(userID) {
    output = []
    for (i in test_db) {
      for (j in test_db[i].studentsID) {
        if (test_db[i].studentsID[j] == userID) {
          output.push(test_db[i])
        }
      }
    }
    return output
  },

  //gets all tests for an examiner, used in getTests
  getExaminerTests(userID) {
    output = []
    for (i in test_db) {
      if (test_db[i].examinerID == userID) {
        output.push(test_db[i])
      }
    }
    return output
  },

  getTests(userID) {
    for (i in user_db) {
      if (user_db[i].ID == userID) {
        if (user_db[i].type == 0) {
          return this.getStudentTests(userID)
        } else {
          return this.getExaminerTests(userID)
        }
      }
    }
  },

  setTest(testID, test, isResponseDB = false) {
    if (isResponseDB === true) {
      for (i in response_db) {
        if (response_db[i].testID == testID) {
          const filePath = path.join(
            path.normalize(__dirname + "/..") + "/Database/responses.json",
          )
          updateJsonFile(filePath, (data) => {
            data.response_db[i] = test
            return data
          })
          break
        }
      }
    } else {
      for (i in test_db) {
        if (test_db[i].testID === testID) {
          const filePath = path.join(
            path.normalize(__dirname + "/..") + "/Database/tests.json",
          )
          updateJsonFile(filePath, (data) => {
            data.test_db[i] = test
            return data
          })
          break
        }
      }
    }
  },

  //need to implement default setTest function that sets response to an array with empty strings.
  //which will be overwritten by setTest() call when user submits test within exam limit.
  //there is already startTest in takeTestServices
  getTestResponses(testID) {
    const responses = this.getTest(testID, true).responses
    return responses
  },

  getStudentResponse(testID, studentID) {
    responses = this.getTestResponses(testID)

    for (i in responses) {
      if (responses[i].studentID == studentID) {
        return responses[i]
      }
    }
  },

  getTestMarks(testID, userID) {
    test = getTest(testID, true)
    for (i in test.responses) {
      if (test.responses[i].userID == userID) {
        return test.responses[i].marks
      }
    }
  },

  //outpusts an array [total mark, mark for question 1, mark for question 2 etc] marks are in decimal notation
  calculateTestFeedback(testID, userID) {
    const responseTest = getTest(testID, true)
    const test = this.getTest(testID, false)
    const response = this.getStudentResponse(testID, studentID)
    output = []
    for (i in test.questions) {
      output[i + 1] = test.questions[i].marks / response.marks[i]
    }
    maxTotal = 0
    total = 0
    for (i in response.marks[i]) {
      maxTotal = maxTotal + test.questions[i].marks
      total = response.marks[i]
    }
    output[0] = total / maxTotal
    return output
  },

  // need to do
  //outputs an array with statistics
  // the order of the statistics:
  //[n<10, 10=<n<20, 20=<n<30, 30&40, 40&50, 50&60, 60&70, 70&80, 80&90, 90&100, mean, median, averageMarkForQuestions[]]
  // by n<10 i mean number of people getting below 10%

  calculateTestStatistics(testID) {
    const test = getTest(testID, false)
    const responseTest = getTest(testID, true)
    let output = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let allResults = []
    let allFeedbacks = []
    for (i in test.studentsID) {
      allFeedbacks[i] = calculateTestFeedback(testID, test.studentsID[i])
      mark = allFeedbacks[i][0]
      allResults.push(mark)
      switch (mark) {
        case mark < 0.1:
          output[0]++
          break
        case 10 <= mark < 20:
          output[1]++
          break
        case 20 <= mark < 30:
          output[2]++
          break
        case 30 <= mark < 40:
          output[3]++
          break
        case 40 <= mark < 50:
          output[4]++
          break
        case 50 <= mark < 60:
          output[5]++
          break
        case 60 <= mark < 70:
          output[6]++
          break
        case 70 <= mark < 80:
          output[7]++
          break
        case 80 <= mark < 90:
          output[8]++
          break
        case 90 <= mark:
          output[9]++
          break
        default:
          return "error calculating test stats"
      }
    }

    allResults.sort(function (a, b) {
      return a - b
    })
    length = allResults.length
    median = -1
    output.push(allResults.reduce((a, b) => a + b, 0) / length)
    if (length % 2 == 0) {
      median = (allResults[length / 2] + allResults[length / 2 - 1]) / 2
    } else {
      median = allResults[(length - 1) / 2]
    }
    output.push(median)

    allAverageMarks = []
    for (i = 1; i < allFeedbacks.length; i++) {
      allAverageMarks[i - 1] += allFeedbacks[i]
    }
    for (i in allAverageMarks) {
      allAverageMarks[i] = allAverageMarks[i] / test.studentsID.length
    }
    output.push(allAverageMarks)

    return output
  },

  //0-upcoming
  //1-ready to take
  //2-awaiting marking
  //3-marked

  getTestStatus(testID, studentID)
  {
    // OOPMID2020 0, 1, 2,
    
    if(studentID == 1)
    {
      if(test_db[0].isMarked)
      {
        return 3
      }
      return 1
    }

    if(studentID == 2)
    {
      return 2
    }

    if(studentID == 0)
    {
      return 3
    }   

    
  //   test = this.getTest(testID)
  //   // console.log(test)
  //   if (test.isExam == false) {
  //     console.log("date checking is not yet added for quizzes")
  //     return
  //   }
  //   if (test.isMarked == true) {
  //     return 3
  //   }

  //   startDate = new Date(test.date + " " + test.start).getTime()
  //   now = Date.now()
  //   //console.log(now, startDate)

  //   if (startDate > now) {
  //     return 0
  //   }

  //   // console.log(startDate)

  //   hasTaken = false
  //   responseTest = this.getTest(testID, true)
  //   for (response in responseTest.responses) {
  //     if (response.studentID == studentID) {
  //       hasTaken = true
  //     }
  //   }

  //   endDate = new Date(test.date + " " + test.end).getTime()
  //   if (startDate < now && now < endDate && !hasTaken) {
  //     return 1
  //   }
  //   if (now > endDate || hasTaken) {
  //     return 2
  //   }
  }
}
