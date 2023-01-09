import followerRepository from '../repositories/followerRepository.js';

export const getFollowers = async(req, res)=>{
    try {
        let allFollowers = await followerRepository.myFollowers(req.userId);

        res.json({
            allFollowers
        });
    } catch (error) {
        res.json(error.message);
    }
}

export const getIdols = async(req, res)=>{
    try {
        let allIdols = await followerRepository.myIdols(req.userId);

        res.json({
            allIdols
        });
    } catch (error) {
        res.json(error.message);
    }
}

export const followUser = async(req, res)=>{
    const {id} = req.params;
    const followerId = req.userId;
    try {
        let follow = await followerRepository.followUser(followerId,id);

        res.status(200).json({
            follow
        });
    } catch (error) {
        res.json(error.message);
    }
}

export const unFollowUser = async(req,res)=>{
    const {id} = req.params;
    const followerId = req.userId;
    try {
        let unFollow = await followerRepository.unFollowUser(followerId, id);

        res.status(200).json({
            unFollow
        });
    } catch (error) {
        res.json(error.message);
    }
}