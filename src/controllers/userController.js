import userRepository from '../repositories/userRepository.js';
import followerRepository from '../repositories/followerRepository.js';
import postRepository from '../repositories/postRepository.js'
import likesRepository from '../repositories/likeRepository.js';
import sequelize from  '../database/conectDB.js';
import { postSchema } from '../models/post.js';
import { followerSchema } from '../models/followers.js';
import { userSchema } from '../models/user.js';


export const Myprofile = async(req, res)=>{
    try {

        let user = await userRepository.getUserById(req.userId);
        let idols= await followerRepository.countIdols(req.userId);
        let followers = await followerRepository.countMyFollowers(req.userId);
        let myPosts= await postRepository.getPosts(req.userId);
        res.json({
            info: "bienvenido",
            data: user,
            followers,
            idols,
            myPosts
        });
    } catch (error) {
        res.json(error.message);
    }
}
export const findByUsername = async (req, res) => {
    const {username} = req.params;
    try {
        const user = await userRepository.getUserByUsername(username);
        const followers = await followerRepository.countIdols(user.id);
        const idols =  await followerRepository.countMyFollowers(user.id);
        let posts = await postRepository.getPosts(user.id);
        res.status(200).json({
            info: 'usuario encontrado',
            user,
            followers,
            idols,
            posts
        });
    } catch (error) {
        res.json(error.message);
    }
}
export const indexPage = async(req, res)=>{
    try {
        // let query = `select id, text, user_id from posts p inner join followers f
        // on p.user_id = f.idolId where followerId =?`;

        // const result =  await sequelize.query({query, values: [req.userId]});

        const publications =  await postSchema.findAll({
            attributes: {exclude: ["user_id"]},
            include: [{model: followerSchema, 
                where: {followerId: req.userId},
                attributes: ["idolId"]}],
            order: [["createdAt", "desc"]]
        });

        res.json(publications);
    } catch (error) {
        res.json(error.message);
    }
}
export const popularPosts = async(req, res)=>{
    try {
        // let query = `select p.id, text, img_url, createdAt, p.user_id as creator_id ,count(postId) as likes from posts p
        // inner join likes l on l.postId = p.id group by postId order by likes limit 10;       
        // `
        // const result =  await sequelize.query(query);
        const publications = await postRepository.popularPosts();

        res.json(publications);
        
    } catch (error) {
        res.json(error);
    }
}
export const recientPosts= async(req ,res)=>{}

export const myActivity = async(req, res)=>{
    try {
        await likesRepository.getAllLikes();
    } catch (error) {
        res.json(error);
    }
    /*
    getcomentarios
    getlikes
    */
}
export const updateUser = async(req, res)=>{
}