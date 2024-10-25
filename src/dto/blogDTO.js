import { buildCommentDTO } from "./commentDTO.js";

export const blogDTO = {
    id: '',
    user: '',
    blogImage: '',
    content: '',
    comment: [],
    createdOn: Date.now(),
    updatedOn: Date.now(),
    createdBy: '',
    modifiedBy: '',
}

export const buildBlogDTO = (blogObj) => {
    console.log("blogObj", blogObj)
    const blogDTOObj = {...blogDTO};
    blogDTOObj.id = blogObj?.id;
    blogDTOObj.user = blogObj?.user;
    blogDTOObj.blogImage = blogObj?.blogImage;
    blogDTOObj.content = blogObj?.content;
    blogDTOObj.comment = blogObj?.comment ? blogObj?.comment.map((obj) => buildCommentDTO(obj)) : [];
    blogDTOObj.createdOn = blogObj?.createdOn;
    blogDTOObj.updatedOn = blogObj?.updatedOn;
    blogDTOObj.createdBy = blogObj?.createdBy;
    blogDTOObj.modifiedBy = blogObj?.modifiedBy;

    return blogDTOObj;

} 