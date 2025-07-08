import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();
router.route("/recommendations").get(isAuthenticated, getCourseRecommendations);
export default router;