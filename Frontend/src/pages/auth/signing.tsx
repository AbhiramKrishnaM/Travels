import { useAuthStore } from "../../store/authStore";

export default function Signing() {
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    // Perform login logic here
    login();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input
          type="email"
          placeholder="Email"
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 p-2 w-full border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
