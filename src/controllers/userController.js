import User from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import generateAccessToken from "../utils/generateToken.js";
import Role from "../models/roleModel.js";
import { buildUserDTO } from "../dto/userDTO.js";
import { findRoleById } from "../dbLayer/mongoDBLayer/roleQueries.js";
import { createNewUser, findOneUser } from "../dbLayer/mongoDBLayer/userQueries.js";


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
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdBy = req.user ? req.user : 'admin';
        const userObj = {
             id: '',
             username,
             email,
             password: hashedPassword,
             role: validRole._id,
             createdBy: createdBy,
             modifiedBy: createdBy
        }
        const userDTO = buildUserDTO(userObj)
        const newUser = await createNewUser(userDTO)
        const token = generateAccessToken(newUser);

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            status: true,
            responseObject: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                roleName: validRole.roleName,
                isAdmin: validRole.isAdmin,
            }
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
        const isPasswordMatch = await bcrypt.compare(password, userExist.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, error: "invalid credentials" })
        }
        const token = generateAccessToken(userExist);

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 100,
        })
        res.status(200).json({
            status: true,
            responseObject: {
                id: userExist._id,
                username: userExist.username,
                email: userExist.email,
                roleName: userExist.role.roleName,
                isAdmin: userExist.role.isAdmin,
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            error: "Something went wrong. please try again"
        })
    }
}


export {login, signup}