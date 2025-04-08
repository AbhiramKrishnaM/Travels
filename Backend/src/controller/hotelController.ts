import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma";

// Get all hotels
export async function getAllHotels(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const hotels = await prisma.hotel.findMany({
      include: {
        tourist_place: true,
      },
    });

    res.status(200).json({
      success: true,
      data: hotels,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getHotelById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const hotelId = parseInt(req.params.id);

    const hotel = await prisma.hotel.findUnique({
      where: {
        id: hotelId,
      },
      include: {
        tourist_place: true,
      },
    });

    if (!hotel) {
      res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
