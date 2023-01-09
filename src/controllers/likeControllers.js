import likeRepository from '../repositories/likeRepository.js';

export const addLike = async(req, res)=>{
    const {postId} = req.params;
    try {
        let newLike = await likeRepository.addLikePost(postId, req.userId);

        res.status(200).json({
            newLike
        });
    } catch (error) {
        res.json(error.message);
    }
}

export const deleteLike = async(req, res)=>{
    const {id} = req.params;
    try {
        let deleteLike = await likeRepository.deleteLike(id, req.userId);

        res.json(deleteLike);
    } catch (error) {
        res.json(error);
    }
}