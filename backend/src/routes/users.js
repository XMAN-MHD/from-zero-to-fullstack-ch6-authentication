import { createUser } from '../services/users.js'
import { loginUser } from '../services/users.js'

export function usersRoutes(app) {
  // SIGNUP
  app.post('/api/v1/users/signup', async (req, res) => {
    try {
      const user = await createUser(req.body)

      return res.status(201).json(user)
    } catch (err) {
      console.error('error creating user', err)

      if (
        err.message === 'Username is required' ||
        err.message === 'Password is required'
      ) {
        return res.status(400).json({
          error: err.message,
        })
      }

      if (err.message === 'Username already exists') {
        return res.status(409).json({
          error: err.message,
        })
      }

      return res.status(500).end()
    }
  })

  // LOGIN
  app.post('/api/v1/users/login', async (req, res) => {
    try {
      const result = await loginUser(req.body)

      return res.status(200).json(result)
    } catch (err) {
      if (err.message === 'Invalid username or password') {
        return res.status(401).json({
          error: 'Invalid username or password',
        })
      }

      console.error('Error logging in user:', err)

      return res.status(500).json({
        error: 'Internal server error',
      })
    }
  })
}