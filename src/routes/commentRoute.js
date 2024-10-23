import express from 'express'
import { addComment, deleteComment, editComment } from '../controllers/commentController.js';
import authenticateToken from '../middleware/authenticateToken.js';

const commentRouter = express.Router();

commentRouter.post("/addComment", authenticateToken, addComment);
commentRouter.put("/editComment",authenticateToken, editComment);
commentRouter.delete("/deleteComment", authenticateToken, deleteComment)

export default commentRouter;