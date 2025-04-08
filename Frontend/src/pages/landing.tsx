import { useAuthStore } from "../store/authStore";
import { useState, useEffect } from "react";

export default function Landing() {
  const logout = useAuthStore((state) => state.logout);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (userData.name && userData.email) {
      setUser(userData);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Travels</div>
        {user && (
          <div className="flex items-center space-x-4">
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
    </div>
  );
}
