import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import CreatePost from './components/CreatePost'
import PostFilter from './components/PostFilter'
import PostSorting from './components/PostSorting'
import { PostList } from './components/PostList'
import { getPosts } from './api/posts'
import { useDebounce } from './hooks/useDebounce'

// Composant principal du blog : gère les filtres, le tri, la création et l'affichage des posts
export function Blog() {
  // États pour les filtres et le tri
  const [author, setAuthor] = useState('')
  const [tags, setTags] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  // Utilisation du hook de debounce pour éviter trop de requêtes lors de la saisie du filtre auteur
  const debouncedAuthor = useDebounce(author)

  // Récupération des posts depuis le backend avec TanStack Query
  const postsQuery = useQuery({
    // La clé de la query inclut tous les paramètres pour permettre le caching et l'invalidation correcte
    queryKey: ['posts', { author: debouncedAuthor, tags, sortBy, sortOrder }],
    // Fonction qui effectue la requête API avec les bons paramètres
    queryFn: () =>
      getPosts({ author: debouncedAuthor, tags, sortBy, sortOrder }),
  })

  // On récupère les posts ou un tableau vide si la data n'est pas encore chargée
  const posts = postsQuery.data ?? []

  // Gestion des états de chargement et d'erreur
  if (postsQuery.isLoading) return <div>Loading...</div>
  if (postsQuery.error) return <div>Error: {postsQuery.error.message}</div>

  // Affichage du composant principal
  return (
    <div style={{ padding: 8, maxWidth: 800, margin: '0 auto' }}>
      {/* Formulaire de création de post */}
      <br />
      <h1 style={{ textAlign: 'center' }}>WELCOME TO MY BLOG</h1>
      <br />
      <br />
      <h2>✍️ Create New Post</h2>
      <CreatePost />
      <br />
      <br />
      <hr />
      <br />
      <br />
      {/* Filtres */}
      <h2>🔍 Filter By</h2>
      <br />
      <PostFilter field='author' value={author} onChange={setAuthor} />
      <br />
      <PostFilter field='tags' value={tags} onChange={setTags} />
      <br />
      {/* Tri */}
      <PostSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <br />
      <br />
      <hr />
      <br />
      {/* Liste des posts */}
      <h2>📚 All Posts </h2>
      <PostList posts={posts} />
    </div>
  )
}
