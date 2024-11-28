import { TComment } from "./comment.interface";
import { Comment } from "./comment.model";

const createCommentIntoDB = async (payload: TComment) => {
  const result = await Comment.create(payload);
  return result;
};

const getAllCommentsFromDB = async () => {
  const result = await Comment.find().populate("user").populate("car");
  return result;
};

export const CommentServices = {
  createCommentIntoDB,
  getAllCommentsFromDB,
};
