import { Post } from '../db/models/post.js'

// CREATE
export async function createPost({ title, author, contents, tags }) {
  const post = new Post({ title, author, contents, tags })
  return await post.save()
}

// READ
async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  const sortValue = sortOrder === 'ascending' ? 1 : -1
  const sort = { [sortBy]: sortValue }
  return await Post.find(query).sort(sort)
}

// List all posts
export async function listAllPosts(options) {
  return await listPosts({}, options)
}

// List posts by author
export async function listPostsByAuthor(author, options) {
  return await listPosts({ author }, options)
}

// List posts by tags
export async function listPostsByTags(tags, options) {
  const tagsArray = Array.isArray(tags) ? tags : tags.split(',')
  return await listPosts({ tags: { $in: tagsArray } }, options)
}

// THE GET SINGLE POST
export async function getPostById(postId) {
  return await Post.findById(postId)
}

// UPDATE
export async function updatePost(postId, updates) {
  // Get the fields to update
  const updatedFields = {}
  for (const key of ['title', 'author', 'contents', 'tags']) {
    if (updates[key] !== undefined) {
      updatedFields[key] = updates[key]
    }
  }
  // Do the update
  return await Post.findOneAndUpdate(
    { _id: postId },
    { $set: updatedFields },
    { new: true, runValidators: true },
  )
}

// DELETE
export async function deletePost(postId) {
  return await Post.deleteOne({ _id: postId })
}
