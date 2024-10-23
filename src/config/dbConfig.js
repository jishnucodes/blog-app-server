import mongoose from "mongoose"
import 'dotenv/config'
import { checkAndCreateDefaultRoles } from "../utils/defaultRole/adminRole.js"

export const connectToDB = async () => {
    try {
       await mongoose.connect(process.env.DB_URL)
        console.log("database connected successfuly")
        await checkAndCreateDefaultRoles();
    } catch (error) {
        console.log("Error in connecting database")
    } 
}