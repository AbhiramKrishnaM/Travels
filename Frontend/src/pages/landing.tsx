import { useAuthStore } from "../store/authStore";

export default function Landing() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to Travels</h1>
      <p className="mt-4">Explore the world with us!</p>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
