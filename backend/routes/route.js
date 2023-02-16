import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getFeaturedPosts,
  getPosts,
  searchPost,
  getRelatedPosts,
  uploadImage
} from "../controllers/post-controller.js";
import { postValidator, validate } from "../middleware/postValidator.js";
import upload from "../middleware/multer.js";
import { parseData } from "../middleware/index.js";
const router = express.Router();
router.post(
  "/create",
  upload.single("thumbnail"),
  parseData,
  postValidator,
  validate,
  createPost
);
router.put(
  "/:postId",
  upload.single("thumbnail"),
  parseData,
  postValidator,
  validate,
  updatePost
);
router.delete("/:postId", deletePost);
router.get("/single/:slug", getPost);
router.get("/featured-posts", getFeaturedPosts);
router.get("/posts", getPosts);
router.get("/search", searchPost);
router.get("/related-posts/:postId", getRelatedPosts);
// router.get("/api/post/latest");
//This route is to upload single image
router.post(
    "/upload-image",
    upload.single("image"),
    uploadImage
)
export default router;
