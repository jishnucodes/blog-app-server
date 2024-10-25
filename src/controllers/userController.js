import User from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import generateAccessToken from "../utils/generateToken.js";
import Role from "../models/roleModel.js";
import { buildUserDTO, userDTO } from "../dto/userDTO.js";
import { createNewUser, findOneUser, findRoleById } from "../dbLayer/dbLayer.js";
import { enumObj } from "../utils/enumObj.js";
import { hashedPasswordComparing, passwordHashing } from "../utils/utility.js";


const signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body; 
        
        console.log("email", email)
        const userExist = await findOneUser(email);
        if (userExist) {
            return res.status(400).json({ status: false, error: "user already exist." })
        }
        const validRole = await findRoleById(role);
        if (!validRole) {
            return res.status(400).json({ status: false, error: "Invalid role." })
        }
        const hashedPassword = await passwordHashing(password);
        const createdBy = req.user ? req.user : 'admin';
        let userObj = { ...userDTO }
        userObj.id = '';
        userObj.username = username
        userObj.email = email
        userObj.password = hashedPassword;
        userObj.role = validRole.id;
        userObj.isAdmin = validRole.isAdmin;
        userObj.createdBy = createdBy;
        userObj.modifiedBy = createdBy

        const userDTOObj = buildUserDTO(userObj)
        const newUser = await createNewUser(userDTOObj)
        const token = generateAccessToken(newUser);

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            status: true,
            response: "Successfuly created user"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            error: "Something went wrong. please try again"
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await findOneUser(email);
        if (!userExist) {
            return res.status(400).json({ status: false, error: "please signup" });
        }
        console.log(userExist)
        const isPasswordMatch = await hashedPasswordComparing(password, userExist.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, error: "invalid credentials" })
        }
        const token = generateAccessToken(userExist);

        const response = {...userDTO}
        response.id = userExist.id;
        response.username = userExist.username;
        response.email = userExist.email;
        response.password = userExist.password;
        response.role = userExist.role.id;
        response.roleName = userExist.role.roleName;
        response.isAdmin = userExist.role.isAdmin;
        response.createdOn = userExist.createdOn;
        response.updatedOn = userExist.updatedOn;
        response.createdBy = userExist.createdBy;
        response.modifiedBy = userExist.modifiedBy;

        res.cookie(enumObj.auth_token, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === enumObj.env_production,
            maxAge: 24 * 60 * 60 * 100,
        })
        res.status(200).json({
            status: true,
            responseObject: response,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            error: "Something went wrong. please try again"
        })
    }
}


export { login, signup }