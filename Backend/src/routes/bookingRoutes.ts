import { Router } from "express";
import { createBooking, webCheckIn } from "../controller/bookingController";
import { authenticate } from "../middleware/authMiddleware";

const bookingRouter = Router();

bookingRouter.use(authenticate);

bookingRouter.post("/create", createBooking);
bookingRouter.post("/check-in", webCheckIn);

export default bookingRouter;
