import create from "zustand";

const useAuthStore = create((set) => {
  // storedUser est utilisé pour récupérer l'utilisateur stocké dans localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  return {
    // isAuthenticated est utilisé pour savoir si l'utilisateur est connecté ou non
    isAuthenticated: storedUser.isAuthenticated || false,
    credentials: storedUser.credentials || "",
    // abbreviation est utilisé pour afficher les initiales de l'utilisateur connecté
    abbreviation: storedUser.abbreviation || "",

    login: (username, password) => {
      const user = {
        isAuthenticated: true,
        credentials: btoa(`${username}:${password}`),
        abbreviation: username.substring(0, 3).toUpperCase(),
      };
      // ajout de l'utilisateur dans localStorage
      localStorage.setItem("user", JSON.stringify(user));

      set(user);
    },

    logout: () => {
      // suppression de l'utilisateur dans localStorage
      localStorage.removeItem("user");

      set({ isAuthenticated: false, credentials: "", abbreviation: "" });
    },
  };
});

export default useAuthStore;
