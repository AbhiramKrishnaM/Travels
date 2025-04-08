import { useAuthStore } from "../store/authStore";
import { useHotelsStore } from "../store/hotelStore";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Guest } from "../types/booking";

export default function Bookings() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const { bookedHotels, checkIn } = useHotelsStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [aadhaarNo, setAadhaarNo] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null
  );
  const [checkInResponse, setCheckInResponse] = useState<{
    message?: string;
    guests?: Guest[];
  } | null>(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (userData.name && userData.email) {
      setUser(userData);
    }
  }, []);

  const handleCheckIn = async () => {
    if (!user?.name || !aadhaarNo || !selectedBookingId) return;

    const result = await checkIn(selectedBookingId, aadhaarNo, user.name);
    if (result.success) {
      setCheckInResponse({
        message: result.message,
        guests: result.guests,
      });
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Travels
        </div>
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

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookedHotels.map((hotel) => (
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
              <div className="mt-2 text-sm text-gray-600">
                Check-in: {new Date(hotel.checkInDate).toLocaleDateString()}
              </div>
              <div className="mb-2 text-sm text-gray-600">
                Check-out: {new Date(hotel.checkOutDate).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <div className="mt-2 bg-green-500 text-white p-2 rounded text-center flex-1">
                  Booked
                </div>
                <button
                  onClick={() => {
                    setSelectedBookingId(hotel.bookingId);
                    setIsDialogOpen(true);
                    setCheckInResponse(null);
                  }}
                  className="mt-2 bg-blue-500 text-white p-2 rounded text-center flex-1"
                >
                  Check In
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Web Check-in</h2>

            {!checkInResponse ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Aadhaar Number
                  </label>
                  <input
                    type="text"
                    value={aadhaarNo}
                    onChange={(e) => setAadhaarNo(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your 12-digit Aadhaar number"
                    maxLength={12}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setIsDialogOpen(false);
                      setAadhaarNo("");
                      setSelectedBookingId(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCheckIn}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Check In
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-green-600 mb-4">{checkInResponse.message}</p>
                {checkInResponse.guests &&
                  checkInResponse.guests.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Guest Details:</h3>
                      {checkInResponse.guests.map((guest, index) => (
                        <div key={index} className="text-sm">
                          <p>Name: {guest.name}</p>
                          <p>Aadhaar: {guest.aadhaar_no}</p>
                          <p>
                            Status:{" "}
                            {guest.is_primary ? "Primary Guest" : "Guest"}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setIsDialogOpen(false);
                      setAadhaarNo("");
                      setSelectedBookingId(null);
                      setCheckInResponse(null);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
