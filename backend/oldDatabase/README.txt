
users.json:

    -There can be two types of users: "1" represents an examiner and "2" indicates a student.
    -Each user is assigned to a unique userID: the first digit corresponds to the type of the user, and the rest of the ID is generated in a chronological order according to the date when the account has been added.
    -Login information for each user (email and password) are also stored.
    -Users of type 1 (examiners) include an array of tests they have created.

tests.json:
    -All of the tests have their details stored in vars (identification number, name of the module, examiner's name and ID, test's name, date, start/end time, type of test) 
    -All of the tests have their details stored in vars (identification number, name of the module, examiner's name and ID, test's name, date, start/end time, array of students that need to take the test, type of test) 
    -2 types of tests are represented: 
            1.Exam (isExam=true)
            2.Quiz (isExam=false)
    -Each test has different types of questions: MCQ (type 0), text-based with short (type 1) or long-answers (type 2)
    -All the questions have a number, a string with the appropriate question, an attributed mark.
    -Each question can have a hint (however not necessarily required), hence the variable maxMark stores the capped mark in case the student uses the hint.
    -Structure for MCQs:
            -has several possibilities of answers in the array "options"
            -the right answer (correct option number) is stored in the variable "answer"
    -Structure for text-based questions:
            -a sample answer is written
            -for short-answer questions, the variable "keywords" stores the words needed to validate the answer by the AI.

responses.json:
    -Responses are stored such that each test (represented by its ID and the examiner's ID) has an array of test responses.
    -Each test response states the answers of the students (denoted by its userID) with the assigned marks and the feedback for each answer.

Comments:

test.json
  //add 2 exams and 2 quizes
  //students taking the test must be in studentsID array

responses.json
  //if marks are null means that it is not yet marked
