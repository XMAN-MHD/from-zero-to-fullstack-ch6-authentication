import {
  listAllPosts,
  listPostsByAuthor,
  listPostsByTags,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../services/posts.js'

import { requireAuth } from '../middleware/jwt.js'

export function postsRoutes(app) {

  // READ
  app.get('/api/v1/posts', async (req, res) => {
    const { sortBy, sortOrder, author, tags } = req.query
    const options = { sortBy, sortOrder }
    try {
      if (author && tags) {
        return res
          .status(400)
          .json({ error: 'query by either author or tags, not both' })
      } else if (author) {
        return res.status(200).json(await listPostsByAuthor(author, options))
      } else if (tags) {
        return res.status(200).json(await listPostsByTags(tags, options))
      } else {
        return res.status(200).json(await listAllPosts(options))
      }
    } catch (err) {
      console.error('error listing posts', err)
      return res.status(500).end()
    }
  })
  /************* THE GET SINGLE POST *****/
  app.get('/api/v1/posts/:id', async (req, res) => {
    const { id } = req.params
    try {
      const post = await getPostById(id)
      if (post === null) return res.status(404).end()
      return res.status(200).json(post)
    } catch (err) {
      console.error('error getting post', err)
      return res.status(500).end()
    }
  })

  // CREATE
  app.post('/api/v1/posts', requireAuth, async (req, res) => {
    try {
      const post = await createPost(req.auth.sub, req.body)
      return res.status(201).json(post)
    } catch (err) {
      console.error('error creating post', err)
      return res.status(500).end()
    }
  })

  // UPDATE
  app.patch('/api/v1/posts/:id', requireAuth, async (req, res) => {
    try {
      const post = await updatePost(req.auth.sub, req.params.id, req.body)
      if (!post) return res.status(404).end()
      return res.status(200).json(post)
    } catch (err) {
      console.error('error updating post', err)
      return res.status(500).end()
    }
  })

  // DELETE
  app.delete('/api/v1/posts/:id', requireAuth, async (req, res) => {
    try {
      const result = await deletePost(req.auth.sub, req.params.id)
      if (result.deletedCount === 0) return res.status(404).end()
      return res.status(204).end()
    } catch (err) {
      console.error('error deleting post', err)
      return res.status(500).end()
    }
  })
}
