import create from 'zustand';

const useLikeStore = create((set) => ({
  likesCount: 0,
  setLikesCount: (count) => set({ likesCount: count }),
}));

export default useLikeStore;
