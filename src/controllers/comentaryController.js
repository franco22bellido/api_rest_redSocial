import comentaryRepository from '../repositories/comentaryRepository.js';

export const getOneComentary = async(req, res)=>{
    const {id} = req.params;
    try {
        const oneComent = await comentaryRepository.getOne(id, req.userId);
        res.status(200).json({
            oneComent
        });
    } catch (error) {
        res.json(error.message);
    }
}
export const getAllComentaries = async(req, res)=>{
    try {
        const allComents = await comentaryRepository.getAllComents(req.userId);
        res.status(200).json(allComents);

    } catch (error) {
        return error.message
    }
}
export const comentsOfPost = async(req, res)=>{
        const {postId} = req.params
        try {
            let coments = await comentaryRepository.comentsOfPost(postId);
            res.status(200).json(coments);
        } catch (error) {
            res.json(error);
        }
}
export const deleteComentary = async(req, res)=>{
    const {id} = req.params;
    try {
        const deleteComentary = await comentaryRepository.deleteComentaryById(id);
        res.status(200).json(deleteComentary);
    } catch (error) {
        return error.message
    }
}
export const createComentary = async(req, res)=>{
    const {postId} = req.params;
    const {textComentary} = req.body
    const userId = req.userId;
    try {
        const newComentary = await comentaryRepository.createComent(postId,textComentary,userId);
        
        res.status(200).json(newComentary);

    } catch (error) {
        return error.message
    }
}
export const updateComentary = async(req, res)=>{
    const {id} = req.params;
    try {
        const updateComent = await comentaryRepository.updateComentById(id, req.body);
        res.status(200).json(updateComent);

    } catch (error) {
        return error.message
    }
}