import mongoose from "mongoose";

const messageschema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Message content is required"],
        trim: true,
        minlength: 1,
        maxlength: 500,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,

    },
},
 {
    timestamps: true,
  }

)

const MessageModel = mongoose.model('message', messageschema)

export default MessageModel