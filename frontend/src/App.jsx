import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './pages/Blog.jsx'
import { SignUp } from './pages/SignUp.jsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

// Création d'une instance de QueryClient (gestionnaire central de TanStack Query)
const queryClient = new QueryClient()
// Le routeur est créé une seule fois, en dehors du composant App.
const router = createBrowserRouter([
  {
    path: '/',
    element: <Blog />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
])

// Composant racine de l'application
export function App() {
  return (
    // Fournit le QueryClient à toute l'application via le contexte React
    <QueryClientProvider client={queryClient}>
      {/* Provide the router to the application */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
