import { Router } from "express";
import {
  getAllHotels,
  getHotelById,
  getDummyHotels,
} from "../controller/hotelController";

const hotelRouter = Router();

hotelRouter.get("/", getAllHotels);
hotelRouter.get("/dummy", getDummyHotels);
hotelRouter.get("/:id", getHotelById);

export default hotelRouter;
