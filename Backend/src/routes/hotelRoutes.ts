import { Router } from "express";
import { getAllHotels, getHotelById } from "../controller/hotelController";

const hotelRouter = Router();

hotelRouter.get("/", getAllHotels);
hotelRouter.get("/:id", getHotelById);

export default hotelRouter;
