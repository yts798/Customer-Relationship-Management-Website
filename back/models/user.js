const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid')

const userSchema = new mongoose.Schema({
    userID: { type: String, require: true, default: () => nanoid(10), unique: true },
    givenName: { type: String, require: true },
    familyName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    photo: {
        data: { type: String, default: '/../pics/defaultAvatar.jpg' },
        contentType: { type: String, default: "image" }
    },
    gender: { type: String, enum: ["Male", "Female", "Prefer not to say"] },
    introduction: { type: String },
    mobile: { type: String },
    region: { city: String, state: String, country: String },
    dob: { year: String, month: String, date: String },
    company: { type: String, default: "not set" },
    occupation: { type: String, default: "not set" },
    ban: { type: Boolean, require: true }
})

// generate a hashed password
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checks if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema)

module.exports = User
