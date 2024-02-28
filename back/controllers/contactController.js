const User = require('../models/user')
const Contact = require('../models/contact')
// Delete friend from contact list
const deleteFriend = async (req, res) => {
    try {
        // find the email in contact and pull it out
        await Contact.deleteOne({ _id: req.body.contactid })
        return res.status(200).json({ success: true })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ success: false, error: "delete failed, try again" })
    }
}

// Accept friend
const acceptFriend = async (req, res) => {
    try {
        await Contact.updateOne({ user: req.body.userid, friend: req.user._id }, { $set: { status: "accepted" } })
        // Creat a new contact 
        let contact = await Contact.find({ user: req.user._id, friend: req.body.userid })
        if (contact.length != 0) {
            return res.status(400).json({ success: false, error: "This user is already in your contact" })
        }
        else {
            // Creat a new contact 
            let newContact = new Contact({
                user: req.user._id,
                friend: req.body.userid,
                status: 'accepted',
                tag: [],
                remark: ""
            })
            newContact.save(err => {
                if (err) throw err
                return res.status(200).json({ success: true })
            })
        }

    } catch (err) {
        return res.status(400).json({ success: false, error: "accept failed, try again" })
    }
}

// Return the contact list
const getContact = async (req, res) => {
    try {
        // Return pending list with requester info
        let pendingList = await Contact.find({ friend: req.user._id, status: "pending" }, {}).populate('user')
        // Return accetped list with requested info
        let acceptedList = await Contact.find({ user: req.user._id, status: "accepted" }, {}).populate('friend')
        return res.status(200).json({ success: true, pending: pendingList, accepted: acceptedList })
    } catch (err) { // error occors
        return res.status(400).json({ success: false, error: "Database query failed" })
    }
}

// Edit the contact remark
const changeRemark = async (req, res) => {
    try {
        await Contact.updateOne({ _id: req.body.contactid }, { $set: { remark: req.body.remark } })
        return res.status(200).json({ success: true })
    } catch (err) {
        return res.status(400).json({ success: false, error: "Database query failed" })
    }
}

// Edit the tag
const editTag = async (req, res) => {
    try {
        await Contact.updateOne({ _id: req.body.contactid }, { $set: { tag: req.body.tag } })
        return res.status(200).json({ success: true })
    } catch (err) {
        return res.status(400).json({ success: false, error: "Database query failed" })
    }
}


module.exports = { deleteFriend, acceptFriend, getContact, changeRemark, editTag }