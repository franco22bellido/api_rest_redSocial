import { userSchema } from "../models/user.js";
import { followerSchema } from "../models/followers.js";


let repository = {};

repository.followUser = async (followerId, idolId) => {
    try {

        const newIdol = await followerSchema.create({
            followerId,
            idolId
        });
        return newIdol;

    } catch (error) {
        return error.message;
    }

}
repository.unFollowUser = async (followerId, idolId) => {
        try {
        const unFollow = await followerSchema.destroy({
            where: {
                idolId,
                followerId
            }
        });
        return unFollow;
    } catch (error) {
        return error.message;
    }
}
repository.myFollowers = async (userId) => {
    try {
        // const followers = await followerSchema.findAll(
        //     {
        //         where: {idolId: userId},
        //         attributes: {
        //             include: [
        //                 [sequelize.literal(`
        //                 (
        //                     Select username from users where users.id = followerId
        //                 )
        //                 `), 'username']
        //             ]
        //         }
        //     }
        // );

        const followers = await userSchema.findAll(
            {
                attributes: ["username"],
                include: {model: followerSchema,
                as: "followerId",
                where: {idolId : userId}}
            }
        );


        return followers;
    } catch (error) {
        return error.message;
    }
}
repository.myIdols = async (userId) => {
    try {
        const idols = await followerSchema.findAll({
                where: {followerId: userId},
                include: {model: userSchema, attributes:['username']}
            });
        return idols;
    } catch (error) {
        return error.message;
    }
}
repository.countMyFollowers = async (userId) => {
    try {
        let countFollowers = await followerSchema.findAndCountAll({
            where: { idolId: userId }
        });
        return countFollowers.count;
    } catch (error) {
        return error.message;
    }
}
repository.countIdols = async (userId) => {
    try {
        let countFollowers = await followerSchema.findAndCountAll({
            where: { followerId: userId }
        });
        return countFollowers.count;
    } catch (error) {
        return error.message;
    }
}

export default repository;