import { create } from "zustand";
import { Hotel } from "../types/hotel";
import { Guest } from "../types/booking";

interface BookedHotel extends Hotel {
  bookingId: number;
  checkInDate: string;
  checkOutDate: string;
}

interface HotelStore {
  hotels: Hotel[];
  bookedHotels: BookedHotel[];
  bookingStatus: { [key: number]: string };
  fetchHotels: () => Promise<void>;
  createBooking: (
    hotelId: number,
    checkInDate: string,
    checkOutDate: string,
    price: number
  ) => Promise<boolean>;
  checkIn: (
    bookingId: number,
    aadhaarNo: string,
    name: string
  ) => Promise<{
    success: boolean;
    message?: string;
    guests?: Guest[];
  }>;
}

export const useHotelsStore = create<HotelStore>((set, get) => ({
  hotels: [],
  bookedHotels: [],
  bookingStatus: {},
  fetchHotels: async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/hotels`);
      const data = await response.json();
      if (data.success) {
        set({ hotels: data.data });
      } else {
        console.error("Failed to fetch hotels");
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  },
  createBooking: async (
    hotelId: number,
    checkInDate: string,
    checkOutDate: string,
    price: number
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/bookings/create`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hotelId,
            checkInDate,
            checkOutDate,
            totalPrice: price,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        const hotels = get().hotels;
        const bookedHotel = hotels.find((h) => h.id === hotelId);
        if (bookedHotel) {
          set((state) => ({
            bookingStatus: { ...state.bookingStatus, [hotelId]: "pending" },
            bookedHotels: [
              ...state.bookedHotels,
              {
                ...bookedHotel,
                bookingId: data.booking.id,
                checkInDate: data.booking.check_in_date,
                checkOutDate: data.booking.check_out_date,
              },
            ],
          }));
        }
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },
  checkIn: async (bookingId: number, aadhaarNo: string, name: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/bookings/check-in`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId,
            guests: [
              {
                name,
                aadhaarNo,
                isPrimary: true,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        return {
          success: true,
          message: data.message,
          guests: data.guests,
        };
      }
      return { success: false, message: "Check-in failed" };
    } catch {
      return { success: false, message: "Check-in failed" };
    }
  },
}));
