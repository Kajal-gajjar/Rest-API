import express from "express";
import studentController from "../controller/studentController.js";
const router = express.Router();

router.get("/details", studentController.getStudentDetails);
router.get("/", studentController.getStudents);
router.post("/", studentController.addStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

export default router;
