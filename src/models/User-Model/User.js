import mongoose from "mongoose";
import { type } from "os";
const UserSchama = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        index: { unique: true, name: 'email_unique_index' }
    },

    password: {
        type: String,
        required: true,
    },
    phone: {
        required: true,
        type: String,
        trim: true,
    },
    isdeleted: {
        type: Boolean,
        default: false,

    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    passwordChangedAt: {
        type: Date,
        default: null
    },
    googleSub: {
        type: String,
        index: { unique: true, sparse: true, name: 'sup_unique_index' }
    },
    picture: { type: String },
    provider: { type: String, enum: ['local', 'google'], default: 'local' },
    is_email_verified:{
        type:String,
        default:false
    }
},
    {
        timestamps: true,
        virtuals: {
            fullName: {
                get() {
                    return `${this.firstName} ${this.lastName}`;
                }
            }
        },
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)
UserSchama.methods.getfullname = function () {
    return `${this.firstName} ${this.lastName}`;
}
export const UserModel = mongoose.model('User', UserSchama)



