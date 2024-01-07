import create from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  credentials: "",
  abbreviation: "",
  login: (username, password) => set({ isAuthenticated: true, credentials: btoa(`${username}:${password}`), abbreviation: username.substring(0, 3).toUpperCase() }),
  logout: () => set({ isAuthenticated: false, credentials: "", abbreviation: "" }),
}));

export default useAuthStore;
