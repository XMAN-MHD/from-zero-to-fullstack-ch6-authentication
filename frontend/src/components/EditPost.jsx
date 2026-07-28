import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePost } from '../api/posts'

// Composant d'édition d'un post existant
export function EditPost({ post, onClose }) {
  // États locaux pour chaque champ du formulaire, initialisés avec les valeurs du post à éditer
  const [title, setTitle] = useState(post.title)
  const [author, setAuthor] = useState(post.author)
  const [contents, setContents] = useState(post.contents)
  // Les tags sont stockés sous forme de chaîne séparée par des virgules pour l'input texte
  const [tags, setTags] = useState(
    Array.isArray(post.tags) ? post.tags.join(', ') : '',
  )

  // Permet d'invalider/refetch les queries après la mutation
  const queryClient = useQueryClient()

  // Mutation pour mettre à jour le post via l'API
  const updateMutation = useMutation({
    // Fonction qui sera appelée lors de la mutation
    mutationFn: (updates) => updatePost(post._id, updates),
    // Callback appelée en cas de succès
    onSuccess: () => {
      // Invalide la query 'posts' pour rafraîchir la liste
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      // Ferme le formulaire d'édition si la fonction onClose est fournie
      onClose && onClose()
    },
  })

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()
    // Lance la mutation avec les valeurs du formulaire
    updateMutation.mutate({
      title,
      author,
      contents,
      // Transforme la chaîne de tags en tableau
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Champ titre */}
      <div>
        <label htmlFor='edit-title'>Title: </label>
        <input
          type='text'
          name='edit-title'
          id='edit-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      {/* Champ auteur */}
      <div>
        <label htmlFor='edit-author'>Author: </label>
        <input
          type='text'
          name='edit-author'
          id='edit-author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <br />
      {/* Champ tags */}
      <div>
        <label htmlFor='edit-tags'>Tags: </label>
        <input
          type='text'
          name='edit-tags'
          id='edit-tags'
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder='e.g. react, nodejs'
        />
      </div>
      <br />
      {/* Champ contenu */}
      <label htmlFor='edit-contents'>Contents :</label>
      <textarea
        name='edit-contents'
        id='edit-contents'
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <br />
      <br />
      {/* Bouton de soumission */}
      <input
        type='submit'
        value={updateMutation.isPending ? 'Updating...' : 'Update'}
        disabled={updateMutation.isPending}
      />
      {/* Bouton d'annulation */}
      <button type='button' onClick={onClose} style={{ marginLeft: 8 }}>
        Cancel
      </button>
      {/* Affichage des messages d'erreur ou de succès */}
      {updateMutation.isError && (
        <div style={{ color: 'red' }}>Erreur lors de la mise à jour</div>
      )}
      {updateMutation.isSuccess && (
        <div style={{ color: 'green' }}>Post mis à jour !</div>
      )}
    </form>
  )
}
