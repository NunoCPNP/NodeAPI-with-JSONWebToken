const router = require('express').Router()

const AuthController = require('../controllers/AuthController')

// ! USER REGISTRATION
router.post('/register', AuthController.register)

// ! USER LOGIN
router.post('/login', AuthController.login)

module.exports = router
