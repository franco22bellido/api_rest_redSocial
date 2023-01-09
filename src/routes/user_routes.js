import { Router } from "express";
import { IsLogged } from '../middlewares/isLoggedIn.js';
import {Myprofile,findByUsername, indexPage, popularPosts, myActivity} from '../controllers/userController.js';


const router = Router();

router.get('/profile',[IsLogged],Myprofile);

router.get('/findUser/:username', [IsLogged], findByUsername);

router.get('/indexPage',[IsLogged], indexPage);

router.get('/popularPosts', [IsLogged], popularPosts);

router.get('/myActivity', [IsLogged], myActivity);


/*/
una ruta principal tambien, donde se muestren las publicaciones de mis usuarios
seguidos
buscar usuarios
ver perfil de otro usuario

*/
export default router;