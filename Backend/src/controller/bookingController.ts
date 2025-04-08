import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma";

export async function createBooking(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { hotelId, checkInDate, checkOutDate, totalPrice } = req.body;
    const userId = req.user.id;

    const booking = await prisma.Booking.create({
      data: {
        user_id: userId,
        hotel_id: hotelId,
        check_in_date: new Date(checkInDate),
        check_out_date: new Date(checkOutDate),
        total_price: totalPrice,
        status: "pending",
      },
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function webCheckIn(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { bookingId, guests } = req.body;
    const userId = req.user.id;

    const booking = await prisma.Booking.findFirst({
      where: {
        id: bookingId,
        user_id: userId,
      },
    });

    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    const guestRecords = await Promise.all(
      guests.map(async (guest) => {
        return prisma.GuestDetail.create({
          data: {
            booking_id: bookingId,
            name: guest.name,
            aadhaar_no: guest.aadhaarNo,
            is_primary: guest.isPrimary || false,
          },
        });
      })
    );

    await prisma.Booking.update({
      where: { id: bookingId },
      data: { status: "checked-in" },
    });

    res.status(200).json({
      message: "Web check-in completed successfully",
      guests: guestRecords,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
