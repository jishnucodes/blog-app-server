const blog = {
    id: '',
    user: '',
    blogImage: '',
    content: '',
    createdBy: '',
    modifiedBy: '',
}

export const buildBlogDTO = (blogObj) => {
    const blogDTO = {...blog};
    blogDTO.id = blogObj?.id;
    blogDTO.user = blogObj?.user;
    blogDTO.blogImage = blogObj?.blogImage;
    blogDTO.content = blogObj?.content;
    blogDTO.createdBy = blogObj?.createdBy;
    blogDTO.modifiedBy = blogObj?.modifiedBy;

    return blogDTO;

} 