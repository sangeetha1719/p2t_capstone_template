import { create } from 'zustand';

export const useUserStore = create((set) => ({
  username: "",
  email: "",
  role: "user",
  loggedIn: false,
  authSuccess: (data) => set({ username: data.username, email: data.email, role: data.role, loggedIn: true }),
  logout: () => set({ username: "", email: "", role: "user", loggedIn: false }),
}));