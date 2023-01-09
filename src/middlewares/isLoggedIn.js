import jwt from 'jsonwebtoken';
import { userSchema } from '../models/user.js';
import keys from '../keys.js';

export const IsLogged = (req, res, next)=>{
    const token = req.header('x-access-token');
    try {
        if(!token) throw new Error('no token provide');

        const verify = jwt.verify(token, keys.secret);
        req.userId = verify.id;
        
        /*hacer una consulta a la base de datos para saber
        si existe el usuario me parece algo un poco inecesario
        ya que si existe un token es porque hay un usuario... */
        const user = userSchema.findByPk(req.userId);
        if(!user) throw new Error('user not found');

        next();

    } catch (error) {
        res.json({
            error: error.message
        })
    }
}