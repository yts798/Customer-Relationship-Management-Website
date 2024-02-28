const Admin = require('../models/admin')
const passport = require("passport");
const jwt = require("jsonwebtoken");
require('../config/passport')(passport)

// Admin log in function
const adminLogin = (req, res, next) => {
    passport.authenticate('admin-local-login', (err, admin, info) => {
        // If there were errors during executing the strategy or the admin was not found, we display and error
        if (err) {
            return res.status(500).json({ success: false, error: info.message })
        } else if (!admin) {
            return res.status(404).json({ success: false, error: info.message })
        }
        req.login(admin, { session: false }, async (error) => {
            if (error) return next(error);
            const body = { _id: admin._id };
            console.log(body)
            //Sign the JWT token and populate the payload with the admin email
            const token = jwt.sign({ body }, process.env.JWT_PASSWORD);
            //Send back the token to the client
            return res.status(200).json({ success: true, data: admin._id, token: token });
        });
    })(req, res, next)
}

// Create an admin function
const createAdmin = (req, res, next) => {
    passport.authenticate('admin-local-signup', (err, admin, info) => {
        if (err) {
            return res.status(500).json({ success: false, error: info.message })
        }
        // If the admin is not found or there is some mistakes in password, return error message
        else if (!admin) {
            return res.status(400).json({ success: false, error: info.message })
        }
        req.login(admin, { session: false }, async (error) => {

            if (error) return next(error);
            //Sign the JWT token and populate the payload with the admin email
            //Send back the token to the client
            return res.status(200).json({ success: true });
        });
    })(req, res, next)
}

module.exports = { adminLogin, createAdmin }