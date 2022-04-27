import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.js";
const router = Router();
import courseRoute from "./courseRoute.js";
import studentRoute from "./studentRoute.js";

router.use("/courses", checkAuth, courseRoute);
router.use("/students", checkAuth, studentRoute);

export default router;
