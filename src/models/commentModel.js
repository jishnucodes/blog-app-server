import mongoose from "mongoose";

const {Schema} = mongoose;

const commentSchema = new Schema({
    id: {
        type: String,
        unique: true,
    },
    blog: {
        type: Schema.Types.ObjectId, // References the Blog model
        ref: 'Blog',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comment: {
        type: String,
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

commentSchema.pre('save', function (next) {
    // Assign the value of _id to the custom id field as a string
    this.id = this._id.toString();
    next();
})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;