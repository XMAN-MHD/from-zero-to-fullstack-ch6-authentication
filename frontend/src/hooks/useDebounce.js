import { useState, useEffect } from 'react'

// Hook personnalisé pour "débouncer" une valeur (attendre que l'utilisateur ait fini de taper)
export function useDebounce(value, delay = 3000) {
  // État local pour stocker la valeur "débouncée"
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // À chaque changement de value ou de delay, on lance un timer
    const handler = setTimeout(() => setDebouncedValue(value), delay)

    // Nettoyage : si value ou delay change avant la fin du timer, on annule le timer précédent
    return () => clearTimeout(handler)
  }, [value, delay]) // Le hook s'exécute à chaque changement de value ou de delay

  // On retourne la valeur "débouncée" (mise à jour seulement après le délai)
  return debouncedValue
}
