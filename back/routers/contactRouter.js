const express = require("express")
const contactController = require('../controllers/contactController')
const contactRouter = express.Router()
const passport = require('passport')
require('../config/passport')(passport)

// Delete friend router
contactRouter.post('/deleteFriend', contactController.deleteFriend)

// Accept incoming request
contactRouter.post('/acceptFriend', contactController.acceptFriend)

// Return contact 
contactRouter.get('/contact', contactController.getContact)

// Change remark of user
contactRouter.post('/changeRemark', contactController.changeRemark)

// Edit the tag
contactRouter.post('/editTag', contactController.editTag)

module.exports = contactRouter
