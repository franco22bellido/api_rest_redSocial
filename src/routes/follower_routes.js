import { Router } from "express";
import { followUser, getFollowers, getIdols, unFollowUser } from "../controllers/followersController.js";
import { IsLogged } from "../middlewares/isLoggedIn.js";
const router = Router();


router.get('/followers',[IsLogged], getFollowers);
router.get('/idols',[IsLogged], getIdols);
router.post('/followers/:id',[IsLogged], followUser);
router.delete('/followers/:id',[IsLogged], unFollowUser);


export default router;