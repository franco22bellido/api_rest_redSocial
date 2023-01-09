import { userSchema } from '../models/user.js';
import { encryptPass, comparePass } from '../helpers/bcrypt.js';
import jwt from 'jsonwebtoken';
import keys from '../keys.js';

export const register = async (req ,res) => {
    const { username, password } = req.body;
   
    try {
        let findUser = await userSchema.findOne({
            where:{ 
                username
            }
        })
   
        if(findUser) throw new Error('usuario ya registrado');

        const encriptPassword = await encryptPass(password);

        let user = await userSchema.create({
            username,
            password: encriptPassword
        });
        const token = jwt.sign({id : user.id}, keys.secret, {
            expiresIn: 80000
        });
        
        res.json({
            info: 'usuario registrado con éxito',
            tu_token: token,
            user: user
        });

    } catch (error) {
        res.json(error.message);
    }

};



export const login = async (req, res) => {
    const { username, password } = req.body;


    try {
        let user = await userSchema.findOne({
            where:{ 
                username
            }
        })
        
        if (!user) throw new Error('user or pass not valid');

        const validPassword = await comparePass(password, user.password);
        if (!validPassword) throw new Error('user or pass not valid');

        const token = jwt.sign({id: user.id}, keys.secret, {
            expiresIn: 80000
        });

        res.json({
            info: 'bienvenido',
            token,
            user
        });

    } catch (error) {
        res.json(error.message)
    }
}