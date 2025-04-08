import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/landing";
import Register from "./pages/auth/register";
import Signing from "./pages/auth/signing";
import { useAuthStore } from "./store/authStore";

export default function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Landing /> : <Navigate to="/signing" />}
      />
      <Route
        path="/register"
        element={isLoggedIn ? <Navigate to="/" /> : <Register />}
      />
      <Route
        path="/signing"
        element={isLoggedIn ? <Navigate to="/" /> : <Signing />}
      />
    </Routes>
  );
}
