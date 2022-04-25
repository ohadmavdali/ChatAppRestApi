const mongoose = require('mongoose')

const messageModel = mongoose.Schema(
    {
        sender: { type:mongoose.Schema.Types.ObjectId, ref: "User" },
        receiver: { type:mongoose.Schema.Types.ObjectId, ref: "User" },
        subject: { type: String, trim: true},
        message: { type: String, trim: true},
        creationDate : {
            type:Date,
            default:Date.now
        },
        isRead: { type: Boolean,
        default: false}
    },
    {
    timestamp: true,
    }
);

const Message = mongoose.model("Message", messageModel);

module.exports = Message;