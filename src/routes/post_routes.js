import { Router } from "express";
import { createPost, deletePost, getMyPosts, getOnePost, updatePost } from "../controllers/postController.js";
import { IsLogged } from "../middlewares/isLoggedIn.js";
const router = Router();

router.get('/post',[IsLogged], getMyPosts);
router.get('/post/:postId',[IsLogged], getOnePost);
router.post('/post',[IsLogged], createPost);
router.put('/post/:id',[IsLogged], updatePost)
router.delete('/post/:id',[IsLogged], deletePost);

router.get('/posts/:otherUserId');

export default router;