import { create } from "zustand";
import { AuthResponse } from "../types/auth";

interface AuthState {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn") || "false"),
  login: async (email, password) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data: AuthResponse = await response.json();
        set({ isLoggedIn: true });
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  },
  logout: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        set({ isLoggedIn: false });
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  },
  register: async (name, email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data: AuthResponse = await response.json();
        console.log(data.message);
        set({ isLoggedIn: true });
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  },
}));
