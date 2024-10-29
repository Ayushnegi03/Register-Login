const express = require('express');
const RegisterController = require('./../Controllers/RegisterController')
const router = express.Router()



router.route('/register').post(RegisterController.register)
router.route('/login').post(RegisterController.login)
module.exports = router