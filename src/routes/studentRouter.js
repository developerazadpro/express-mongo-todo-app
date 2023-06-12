const express = require("express")
const StudentsController = require("../controllers/StudentsController")
const TokenController = require("../controllers/TokenController")
const TokenIssueController = require("../controllers/TokenIssueController")
const TokenVerifyMiddleware = require("../middleware/TokenVerifyMiddleware")



const router = express.Router()

// token issue
router.get("/issue-token", TokenIssueController.issueToken)

// jwt authenticate
router.get("/students", TokenVerifyMiddleware, StudentsController.getAllStudents)
router.get("/students/:id", TokenVerifyMiddleware, StudentsController.getStudent)
router.post("/students", TokenVerifyMiddleware, StudentsController.saveStudent)
router.put("/students/:id", TokenVerifyMiddleware, StudentsController.updateStudent)
router.delete("/students/:id", TokenVerifyMiddleware, StudentsController.deleteStudent)


// practice jwt
router.get("/create-token", TokenController.createToken)
router.post("/verify-token", TokenController.verifyToken)

module.exports = router