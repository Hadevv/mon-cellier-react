import create from "zustand";

const useStore = create((set) => ({
    likes: [],
    addLike: (id) => set((state) => ({ likes: [...state.likes, id] })),
    removeLike: (id) =>
        set((state) => ({ likes: state.likes.filter((like) => like !== id) })),
    clearLikes: () => set({ likes: [] }),
    
}));

export default useStore;



