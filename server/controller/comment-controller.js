
import Comment from '../model/comment.js';


export const newComment = async (request, response) => {
    try {
        const { name, postId, comments } = request.body;

        if (!name || !postId || !comments) {
            return response.status(400).json({
                msg: "name, postId and comments are required"
            });
        }

        const comment = new Comment({
            name,
            postId,
            comments,
            date: new Date()   // ✅ FIX HERE
        });

        await comment.save();

        response.status(200).json("Comment saved successfully");

    } catch (error) {
        console.error(error);
        response.status(500).json("Error while saving comment");
    }
};

export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });
        
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findById(request.params.id);

        if (!comment) {
            return response.status(404).json("Comment not found");
        }

        await comment.deleteOne();

        response.status(200).json("Comment deleted successfully");
    } catch (error) {
        console.error(error);
        response.status(500).json("Error while deleting comment");
    }
};

