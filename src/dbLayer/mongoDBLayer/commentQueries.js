import Comment from "../../models/commentModel.js"

const createNewComment = async (commentObj) => {
    const newComment = new Comment(commentObj);
    return await newComment.save()
}

const findCommentByIdAndUpdate = async (commentId, comment, blogId) => {
    const updateData = {};
    if (comment) updateData.comment = comment;
    if (blogId) updateData.blog = blogId;

    return await Comment.findByIdAndUpdate(
        commentId, 
        updateData, 
        { new: true }  // Ensure it returns the updated document
    ).exec();
};

const findCommentByIdAndDelete = async (id) => {
    const deleteComment =  await Comment.findByIdAndDelete(id).populate('blog')
    console.log(deleteComment);
    return deleteComment;
}


export { createNewComment, findCommentByIdAndUpdate, findCommentByIdAndDelete }