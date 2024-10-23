import express from 'express';
import userRouter from './routes/userRoute.js';
import roleRouter from './routes/roleRoute.js';
import blogRouter from './routes/blogRoute.js';
import commentRouter from './routes/commentRoute.js';

const router = express.Router()

router.use("/user", userRouter)
router.use("/role",  roleRouter)
router.use("/blog", blogRouter)
router.use("/comment", commentRouter)


export default router;