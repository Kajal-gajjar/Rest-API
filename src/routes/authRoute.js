import express from "express";
import authController from "../controller/authController.js";
const router = express.Router();

router.post("/login", authController.studentLogin);
router.post("/sign_up", authController.addStudent);

export default router;
