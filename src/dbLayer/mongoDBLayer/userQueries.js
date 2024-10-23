import User from "../../models/userModel.js"

const findOneUser = async (email) => {
    return await User.findOne({email: email}).populate('role').exec()
}

const createNewUser = async (userObj) => {
    const user = new User(userObj)
    return await user.save()
}
export { findOneUser, createNewUser }