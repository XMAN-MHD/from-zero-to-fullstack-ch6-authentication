export const signup = async ({ username, password }) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL

  const res = await fetch(`${baseUrl}/users/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.error ?? `Échec de l’inscription (${res.status})`)
  }

  return data
}
