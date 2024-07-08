import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/UserRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server run on ${process.env.BASE_URL}`);
});
