import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./database/db.js";
import courseRoute from "./routes/course.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js"


dotenv.config({});

// call database connection here
connectDB();
const app = express();

const PORT = process.env.PORT || 8000;

// default middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/ai",chatRoute);

app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});
