const mongoose = require("mongoose")
const contactSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, require: true, ref: 'User' },
    friend: { type: mongoose.Types.ObjectId, require: true, ref: 'User' },
    status: { type: String, enum: ["pending", "accepted"], require: true },
    tag: [],
    remark: { type: String, default: '' },
    message: { type: String, default: '' }
})

const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact