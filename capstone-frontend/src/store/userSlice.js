export const userSlice = (set) => ({
    isAdmin: false,
    setIsAdmin: (state) => set({ isAdmin: state }),
    isLoggedIn: false,
    setIsLoggedIn: (state) => set({ isLoggedIn: state}),
});
