import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from '../api/posts'
import PropTypes from 'prop-types'

// Composant pour supprimer un post avec confirmation via une modale
export default function DeletePost({ postId }) {
  // État local pour afficher ou cacher la modale de confirmation
  const [showConfirm, setShowConfirm] = useState(false)

  // Permet d'invalider/refetch la liste des posts après suppression
  const queryClient = useQueryClient()

  // Mutation pour supprimer le post via l'API
  const deleteMutation = useMutation({
    // Fonction appelée lors de la mutation (requête DELETE)
    mutationFn: () => deletePost(postId),
    // Callback appelée en cas de succès
    onSuccess: () => {
      // Invalide la query 'posts' pour rafraîchir la liste
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  // Fonction appelée quand l'utilisateur confirme la suppression
  const handleDelete = () => {
    deleteMutation.mutate() // Lance la mutation
    setShowConfirm(false) // Ferme la modale
  }

  return (
    <>
      {/* Bouton principal pour demander la suppression */}
      <button
        onClick={() => setShowConfirm(true)} // Affiche la modale
        disabled={deleteMutation.isPending} // Désactive pendant la suppression
        style={{ color: 'white', background: 'red', marginTop: 8 }}
      >
        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
      </button>

      {/* Message d'erreur si la suppression échoue */}
      {deleteMutation.isError && (
        <div style={{ color: 'red' }}>Erreur lors de la suppression</div>
      )}

      {/* Modale de confirmation */}
      {showConfirm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: 'white',
              padding: 24,
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              minWidth: 300,
              textAlign: 'center',
            }}
          >
            <p>Are you sure you want to delete this post?</p>
            {/* Bouton pour confirmer la suppression */}
            <button
              onClick={handleDelete}
              style={{ color: 'white', background: 'red', marginRight: 8 }}
              disabled={deleteMutation.isPending}
            >
              Yes, delete
            </button>
            {/* Bouton pour annuler */}
            <button onClick={() => setShowConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  )
}

// Validation des props avec PropTypes
DeletePost.propTypes = {
  postId: PropTypes.string.isRequired,
}
