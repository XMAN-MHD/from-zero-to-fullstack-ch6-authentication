import mongoose from 'mongoose'
import { beforeEach, describe, expect, test } from '@jest/globals'

import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTags,
  getPostById,
  updatePost,
  deletePost,
} from '../services/posts.js'

import { Post } from '../db/models/post.js'
import { User } from '../db/models/user.js'

const samplePosts = [
  {
    title: 'Learning Redux',
    contents: 'Redux is a state management library.',
    tags: ['redux'],
  },
  {
    title: 'Learn React Hooks',
    contents: 'Hooks let you use state and lifecycle features.',
    tags: ['react'],
  },
  {
    title: 'Full-Stack React Projects',
    contents: 'Building full-stack applications with React and Node.js.',
    tags: ['react', 'nodejs'],
  },
  {
    title: 'Guide to TypeScript',
    contents: 'TypeScript adds static typing to JavaScript.',
  },
]

let testUser
let secondUser
let createdSamplePosts

/*
 * This setup runs before every test in this file.
 *
 * Each test starts with:
 * - an empty posts collection
 * - an empty users collection
 * - two users
 * - four posts belonging to testUser
 */
beforeEach(async () => {
  await Post.deleteMany({})
  await User.deleteMany({})

  testUser = await User.create({
    username: 'daniel',
    password: 'password',
  })

  secondUser = await User.create({
    username: 'test-author',
    password: 'password',
  })

  createdSamplePosts = []

  for (const post of samplePosts) {
    const createdPost = await Post.create({
      ...post,
      author: testUser._id,
    })

    createdSamplePosts.push(createdPost)
  }
})

describe('creating posts', () => {
  test('with all parameters should succeed', async () => {
    const post = {
      title: 'Hello Mongoose!',
      author: testUser._id,
      contents: 'This post is stored in a MongoDB database using Mongoose.',
      tags: ['mongoose', 'mongodb'],
    }

    const createdPost = await createPost(post)

    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundPost = await Post.findById(createdPost._id)

    expect(foundPost).not.toBeNull()
    expect(foundPost.title).toEqual(post.title)
    expect(foundPost.author.toString()).toEqual(testUser._id.toString())
    expect(foundPost.contents).toEqual(post.contents)
    expect(foundPost.tags).toEqual(post.tags)
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })

  test('without title should fail', async () => {
    expect.assertions(2)

    const post = {
      author: testUser._id,
      contents: 'Post with no title',
      tags: ['empty'],
    }

    try {
      await createPost(post)
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(error.message).toContain('`title` is required')
    }
  })

  test('with minimal parameters should succeed', async () => {
    const post = {
      title: 'Only a title',
      author: testUser._id,
    }

    const createdPost = await createPost(post)

    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
    expect(createdPost.title).toEqual(post.title)
    expect(createdPost.author.toString()).toEqual(testUser._id.toString())
  })
})

describe('listing posts', () => {
  test('should return all posts', async () => {
    const posts = await listAllPosts()

    expect(posts).toHaveLength(createdSamplePosts.length)
  })

  test('should return posts sorted by creation date descending by default', async () => {
    const posts = await listAllPosts()

    const sortedSamplePosts = [...createdSamplePosts].sort(
      (firstPost, secondPost) =>
        secondPost.createdAt.getTime() - firstPost.createdAt.getTime(),
    )

    expect(posts.map((post) => post.createdAt.getTime())).toEqual(
      sortedSamplePosts.map((post) => post.createdAt.getTime()),
    )
  })

  test('should take into account provided sorting options', async () => {
    const posts = await listAllPosts({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })

    const sortedSamplePosts = [...createdSamplePosts].sort(
      (firstPost, secondPost) =>
        firstPost.updatedAt.getTime() - secondPost.updatedAt.getTime(),
    )

    expect(posts.map((post) => post.updatedAt.getTime())).toEqual(
      sortedSamplePosts.map((post) => post.updatedAt.getTime()),
    )
  })

  test('should be able to filter posts by author', async () => {
    const posts = await listPostsByAuthor(testUser._id)

    expect(posts).toHaveLength(4)

    for (const post of posts) {
      expect(post.author.toString()).toEqual(testUser._id.toString())
    }
  })

  test('should be able to filter posts by tag', async () => {
    const posts = await listPostsByTags('nodejs')

    expect(posts).toHaveLength(1)
    expect(posts[0].tags).toContain('nodejs')
  })
})

describe('getting a post', () => {
  test('should return the full post', async () => {
    const post = await getPostById(createdSamplePosts[0]._id)

    expect(post).not.toBeNull()
    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject())
  })

  test('should return null if the id does not exist', async () => {
    const post = await getPostById('000000000000000000000000')

    expect(post).toBeNull()
  })
})

describe('updating posts', () => {
  test('should update the specified property', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: secondUser._id,
    })

    const updatedPost = await Post.findById(createdSamplePosts[0]._id)

    expect(updatedPost).not.toBeNull()
    expect(updatedPost.author.toString()).toEqual(secondUser._id.toString())
  })

  test('should not update other properties', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: secondUser._id,
    })

    const updatedPost = await Post.findById(createdSamplePosts[0]._id)

    expect(updatedPost).not.toBeNull()
    expect(updatedPost.title).toEqual('Learning Redux')
    expect(updatedPost.contents).toEqual(
      'Redux is a state management library.',
    )
    expect(updatedPost.tags).toEqual(['redux'])
  })

  test('should update the updatedAt timestamp', async () => {
    const originalUpdatedAt = createdSamplePosts[0].updatedAt.getTime()

    // Prevent the original update and the tested update from having
    // exactly the same millisecond timestamp.
    await new Promise((resolve) => setTimeout(resolve, 10))

    await updatePost(createdSamplePosts[0]._id, {
      author: secondUser._id,
    })

    const updatedPost = await Post.findById(createdSamplePosts[0]._id)

    expect(updatedPost).not.toBeNull()
    expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt)
  })

  test('should return null if the id does not exist', async () => {
    const post = await updatePost('000000000000000000000000', {
      author: secondUser._id,
    })

    expect(post).toBeNull()
  })
})

describe('deleting posts', () => {
  test('should remove the post from the database', async () => {
    const result = await deletePost(createdSamplePosts[0]._id)

    expect(result.deletedCount).toEqual(1)

    const deletedPost = await Post.findById(createdSamplePosts[0]._id)

    expect(deletedPost).toBeNull()
  })

  test('should not delete anything if the id does not exist', async () => {
    const result = await deletePost('000000000000000000000000')

    expect(result.deletedCount).toEqual(0)
  })
})