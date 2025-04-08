import { useAuthStore } from "../store/authStore";
import { useState, useEffect } from "react";
import { Hotel } from "../types/hotel";
import { useHotelsStore } from "../store/hotelStore";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const logout = useAuthStore((state) => state.logout);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const { hotels, fetchHotels, createBooking, bookingStatus } =
    useHotelsStore();
  const navigate = useNavigate();

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (userData.name && userData.email) {
      setUser(userData);
    }

    fetchHotels();
  }, [fetchHotels]);

  const handleBooking = async (hotelId: number, price: number) => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    const success = await createBooking(
      hotelId,
      checkInDate,
      checkOutDate,
      price
    );
    if (success) {
      alert("Booking created successfully");
    } else {
      alert("Failed to create booking.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Travels</div>
        {user && (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/bookings")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Show Bookings
            </button>
            <div className="flex flex-col items-end">
              <span className="font-semibold">{user.name}</span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
            <button onClick={logout} className="text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                />
              </svg>
            </button>
          </div>
        )}
      </nav>
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-3xl font-bold">Welcome to Travels</h1>
        <p className="mt-4">Explore the world with us!</p>
      </div>
      <div className="flex flex-col items-center mt-4">
        <div className="flex flex-col items-start">
          <label htmlFor="checkInDate" className="font-semibold">
            Check-in Date
          </label>
          <input
            id="checkInDate"
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="border p-2 m-2"
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="checkOutDate" className="font-semibold">
            Check-out Date
          </label>
          <input
            id="checkOutDate"
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="border p-2 m-2"
          />
        </div>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map((hotel: Hotel) => (
          <div key={hotel.id} className="bg-white shadow-md rounded p-4">
            <img
              src={hotel.tourist_place.image_url}
              alt={hotel.tourist_place.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-2">{hotel.name}</h2>
            <p className="text-gray-600">{hotel.description}</p>
            <p className="text-gray-500">{hotel.amenities}</p>
            <p className="text-gray-800 font-semibold">
              ${hotel.price_per_night} per night
            </p>
            <button
              onClick={() =>
                handleBooking(hotel.id, Number(hotel.price_per_night))
              }
              className={`mt-2 p-2 rounded w-full ${
                bookingStatus[hotel.id] === "pending"
                  ? "bg-gray-500 text-white cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              disabled={bookingStatus[hotel.id] === "pending"}
            >
              {bookingStatus[hotel.id] === "pending" ? "Pending" : "Book Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
