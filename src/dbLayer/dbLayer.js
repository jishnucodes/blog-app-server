import User from "../models/userModel.js"
import { createNewBlog_Mongo, findAllBlogs_Mongo, findBlogById_Mongo, findByIdAndUpdateBlogByComment_Mongo } from "./mongoDBLayer/blogQueries.js"
import { findRoleById_Mongo } from "./mongoDBLayer/roleQueries.js"
import { createNewUser_Mongo, findOneUser_Mongo } from "./mongoDBLayer/userQueries.js"

const createNewUser = async (userObj) => {
   return await createNewUser_Mongo(userObj)
}

const findOneUser = async (email) => {
    return await findOneUser_Mongo(email)
}

const findRoleById = async (roleId) => {
    return await findRoleById_Mongo(roleId)
}

const createNewBlog = async (blogObj) => {
    return await createNewBlog_Mongo(blogObj)
}

const findAllBlogs = async () => {
    return await findAllBlogs_Mongo()
}

const findBlogById = async (blogId) => {
    return await findBlogById_Mongo(blogId)
}

const findByIdAndUpdateBlogByComment = async (blogId, addComment) => {
    return await findByIdAndUpdateBlogByComment_Mongo(blogId, addComment)
}
export {
    createNewUser, 
    findOneUser, 
    findRoleById,
    createNewBlog,
    findAllBlogs,
    findBlogById,
    findByIdAndUpdateBlogByComment
}