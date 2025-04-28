import express from "express";
import { check } from "express-validator";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllPosts);
router.get("/:id", protect, getPostById);
router.post(
  "/",
  [
    protect,
    authorize("admin"),
    check("title", "Title is required").not().isEmpty(),
    check("content", "Content is required").not().isEmpty(),
  ],
  createPost
);
router.put(
  "/:id",
  [
    protect,
    authorize("admin"),
    check("title", "Title is required").not().isEmpty(),
    check("content", "Content is required").not().isEmpty(),
  ],
  updatePost
);
router.delete("/:id", [protect, authorize("admin")], deletePost);

export default router;
