import { Router } from 'express'
import {IsLogged} from '../middlewares/isLoggedIn.js';
import { comentsOfPost, createComentary, deleteComentary, getAllComentaries, getOneComentary, updateComentary } from '../controllers/comentaryController.js';
const router = Router();

router.post('/createComentary/:postId', [IsLogged], createComentary);
router.get('/comentary/:id', [IsLogged], getOneComentary);
router.get('/comentary', [IsLogged], getAllComentaries);
router.delete('/comentary/:id', [IsLogged], deleteComentary);
router.put('/comentary/:id', [IsLogged], updateComentary);
router.get('/comentaries/:postId', [IsLogged], comentsOfPost);
export default router;