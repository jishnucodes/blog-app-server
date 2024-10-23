const comment = {
    id: '',
    blog: '',
    author: '',
    comment: '',
    createdBy: '',
    modifiedBy: '',
}

export const buildCommentDTO = (commentObj) => {
    const commentDTO = {...comment};
    commentDTO.id = commentObj?.id;
    commentDTO.blog = commentObj?.blog;
    commentDTO.author = commentObj?.author;
    commentDTO.comment = commentObj?.comment;
    commentDTO.createdBy = commentObj?.createdBy;
    commentDTO.modifiedBy = commentObj?.modifiedBy;

    return commentDTO;
}