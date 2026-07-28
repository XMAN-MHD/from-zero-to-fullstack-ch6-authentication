import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts.js'

// Composant pour créer un nouveau post via un formulaire
export default function CreatePost() {
  // États locaux pour chaque champ du formulaire
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [author, setAuthor] = useState('')
  const [contents, setContents] = useState('')

  // Permet d'invalider/refetch la liste des posts après création
  const queryClient = useQueryClient()

  // Mutation pour créer un post via l'API
  const createPostMutation = useMutation({
    // Fonction appelée lors de la mutation (requête POST)
    mutationFn: () =>
      createPost({
        title,
        author,
        contents,
        // Les tags sont transformés en tableau à partir d'une chaîne séparée par des virgules
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      }),
    // Callback appelée en cas de succès
    onSuccess: () => {
      // Réinitialise les champs du formulaire
      setTitle('')
      setAuthor('')
      setContents('')
      setTags('')
      // Invalide la query 'posts' pour rafraîchir la liste
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate() // Lance la mutation
  }

  return (
    <form
  onSubmit={handleSubmit}
  style={{
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  }}
>

  <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
    <label htmlFor="create-title">Title</label>
    <input
      type="text"
      id="create-title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      style={{
        padding: '.8rem',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
      }}
    />
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
    <label htmlFor="create-author">Author</label>
    <input
      type="text"
      id="create-author"
      value={author}
      onChange={(e) => setAuthor(e.target.value)}
      style={{
        padding: '.8rem',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
      }}
    />
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
    <label htmlFor="create-tags">Tags</label>
    <input
      type="text"
      id="create-tags"
      value={tags}
      placeholder="e.g. react, nodejs, blog"
      onChange={(e) => setTags(e.target.value)}
      style={{
        padding: '.8rem',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
      }}
    />
  </div>

  <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
    <label htmlFor="contents">Contents</label>
    <textarea
      id="contents"
      value={contents}
      onChange={(e) => setContents(e.target.value)}
      style={{
        padding: '.8rem',
        borderRadius: '8px',
        border: '1px solid #ccc',
        minHeight: '180px',
        resize: 'vertical',
        fontSize: '1rem',
      }}
    />
  </div>

  <input
    type="submit"
    value={createPostMutation.isPending ? 'Creating...' : 'Create Post'}
    disabled={!title || createPostMutation.isPending}
    style={{
      padding: '.9rem',
      backgroundColor: createPostMutation.isPending ? '#94a3b8' : '#2563eb',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: createPostMutation.isPending ? 'not-allowed' : 'pointer',
    }}
  />

  {createPostMutation.isSuccess && (
    <div
      style={{
        padding: '.8rem',
        backgroundColor: '#dcfce7',
        color: '#166534',
        borderRadius: '8px',
        textAlign: 'center',
        fontWeight: 'bold',
      }}
    >
      ✅ Post created successfully!
    </div>
  )}
</form>
  )
}
