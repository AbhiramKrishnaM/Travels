import "dotenv/config";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import userRouter from "./routes/userRoutes";

const app = express();
const PORT: number = Number(process.env.SERVER_PORT) || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
