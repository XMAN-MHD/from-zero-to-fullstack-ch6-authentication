import { useState } from 'react'
import DeletePost from './DeletePost'
import { EditPost } from './EditPost'
import PropTypes from 'prop-types'

// Composant qui affiche un post individuel, avec options d'édition et de suppression
export function Post({ _id, title, contents, author, tags }) {
  // État local pour savoir si on est en mode édition
  const [isEditing, setIsEditing] = useState(false)

  // Si on est en mode édition, on affiche le formulaire d'édition à la place du post
  if (isEditing) {
    return (
      <EditPost
        post={{ _id, title, contents, author, tags }}
        onClose={() => setIsEditing(false)} // Ferme le mode édition après modification ou annulation
      />
    )
  }

  // Affichage du post en mode "lecture"
  return (
    <article style={{ backgroundColor: 'lightgray', padding: 16, margin: 8, borderRadius: 20}}>
      {/* Titre du post */}
      <h3>{title}</h3>
      {/* Contenu du post */}
      <div>{contents}</div>
      <br />
      {/* Auteur, affiché seulement s'il existe */}
      {author && (
        <em>
          Written by <strong>{author}</strong>
        </em>
      )}
      <br />
      {/* Affichage des tags si le tableau n'est pas vide */}
      {Array.isArray(tags) && tags.length > 0 && (
        <em>
          Tags:{' '}
          {tags.map((tag) => (
            <em
              key={tag}
              style={{
                margin: '0 4px',
                fontStyle: 'oblique',
                background: 'lightgray',
                color: 'black',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              <strong>{tag}</strong>
            </em>
          ))}
        </em>
      )}
      <br />
      {/* Bouton pour passer en mode édition */}
      <button
        onClick={() => setIsEditing(true)}
        style={{ color: 'white', background: 'blue', marginTop: 8 }}
      >
        Edit
      </button>
      &nbsp;
      {/* Bouton de suppression avec confirmation (modale) */}
      <DeletePost postId={_id} />
      <br />
      <br />
    </article>
  )
}

// Définition des types attendus pour les props du composant
Post.propTypes = {
  _id: PropTypes.string.isRequired, // Identifiant unique du post
  title: PropTypes.string.isRequired, // Titre du post
  contents: PropTypes.string, // Contenu du post
  author: PropTypes.string, // Auteur du post
  tags: PropTypes.arrayOf(PropTypes.string), // Tableau de tags
}
