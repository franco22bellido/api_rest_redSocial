import postRepository from '../repositories/postRepository.js';
import likesRepository from '../repositories/likeRepository.js';
import comentsRepository from '../repositories/comentaryRepository.js';

export const getMyPosts = async(req, res)=>{
    try {
        const getPosts =await postRepository.getPosts(req.userId);
        res.status(200).json({
            getPosts
        });
    } catch (error) {
     res.json(error.message);
    }
}
export const getOnePost = async(req, res)=>{
    const {postId} = req.params;
    try {
        let getOne = await postRepository.getOnePost(postId);
        let counLikes = await likesRepository.getCountLikesPost(postId);
        let countComents = await comentsRepository.countComents(postId);
       
        //let countComents = await comentaryRepository.countComentaries
        res.status(200).json({
            getOne,
            counLikes,
            countComents
            });
    } catch (error) {
     res.json(error.message);
    }

}
export const createPost = async(req, res)=>{
    const {text, img_url} = req.body;
    const userId = req.userId
    try {
        let newPost = await postRepository.createPost(text,img_url, userId);
        res.json({
            newPost
        });
    } catch (error) {
        res.json(error.message);
    }

}
export const updatePost = async(req, res)=>{
    const {id} = req.params;
    /*agregar tambien el id del usuario/*/
    try {
        let updatePost = await postRepository.updatePost(id, req.body, req.userId);
        res.json({
            updatePost
        });
    } catch (error) {
        res.json(error.message);
    }
}
export const deletePost = async(req, res)=>{
    const {id} = req.params;
    /*agregar tambien el id del usuario/*/
    try {
        let deletedPost = await postRepository.deletePost(id, req.userId);
        res.json({
            deletedPost
        });
    } catch (error) {
        res.json(error.message);
    }
}