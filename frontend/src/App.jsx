import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './Blog.jsx'

// Création d'une instance de QueryClient (gestionnaire central de TanStack Query)
const queryClient = new QueryClient()

// Composant racine de l'application
export function App() {
  return (
    // Fournit le QueryClient à toute l'application via le contexte React
    <QueryClientProvider client={queryClient}>
      {/* Le composant Blog (et tous ses enfants) peuvent maintenant utiliser TanStack Query */}
      <Blog />
    </QueryClientProvider>
  )
}
