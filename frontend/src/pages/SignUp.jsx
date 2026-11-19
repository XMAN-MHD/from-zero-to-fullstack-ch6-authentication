import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router'
import { signup } from '../api/users.js'
import './SignUp.css'

export function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate('/')
    },
  })

  function handleSubmit(event) {
    event.preventDefault()
    signupMutation.mutate({ username, password })
  }

  return (
    <main className='signup-page'>
      <section className='signup-card'>
        <p className='signup-eyebrow'>BIENVENUE</p>
        <h1>Créer un compte</h1>
        <p className='signup-description'>
          Remplissez les champs ci-dessous pour vous inscrire.
        </p>

        {signupMutation.isError && (
          <p className='signup-error' role='alert'>
            {signupMutation.error.message}
          </p>
        )}

        <form className='signup-fields' onSubmit={handleSubmit}>
          <label className='signup-label' htmlFor='username'>
            Nom d’utilisateur
          </label>
          <input
            className='signup-input'
            id='username'
            type='text'
            autoComplete='username'
            placeholder='Choisissez un nom d’utilisateur'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <label className='signup-label' htmlFor='password'>
            Mot de passe
          </label>
          <input
            className='signup-input'
            id='password'
            type='password'
            autoComplete='new-password'
            placeholder='Créez un mot de passe'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type='submit' disabled={signupMutation.isPending}>
            {signupMutation.isPending ? 'Inscription…' : 'Créer mon compte'}
          </button>
        </form>
        <p>
          Déjà sur le blog ? <Link to='/'>Retour au blog</Link>
        </p>
      </section>
    </main>
  )
}
