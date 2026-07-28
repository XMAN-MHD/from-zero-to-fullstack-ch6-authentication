import { createUser } from '../services/users.js'

export function usersRoutes(app) {
  // CREATE / SIGNUP
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
}