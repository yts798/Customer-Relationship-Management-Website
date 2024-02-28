const express = require("express")
const infoController = require('../controllers/infoController')
const userController = require('../controllers/userController')
const infoRouter = express.Router()


// Edit information of the user
infoRouter.post('/editInfo', infoController.editInfo)

// Return user information
infoRouter.get('/', userController.getUserInfo)

// Upload Image of user sent
infoRouter.post('/uploadImage', infoController.uploadImage)

module.exports = infoRouter
