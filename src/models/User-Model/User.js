import mongoose from "mongoose";
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
        enum: {
            values: ['male', 'female'],
            default: 'male',
            message: 'gender must be male or female'
        }
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            default: 'user',
        }
    },
    passwordChangedAt: {
        type: Date,
        default: null
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



