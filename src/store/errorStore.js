import create from "zustand";

// créer un store pour gérer les erreurs
const useErrorStore = create((set) => ({
    error: "",
    setError: (error) => set({ error }),
    clearError: () => set({ error: "" }),
    }));

export default useErrorStore;