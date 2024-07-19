import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/UserRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import gameRoutes from "./routes/GameRoutes.js";
import learningContent from "./routes/LearningContentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({ credentials: true, origin: "https://nusadaya-fe.vercel.app/" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/learning-content", learningContent);

app.listen(PORT, () => {
  console.log(`Server run on ${process.env.BASE_URL}`);
});
