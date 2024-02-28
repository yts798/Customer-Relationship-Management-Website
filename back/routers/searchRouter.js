const express = require("express")
const userController = require('../controllers/userController')
const searchRouter = express.Router()

// Search the user by userid
searchRouter.post('/search', userController.SearchUserID)

// Send a request
searchRouter.post('/addFriend', userController.addFriend)

module.exports = searchRouter
