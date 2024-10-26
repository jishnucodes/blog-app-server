import User from "../models/userModel.js"
import { createNewBlog_Mongo, findAllBlogs_Mongo, findBlogById_Mongo, findByIdAndRemoveComment_Mongo, findByIdAndUpdateBlogByComment_Mongo } from "./mongoDBLayer/blogQueries.js"
import { createNewComment_Mongo, findCommentByIdAndDelete_Mongo, findCommentByIdAndUpdate_Mongo } from "./mongoDBLayer/commentQueries.js"
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

const createNewComment = async (commentObj) => {
    return await createNewComment_Mongo(commentObj)
}

const findCommentByIdAndUpdate = async (commentId, comment, blogId) => {
    return await findCommentByIdAndUpdate_Mongo(commentId, comment, blogId)

}

const findCommentByIdAndDelete = async (commentId) => {
    return await findCommentByIdAndDelete_Mongo(commentId)
}

const findByIdAndRemoveComment = async (blogId, commentId) => {
    return await findByIdAndRemoveComment_Mongo(blogId, commentId)
}

export {
    createNewUser, 
    findOneUser, 
    findRoleById,
    createNewBlog,
    findAllBlogs,
    findBlogById,
    findByIdAndUpdateBlogByComment,
    createNewComment,
    findCommentByIdAndUpdate,
    findCommentByIdAndDelete,
    findByIdAndRemoveComment
}