import { findByIdAndUpdateBlogByComment } from "../dbLayer/mongoDBLayer/blogQueries.js";
import { createNewComment, findCommentByIdAndDelete, findCommentByIdAndUpdate } from "../dbLayer/mongoDBLayer/commentQueries.js";
import { buildCommentDTO } from "../dto/commentDTO.js";
import Comment from "../models/commentModel.js";

const addComment =async (req, res) => {
    try {
        const {comment, blogId} = req.body;
        const userId = req.user.id;
        const username = req.user.username;

        const commentObj = {
            id: '',
            blog: blogId,
            author: userId,
            comment,
            createdBy: username,
            modifiedBy: username,
        }

        const commentDTO = buildCommentDTO(commentObj);

        const addComment = await createNewComment(commentDTO)
        if (!addComment) {
            return res.status(400).json({
                status: false,
                error: "Error in posting comment"
            })
        }
        await findByIdAndUpdateBlogByComment(blogId, addComment)
        res.status(201).json({
            status: true,
            responseObject: addComment
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            error: "Server error when posting a comment"
        })
    }
}

const editComment = async (req, res) => {
    try {
        const {id, comment, blogId} = req.body;
        console.log(req.body)

        const editedComment = await findCommentByIdAndUpdate(id, comment, blogId);
        if (!editedComment) {
            return res.status(400).json({
                status: false,
                error: "Error in updating the comment"
            })
        }
        return res.status(200).json({
            status: true,
            responseObject: editedComment
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            error: "server error in editing the comment"
        })
    }
}


const deleteComment = async (req, res) => {
    try {
        const {id} = req.body;
        await findCommentByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            error: "server error in deleting the comment"
        })
    }
}

export {addComment, editComment, deleteComment}