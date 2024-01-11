import create from 'zustand';

const useLikeStore = create((set) => ({
  // likesCount est utilisé pour afficher le nombre de likes
  likesCount: 0,
  setLikesCount: (count) => set({ likesCount: count }),
}));

export default useLikeStore;
