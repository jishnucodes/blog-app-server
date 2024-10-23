import mongoose from "mongoose";

const {Schema} = mongoose;

const blogSchema = new Schema({
    id: {
        type: String,
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    blogImage: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }],
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

blogSchema.pre("save", function (next) {
    this.id = this._id.toString();
    next();
})
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;