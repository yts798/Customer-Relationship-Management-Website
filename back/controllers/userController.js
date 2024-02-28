// userController will be written on next 
require('dotenv').config()
const User = require('../models/user');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Contact = require('../models/contact')
require('../config/passport')(passport)

// Create a new user
const UserSignup = (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, error: info.message })
        }
        // If the user is not found or there is some mistakes in password, return error message
        else if (!user) {
            return res.status(400).json({ success: false, error: info.message })
        }
        req.login(user, { session: false }, async (error) => {

            if (error) return next(error);

            const body = { _id: user._id };
            //Sign the JWT token and populate the payload with the user email
            //Send back the token to the client
            const token = jwt.sign({ body }, process.env.JWT_PASSWORD);
            return res.status(200).json({ success: true, data: user._id, token: token });
        });
    })(req, res, next)
}

// User log in function
const UserLogin = (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        // If there were errors during executing the strategy or the user was not found, we display and error
        if (err) {
            return res.status(500).json({ success: false, error: info.message })
        } else if (!user) {
            return res.status(400).json({ success: false, error: info.message })
        }
        req.login(user, { session: false }, async (error) => {
            if (error) return next(error);
            if (user.ban) {
                return res.status(400).json({ success: false, error: "Your account has been banned, Please contact with admin!" })
            }
            const body = { _id: user._id };

            //Sign the JWT token and populate the payload with the user email
            const token = jwt.sign({ body }, process.env.JWT_PASSWORD);
            //Send back the token to the client
            return res.status(200).json({ success: true, data: user._id, token: token });
        });
    })(req, res, next)
}


// Search the user by id
const SearchUserID = async (req, res) => {
    try {
        let user = await User.findOne({ userID: req.body.userID }, {});
        if (user) {
            // If a user is searching his own id, will return error message
            if (user.userID === req.user.userID) {
                return res.status(400).json({ success: false, error: "You cannot search yourself" })
            } else {

                return res.status(200).json({ success: true, user: user })
            }
        }
        else {
            return res.status(400).json({ success: false, error: "User not found!" })
        }
    } catch (err) {
        return res.status(400).json({ success: false })
    }
}

// Add friend
const addFriend = async (req, res) => {
    try {
        let existingContact = await Contact.findOne({ friend: req.body.friend, user: req.user._id })
        if (existingContact) {
            return res.status(200).json({ success: false, error: "You have added this user" })
        }

        console.log(req.body.message)
        // Add a new contact for the requester
        let newContact = new Contact({
            remark: req.body.remark,
            message: req.body.message,
            user: req.user._id,
            friend: req.body.friend,
            status: "pending",
            tag: [],
        })
        newContact.save(err => {
            if (err) throw err
            return res.status(200).json({ success: true })
        })

    } catch (err) {
        console.log(err)
    }
}

// Return user information to render in the website
const getUserInfo = async (req, res) => {
    try {
        return res.status(200).json({ success: true, user: req.user })

    } catch (err) {
        return res.status(400).json({ success: false })
    }
}

// Return all the users 
const viewUsers = async (req, res) => {
    try {
        let users = await User.find({})
        return res.status(200).json({ success: true, users: users, admin: req.user })
    }
    catch (err) {
        return res.status(404).json({ success: false, error: "Web crashed" })
    }
}

// Ban the User
const banUser = async (req, res) => {
    try {
        await User.updateOne({ _id: req.body._id }, { $set: { ban: true } })
        return res.status(200).json({ success: true })
    }
    catch (err) {
        console.log(err)
        return res.status(404).json({ success: false, error: "Web carshed" })
    }
}

// Unban the user
const unbanUser = async (req, res) => {
    try {
        await User.updateOne({ _id: req.body._id }, { $set: { ban: false } })
        return res.status(200).json({ success: true })
    }
    catch (err) {
        return res.status(404).json({ success: false, error: "Web carshed" })
    }
}

module.exports = { UserSignup, UserLogin, addFriend, getUserInfo, SearchUserID, viewUsers, banUser, unbanUser }
