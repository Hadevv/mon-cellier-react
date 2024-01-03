import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  // Lire la valeur du stockage local lors de l'initialisation
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  // Utiliser useState pour gérer l'état
  const [value, setValue] = useState(initial);

  // Fonction pour mettre à jour la valeur dans le stockage local et dans l'état
  const updateValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
}

export default useLocalStorage;
