import create from 'zustand';

const useLikeStore = create((set) => ({
  likesCount: 0,
  userLikes: [],

  setLikesCount: (count) => set({ likesCount: count }),
  setUserLikes: (userLikes) => set({ userLikes }),

  initLikesFromLocalStorage: () => {
    const storedUserLikes = JSON.parse(localStorage.getItem('userLikes')) || [];
    set({ userLikes: storedUserLikes });
  },

  addLike: (wineId) => {
    set((state) => {
      const updatedUserLikes = [...state.userLikes, wineId];
      localStorage.setItem('userLikes', JSON.stringify(updatedUserLikes));
      return { userLikes: updatedUserLikes };
    });
  },

  removeLike: (wineId) => {
    set((state) => {
      const updatedUserLikes = state.userLikes.filter((id) => id !== wineId);
      localStorage.setItem('userLikes', JSON.stringify(updatedUserLikes));
      return { userLikes: updatedUserLikes };
    });
  },
}));

export default useLikeStore;

