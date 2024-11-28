import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { USER_Role } from "../user/user.constant";
import { CommentControllers } from "./comment.controller";
const router = express.Router();

//creating
router.post(
  "/create-comment",

  auth(USER_Role.user),

  CommentControllers.createComment
);
router.get("/", CommentControllers.getAllComments);

export const CommentRoutes = router;
