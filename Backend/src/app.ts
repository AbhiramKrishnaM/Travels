import "dotenv/config";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import userRouter from "./routes/userRoutes";
import bookingRouter from "./routes/bookingRoutes";
import hotelRouter from "./routes/hotelRoutes";

const app = express();
const PORT: number = Number(process.env.SERVER_PORT) || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

app.use("/auth", userRouter);
app.use("/bookings", bookingRouter);
app.use("/hotels", hotelRouter);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
