import express from "express";
import studentController from "../controller/studentController.js";
const router = express.Router();

router.get("/details", studentController.getStudentDetails);
router.get("/list", studentController.getStudents);
router.put("/update", studentController.updateStudent);
router.delete("/", studentController.deleteStudent);
router.get("/logout", studentController.studentLogout);
router.post("/active", studentController.activateStudent);

export default router;
