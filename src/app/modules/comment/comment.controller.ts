import { catchAsync } from "../../utils/catchAsync";
import { CommentServices } from "./comment.service";

//Creating A Comment
const createComment = catchAsync(async (req, res) => {
  const result = await CommentServices.createCommentIntoDB(req.body);

  if (result) {
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Thanks for your comment",
      data: result,
    });
  } else {
    res.status(404).json({
      success: true,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }
});

const getAllComments = catchAsync(async (req, res) => {
  const result = await CommentServices.getAllCommentsFromDB();
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "comments retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: true,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }
});

export const CommentControllers = {
  createComment,
  getAllComments,
};
