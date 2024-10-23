import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    id: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role",
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: String,
    },
    modifiedBy: {
        type: String,
    }
});

userSchema.pre('save', function(next) {
    this.id = this._id.toString()
    next()
})

const User = mongoose.model('User', userSchema);

export default User;