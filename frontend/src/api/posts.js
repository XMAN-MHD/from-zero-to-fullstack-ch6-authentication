// Récupère une liste de posts avec des paramètres de requête optionnels
export const getPosts = async (queryParams) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}

// Crée un nouveau post
export const createPost = async (post) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  if (!res.ok) throw new Error('Failed to create post')
  return await res.json()
}

// Supprime un post par son ID
export const deletePost = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete post')
  // Simplement envoie `return res` si ton backend ne renvoie rien (204 no-content) après la suppression 
  return res
}

// Met à jour un post existant par son ID
export const updatePost = async (id, updates) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`, {
    method: 'PATCH', // mon backend attend une modification partielle (juste les champs à modifier)
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  if (!res.ok) throw new Error('Failed to update post')
  return await res.json()
}
