const express = require("express")
const TokenIssueController = require("../controllers/TokenIssueController")
const UserController = require("../controllers/UserController")
const TokenVerifyMiddleware = require("../middleware/TokenVerifyMiddleware")



const router = express.Router()

// token issue
//router.get("/issue-token", TokenIssueController.issueToken)

// User
router.post("/create-user", UserController.createUser)

// jwt authenticate
// router.get("/students", TokenVerifyMiddleware, StudentsController.getAllStudents)
// router.get("/students/:id", TokenVerifyMiddleware, StudentsController.getStudent)
// router.post("/students", TokenVerifyMiddleware, StudentsController.saveStudent)
// router.put("/students/:id", TokenVerifyMiddleware, StudentsController.updateStudent)
// router.delete("/students/:id", TokenVerifyMiddleware, StudentsController.deleteStudent)



module.exports = router