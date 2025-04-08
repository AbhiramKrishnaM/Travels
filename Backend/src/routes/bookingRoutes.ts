import { Router } from "express";
import { createBooking, webCheckIn } from "../controller/bookingController";
import { authenticate } from "../middleware/authMiddleware";

const bookingRouter = Router();

bookingRouter.post("/create", authenticate, createBooking);
bookingRouter.post("/check-in", authenticate, webCheckIn);

export default bookingRouter;
