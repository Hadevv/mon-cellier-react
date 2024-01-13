import create from "zustand";

const useLikeStore = create((set) => ({
  // likesCount représente le nombre total de likes
  likesCount: 0,
  userLikes: [],

  // setLikesCount mettre à jour le nombre total de likes
  setLikesCount: (count) => set({ likesCount: count }),

  // setUserLikes mettre à jour la liste des likes de l'utilisateur
  setUserLikes: (userLikes) => set({ userLikes }),

  // initLikesFromLocalStorage recréer la liste des likes de l'utilisateur à partir du stockage local
  initLikesFromLocalStorage: () => {
    const storedUserLikes = JSON.parse(localStorage.getItem("userLikes")) || [];
    // mise à jour de la liste des likes dans le store
    set({ userLikes: storedUserLikes });
  },

  // addLike ajouter un like à un vin spécifié
  addLike: (wineId) => {
    // mise à jour de la liste des likes dans le store en ajoutant le vin spécifié
    set((state) => {
      const updatedUserLikes = [...state.userLikes, wineId];
      // stockage de la liste mise à jour localement
      localStorage.setItem("userLikes", JSON.stringify(updatedUserLikes));
      return { userLikes: updatedUserLikes };
    });
  },

  // removeLike supprimer un like d'un vin spécifié
  removeLike: (wineId) => {
    // mise à jour de la liste des likes dans le store en supprimant le vin spécifié
    set((state) => {
      const updatedUserLikes = state.userLikes.filter((id) => id !== wineId);
      // stockage de la liste mise à jour localement
      localStorage.setItem("userLikes", JSON.stringify(updatedUserLikes));
      return { userLikes: updatedUserLikes };
    });
  },
}));

export default useLikeStore;
