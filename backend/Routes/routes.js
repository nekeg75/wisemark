const login = require("../Services/login.js")
const testServices = require("../Services/testServices.js")
const markTestServices = require("../Services/markTestServices.js")
const takeTestServices = require("../Services/takeTestServices.js")
const path = require("path")
const frontendServices = require("../Services/frontendservices.js")
const jsonUpdater = require("update-json-file")

const test = () => {
  // console.log(testServices.getStudentResponse("OOPMID2022", 2))
  return true
}

module.exports = (app) => {
  app.post("/login", (req, res) => {
    const auth = login(req.body)
    if (auth[0]) {
      res.send(auth[1])
      return
    }
    res.send(auth[1])
  })

  app.get("/test/getStatus/:testID/:studentID", (req, res) => {
    const testID = req.params.testID
    const studentID = req.params.studentID
    out = testServices.getTestStatus(testID, studentID)
    res.send(`${out}`)
  })

  app.post("/test/submitTest", (req, res) => {
    const studentID = req.body.studentID
    const testID = req.body.testID
    const answers = req.body.answers

    frontendServices.submitTest(studentID, testID, answers)
  })

  app.get("/test/getMarking/:testID", (req, res) => {
    const testID = req.params.testID
    const response = frontendServices.getUnmarkedResponse(testID)

    res.send(response)
  })

  app.get("/test/default", (req, res) => 
  {
    const filePath = path.join(path.normalize(__dirname + "/..") + "/Database/tests.json")
    jsonUpdater(filePath, (data) =>
    {
      data.test_db[0].isMarked = true
      return data
    })

    res.send("OK")
  })

  app.post("/test/submitMarking", (req, res) => {
    const response = { marks: req.body.marks, feedback: req.body.feedback }
    const studentID = req.body.studentsID
    const testID = req.body.testID

    frontendServices.submitResponse(studentID, testID, response)
  })

  app.get("/test/getResponse/:studentID/:testID", (req, res) =>
  {
    const studentID = req.params.studentID
    const testID = req.params.testID
    const response = frontendServices.getResponse(studentID, testID)
    
    res.send(response)
  })

  app.get("/test/getTestQuestions/:testID", (req, res) => {
    const testID = req.params.testID
    const questions = frontendServices.getTestQuestions(testID)
    res.send(questions)
  })

  // Test Suite: Routing

  // Test getTest, returns test object given testID
  // no error checking because request can only be called by vue app that already has a user logged in
  app.get("/test/getTest/:testID", (req, res) => {
    //
    const testID = req.params.testID
    const test = testServices.getTest(testID)

    res.send(test.tests)
  })

  // Test getAllTest, returns tests array with all tests assigned to a student or created by examiner
  app.get("/test/getAllTests/:userID", (req, res) => {
    const userID = req.params.userID
    const tests = testServices.getTests(userID)
    res.send({ tests })
  })

  //gets unmarked responses for the examiner to make k
  app.get("/test/getUnmarkedResponses/:testID", (req, res) => {
    const testID = req.body.testID
    const responses = markTestServices.getUnmarkedResponses(testID)
    res.send(responses)
  })

  //adds marks to the first unmarked response, for more info see markTestServices
  //btw this should not be pressed more than once or error will happen
  //make sure to implement that in frontend
  app.get(
    "/test/addMarksToFirstUnmarkedResponse/:testID/:marksForFirstUnmarked",
    (req, res) => {
      markTestServices.addMarksToFirstUnmarkedResponse(
        req.body.testID,
        req.body.marksForFirstUnmarked,
      )
    },
  )

  app.get("/startTest/:testID/:studentID", (req, res) => {
    markTestServices.addMarksToFirstUnmarkedResponse(
      req.body.testID,
      req.body.marksForFirstUnmarked,
    )
  })

  app.get("/test/isTaken/:testID/:studentID", (req, res) => {
    res.send(takeTestServices.hasTakenTest(req.body.testID, req.body.studentID))
  })

  app.get("/404", (req, res) => {
    res.sendStatus("404, page not found", 404)
  })

  app.get("*", (req, res) => {
    res.redirect("/404")
  })
}
