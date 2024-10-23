import { cloudinaryInstance } from "../config/cloudinary-config.js";
import { findAllBlogs, createNewBlog, findBlogById } from "../dbLayer/mongoDBLayer/blogQueries.js";
import { cloudinaryImageUploader } from "../dbLayer/mongoDBLayer/cloudPlatforms/cloudinaryUploading.js";
import { buildBlogDTO } from "../dto/blogDTO.js";
import Blog from "../models/blogModel.js";

const addBlogPost = async (req, res) => {
    try {

        const userId = req.user.id;
        const username = req.user.username;

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        const result = await cloudinaryImageUploader(req.file.path);
        const imageUrl = result.url;

        const blogObj = {
            id: '',
            user: userId,
            blogImage: imageUrl,
            content: req.body.content,
            createdBy: username,
            modifiedBy: username,
        }
        const blogDTO =  buildBlogDTO(blogObj)
        const newBlog = await createNewBlog(blogDTO)
        if (!newBlog) {
            return res.status(400).json({
                status: false,
                error: "Error in adding in blog"
            })
        }
        res.status(201).json({
            status: true,
            responseObject: newBlog
        })

    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Failed to upload image" });
    }
};

const getBlogPosts = async (req, res) => {
    try {
        const blogPosts = await findAllBlogs();
        if (!blogPosts) {
            return res.status(400).json({
                status: false,
                error: "blog post is empty"
            })
        }
        res.status(200).json({
            status: true,
            responseObject: blogPosts
        })
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Server error to get blog posts" });
    }
}

const getBlogPostById = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id)

        const blog = await findBlogById(id)
        console.log("blog", blog)
        if (!blog) {
            return res.status(400).json({
                status: false,
                error: "blog post is not existing"
            })
        }
        res.status(200).json({
            status: true,
            responseObject: blog
        });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Server error to get blog post by id" });
    }
}

const editBlogPost = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        const blog = await Blog.findById()

        const result = await cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                console.log(err, "error");
                return res.status(500).json({
                    status: false,
                    error: "Error"
                })
            }
        });

        const imageUrl = result.url;

    } catch (error) {

    }
}

export { addBlogPost, getBlogPosts, getBlogPostById };
