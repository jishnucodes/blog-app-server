import { buildUserDTO } from "../../dto/userDTO.js";
import User from "../../models/userModel.js"

const findOneUser_Mongo = async (email) => {
    const user =  await User.findOne({email: email}).populate('role').exec();
    if (user) {
        const response = buildUserDTO(user);
        return response;
    }else {
        return;
    }
}

const createNewUser_Mongo = async (userObj) => {
    const user = new User(userObj)
    await user.save()
    if (user) {
        const response = buildUserDTO(user);
        return response;
    }else {
        return;
    }
}
export { findOneUser_Mongo, createNewUser_Mongo }