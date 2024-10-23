import Blog from "../../models/blogModel.js"

const createNewBlog = async (blogObj) => {
    const newBlog = new Blog(blogObj);
    return await newBlog.save();
}

const findAllBlogs = async () => {
    return await Blog.find({}).exec()
}

const findBlogById = async (id) => {
    return await Blog.findById(id).populate('comment').exec()
}

const findByIdAndUpdateBlogByComment = async (blogId, comment) => {
    return await Blog.findByIdAndUpdate(blogId, {
        $push: {comment: comment._id}
    })
}

export {createNewBlog, findAllBlogs, findBlogById, findByIdAndUpdateBlogByComment}