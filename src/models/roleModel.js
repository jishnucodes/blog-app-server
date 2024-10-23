import mongoose from "mongoose";

const {Schema} = mongoose;

const roleSchema = new Schema({
    id: {
        type: String,
        unique: true,
    },
    roleName: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
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

roleSchema.pre('save', function (next) {
    // Assign the value of _id to the custom id field as a string
    this.id = this._id.toString();
    next();
})

const Role = mongoose.model('Role', roleSchema);

export default Role;