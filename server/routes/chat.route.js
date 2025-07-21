import express from "express"
const router = express.Router()
import { chatHandler } from "../controllers/chatController.js"

router.route("/chat").post(chatHandler);


export default router