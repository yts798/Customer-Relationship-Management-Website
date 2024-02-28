require('dotenv').config()
// for JWT password key
// used to create our local strategy for authenticating
// using email and password
const LocalStrategy = require('passport-local').Strategy
// our user model
const User = require('../models/user')
// our admin model
const Admin = require('../models/admin')
// JSON Web Tokens
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (_id, done) {
        User.findById(_id, function (err, user) {
            done(err, user);
        });
    });

    // Setup a strategy
    // to verify that the token is valid. This strategy is used to check
    // that the client has a valid token
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // client puts token in request header
        secretOrKey: process.env.JWT_PASSWORD, // the key that was used to sign the token
        passReqToCallback: true
    }, (req, jwt_payload, done) => {
        console.log(jwt_payload)
        // passport will but the decrypted token in jwt_payload variable
        User.findOne({ '_id': jwt_payload.body._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            // if we found user, provide the user instance to passport
            if (user) {
                return done(null, user);
            } else { // otherwise assign false to indicate that authentication failed
                return done(null, false);
            }
        });
    }));
    passport.use('admin-jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // client puts token in request header
        secretOrKey: process.env.JWT_PASSWORD, // the key that was used to sign the token
        passReqToCallback: true
    }, (req, jwt_payload, done) => {
        console.log(jwt_payload)
        // passport will but the decrypted token in jwt_payload variable
        Admin.findOne({ '_id': jwt_payload.body._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            // if we found user, provide the user instance to passport
            if (user) {
                return done(null, user);
            } else { // otherwise assign false to indicate that authentication failed
                return done(null, false);
            }
        });
    }));
    // Local login strategy for the users
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
        async (email, password, done) => {
            try {
                // see if the user with the email exists
                await User.findOne({ 'email': email }, function (err, user) {
                    // if there are errors, user is not found or password
                    // does match, send back errors
                    if (err) {
                        return done(err, false, { message: "Database query failed" });
                    } else if (!user) {
                        return done(null, false, { message: 'Email not registered' });
                    } else if (!user.validPassword(password)) {
                        // false in done() indicates to the strategy that authentication has
                        // failed
                        return done(null, false, { message: 'Password incorrect' });
                    }
                    else {
                        return done(null, user);
                    }
                });
            } catch (err) {
                console.log(err)
                return done(err)
            };

        }));


    // local signp strategy for users
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',     // get email and password
        passwordField: 'password',
        passReqToCallback: true    // pass req variables
    }, async (req, email, password, done) => {
        try {
            await User.findOne({ 'email': email }, function (err, existingUser) {
                // search a user by the email
                // authentication failure
                if (err) {
                    return done(err, false, { message: "Database query failed" });
                } else {
                    // If the information is not entered, will return with the wrong message
                    if (email == "" || email == null) {
                        console.log("Please enter your email")
                        return done(null, false, { message: "Please enter your email" });
                    }
                    else if (req.body.givenName == "" || req.body.familyName == "" ||
                        req.body.givenName == null || req.body.familyName == null) {
                        return done(null, false, { message: "Please enter you name" });
                    }
                    else if (!/^[a-zA-Z]+$/.test(req.body.givenName) || !/^[a-zA-Z]+$/.test(req.body.familyName)) {
                        return done(null, false, { message: "Your name must be alphabet letters" });
                    }
                    else if (password == "" || password == null) {
                        return done(null, false, { message: "Please set your password" });
                    }
                    else if (req.body.confirmPassword == "" || req.body.confirmPassword == null) {
                        return done(null, false, { message: "Please enter your confirmed password" });
                    }
                    // If the email has already been used, send message and return false
                    else if (existingUser) {
                        console.log("Customer signup failed:", email, "ALREADY REGISTERED!");
                        return done(null, false, { message: "Email has already Registered" });
                    }
                    else if (password != req.body.confirmPassword) {
                        return done(null, false, { message: "Please enter the same password" });
                    }
                    else if (password.length < 8) {
                        return done(null, false, { message: "Your password must be at least 8 characters" });
                    }
                    else {
                        // otherwise
                        // create a new user
                        let newUser = new User();
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.familyName = req.body.familyName;
                        newUser.givenName = req.body.givenName;
                        newUser.introduction = "";
                        newUser.ban = false
                        // and save the user
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        })
                    }
                }
            })
        } catch (err) {
            return done(err)
        }
    }));

    // Local create strategy for admins
    passport.use('admin-local-signup', new LocalStrategy({
        usernameField: 'account',     // get account and password
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, account, password, done) => {
        try {
            await Admin.findOne({ 'account': account }, function (err, existingAdmin) {
                // search a user by the account
                // if user is not found or exists, exit with false indicating
                // authentication failure
                if (err) {
                    return done(err, false, { message: "Database query failed" });
                } else {
                    if (account == "" || account == null) {
                        console.log("Please enter your account")
                        return done(null, false, { message: "Please enter your account" });
                    }
                    else if (req.body.name == "" || req.body.name == null) {
                        console.log("Please enter your name")
                        return done(null, false, { message: "Please enter your name" });
                    }
                    else if (!/^[a-zA-Z]+$/.test(account)) {
                        return done(null, false, { message: "Your account must be alphabet letters" });
                    }
                    else if (password == "" || password == null) {
                        return done(null, false, { message: "Please set your password" });
                    }
                    else if (req.body.confirmPassword == "" || req.body.confirmPassword == null) {
                        return done(null, false, { message: "Please enter your confirmed password" });
                    }
                    else if (existingAdmin) {
                        console.log("Admin signup failed:", account, "ALREADY REGISTERED!");
                        return done(null, false, { message: "Admin has already Registered" });
                    }
                    else if (password != req.body.confirmPassword) {
                        return done(null, false, { message: "Please enter the same password" });
                    }
                    else if (password.length < 8) {
                        return done(null, false, { message: "Your password must be at least 8 characters" });
                    }
                    else if (!/^[0-9a-zA-Z]+$/.test(account)) {
                        return done(null, false, { message: "Your password does not satisfy the requirement" });
                    }

                    else {
                        // otherwise
                        // create a new user
                        let newAdmin = new Admin();
                        newAdmin.account = account
                        newAdmin.password = newAdmin.generateHash(password)
                        newAdmin.name = req.body.name
                        // and save the user
                        newAdmin.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newAdmin);
                        })
                    }
                }
            })
        } catch (err) {
            return done(err)
        }
    }));
    // Local login strategy for admins
    passport.use('admin-local-login', new LocalStrategy({
        usernameField: 'account',
        passwordField: 'password',
    }, // pass the req as the first arg to the callback for verification 
        async (account, password, done) => {
            try {
                // see if the admin with the accountAddress exists
                await Admin.findOne({ 'account': account }, function (err, admin) {
                    // if there are errors, admin is not found or password
                    // does match, send back errors
                    if (err) {
                        return done(err, false, { message: "Database query failed" });
                    } else if (!admin) {
                        return done(null, false, { message: 'Account not registered' });
                    } else if (!admin.validPassword(password)) {
                        // false in done() indicates to the strategy that authentication has
                        // failed
                        return done(null, false, { message: 'Password incorrect' });
                    }
                    else {
                        return done(null, admin);
                    }
                });
            } catch (err) {
                console.log(err)
                return done(err)
            };

        })
    );
}

