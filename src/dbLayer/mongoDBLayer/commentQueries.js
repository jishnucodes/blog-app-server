import { buildCommentDTO } from "../../dto/commentDTO.js";
import Comment from "../../models/commentModel.js"

const createNewComment_Mongo = async (commentObj) => {
    const newComment = new Comment(commentObj);
    await newComment.save()
    if (newComment) {
        const response = buildCommentDTO(newComment);
        return response;
    }else{
        return;
    }
}

const findCommentByIdAndUpdate_Mongo = async (commentId, comment, blogId) => {
    const updateData = {};
    if (comment) updateData.comment = comment;
    if (blogId) updateData.blog = blogId;

    const updatedComment = await Comment.findByIdAndUpdate(
        commentId, 
        updateData, 
        { new: true }  // Ensure it returns the updated document
    ).exec();

    if (updatedComment) {
        const response = buildCommentDTO(updatedComment)
        return response;
    }else{
        return;
    }
};

const findCommentByIdAndDelete_Mongo = async (id) => {
    const deleteComment =  await Comment.findByIdAndDelete(id).populate('blog')
    return deleteComment;
}


export { createNewComment_Mongo, findCommentByIdAndUpdate_Mongo, findCommentByIdAndDelete_Mongo }