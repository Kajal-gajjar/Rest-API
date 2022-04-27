import express from "express";
import courseController from "../controller/courseController.js";
const router = express.Router();

router.get("/", courseController.getData);
router.get("/:id", courseController.getCourseById);
router.post("/", courseController.addCourse);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

export default router;
