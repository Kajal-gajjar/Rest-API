import { Router } from "express";
import { checkAuth, verifyToken } from "../middleware/checkAuth.js";
const router = Router();
import courseRoute from "./courseRoute.js";
import studentRoute from "./studentRoute.js";
import authRoute from "./authRoute.js";

router.use("/courses", checkAuth, courseRoute);
router.use("/students", checkAuth, verifyToken, studentRoute);
router.use("/", checkAuth, authRoute);

export default router;
