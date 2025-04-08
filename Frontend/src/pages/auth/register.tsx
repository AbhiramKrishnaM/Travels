export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
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
        <button className="bg-blue-500 text-white p-2 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
}
