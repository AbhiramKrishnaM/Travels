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
      where: { id: hotelId },
      include: {
        tourist_place: true,
      },
    });

    if (!hotel) {
      res.status(404).json({ message: "Hotel not found" });
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

export async function getDummyHotels(
  req: Request,
  res: Response
): Promise<void> {
  const dummyHotels = [
    {
      id: 1,
      name: "Grand Palace Resort",
      address: "123 Beachfront Ave, Miami, FL",
      description: "Luxury resort with ocean views",
      amenities: "Pool, Spa, Restaurant, Gym",
      price_per_night: 299.99,
      place_id: 1,
      tourist_place: {
        id: 1,
        name: "Miami Beach",
        location: "Florida, USA",
        description: "Beautiful beaches and vibrant nightlife",
      },
    },
    {
      id: 2,
      name: "Mountain View Lodge",
      address: "567 Alpine Road, Aspen, CO",
      description: "Cozy lodge with mountain views",
      amenities: "Fireplace, Hot Tub, Restaurant",
      price_per_night: 199.99,
      place_id: 2,
      tourist_place: {
        id: 2,
        name: "Aspen Mountains",
        location: "Colorado, USA",
        description: "World-class skiing and mountain scenery",
      },
    },
    {
      id: 3,
      name: "City Center Hotel",
      address: "890 Downtown Blvd, New York, NY",
      description: "Modern hotel in the heart of the city",
      amenities: "Restaurant, Business Center, Gym",
      price_per_night: 249.99,
      place_id: 3,
      tourist_place: {
        id: 3,
        name: "Times Square",
        location: "New York, USA",
        description: "The heart of Manhattan with theaters and attractions",
      },
    },
  ];

  res.status(200).json({
    success: true,
    data: dummyHotels,
  });
}
