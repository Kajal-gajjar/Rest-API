import { Router } from "express";
import authController from "../controller/authController.js";
import { checkAuth, verifyToken } from "../middleware/checkAuth.js";
const router = Router();
import courseRoute from "./courseRoute.js";
import studentRoute from "./studentRoute.js";

router.use("/courses", checkAuth, courseRoute);
router.use("/students", checkAuth, verifyToken, studentRoute);
router.use("/login", checkAuth, authController.studentLogin);

export default router;
