const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const adminSchema = new mongoose.Schema({
    account: { type: String, require: true },
    password: { type: String, require: true },
    name: { type: String, require: true }
})

adminSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checks if password is valid
adminSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin