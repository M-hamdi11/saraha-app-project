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
        refPath: "receiverModel",

    },
    receiverModel: {
        type: String,
        required: true,
        enum: ["User", "Admin"],
    }
},
 {
    timestamps: true,
  }

)

export default mongoose.model('message',messageschema)