import create from 'zustand';

const useAuthStore = create((set) => ({
  // isAuthenticated est utilisé pour savoir si l'utilisateur est connecté ou non
  isAuthenticated: false,
  credentials:"",
  // abbreviation est utilisé pour afficher les initiales de l'utilisateur connecté
  abbreviation:"",
  login: (username, password) => set({ isAuthenticated: true, credentials:btoa(`${username}:${password}`), abbreviation: username.substring(0, 3).toUpperCase() }),
  logout: () => set({ isAuthenticated:false, credentials:"", abbreviation:"" }),
}));

export default useAuthStore;
