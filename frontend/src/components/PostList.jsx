import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Post } from './Post'

// Composant qui affiche une liste de posts
export function PostList({ posts = [] }) {
  return (
    <div>
      {/* Parcours le tableau de posts et affiche chaque post */}
      {posts.map((post) => (
        // Fragment permet de retourner plusieurs éléments sans ajouter de div inutile
        <Fragment key={post._id}>
          {/* On passe toutes les propriétés du post au composant Post */}
          <Post {...post} />
        </Fragment>
      ))}
    </div>
  )
}

// Définition des types attendus pour les props du composant
PostList.propTypes = {
  // posts doit être un tableau d'objets respectant la structure des propTypes de Post
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
}
