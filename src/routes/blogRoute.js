import express from 'express'
import { addBlogPost, getBlogPosts, getBlogPostById} from '../controllers/blogController.js';
import  upload  from '../middleware/upload-middleware.js';
import authenticateToken from '../middleware/authenticateToken.js';

const blogRouter = express.Router();

blogRouter.get("/getBlogs", getBlogPosts)
blogRouter.get("/getBlogPostById/:id", authenticateToken, getBlogPostById)
blogRouter.post("/addBlog",authenticateToken,upload.single('image'), addBlogPost);

export default blogRouter;