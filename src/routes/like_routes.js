import { Router } from "express";
import { addLike, deleteLike } from "../controllers/likeControllers.js";
import {IsLogged} from '../middlewares/isLoggedIn.js';
const router = Router();

router.post('/like/:postId', [IsLogged], addLike);
router.delete('/like/:id', [IsLogged], deleteLike);

//get all my likes

export default router;