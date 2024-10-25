import { buildBlogDTO } from "../../dto/blogDTO.js";
import Blog from "../../models/blogModel.js"

const createNewBlog_Mongo = async (blogObj) => {
    const newBlog = new Blog(blogObj);
    await newBlog.save();
    if(newBlog) {
        const response = buildBlogDTO(newBlog)
        return response;
    }else{
        return;
    }
}

const findAllBlogs_Mongo = async () => {
    try {
      const blogs = await Blog.find({}).exec(); 
  
      if (blogs && blogs.length > 0) {
        const response = blogs.map((blogObj) => buildBlogDTO(blogObj));
  
        return response; 
      } else {
        return []; 
      }
    } catch (error) {
      console.error("Error fetching blogs:", error); 
      throw error; 
    }
  };
  

const findBlogById_Mongo = async (id) => {
    const blog = await Blog.findById(id).populate('comment').exec()
    console.log(blog)
    if (blog) {
      const response = buildBlogDTO(blog)
      return response;
    }else{
      return;
    }
}

const findByIdAndUpdateBlogByComment_Mongo = async (blogId, comment) => {
    const updatedBlog =  await Blog.findByIdAndUpdate(blogId, {
        $push: {comment: comment.id}
    })
    if (updatedBlog) {
      const response = buildBlogDTO(updatedBlog)
      return response;
    }else{
      return;
    }
}

const findByIdAndRemoveComment_Mongo = async (blogId, commentId) => {
  return await Blog.findByIdAndUpdate(blogId, {
      $pull: { comment: commentId }
  });
};


export {createNewBlog_Mongo, findAllBlogs_Mongo, findBlogById_Mongo, findByIdAndUpdateBlogByComment_Mongo, findByIdAndRemoveComment_Mongo}