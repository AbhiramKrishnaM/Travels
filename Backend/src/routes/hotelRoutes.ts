import { Router } from "express";
import {
  getAllHotels,
  getHotelById,
  getDummyHotels,
} from "../controller/hotelController";

const hotelRouter = Router();

hotelRouter.get("/", getAllHotels);
hotelRouter.get("/:id", getHotelById);

hotelRouter.get("/dummy", getDummyHotels);

export default hotelRouter;
