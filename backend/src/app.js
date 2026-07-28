import express from 'express'
import cors from 'cors'

import { postsRoutes } from './routes/posts.js'
import { usersRoutes } from './routes/users.js'

// Create the Express application
const app = express()

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors())

// Parse incoming JSON request bodies
app.use(express.json())

// Register all post-related routes
postsRoutes(app)

// Register all user-related routes
usersRoutes(app)

// Export the configured application
// The server is started separately in index.js
export { app }