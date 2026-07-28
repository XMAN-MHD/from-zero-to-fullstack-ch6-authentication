import bcrypt from 'bcrypt'

import { User } from '../db/models/user.js'

const SALT_ROUNDS = 10

export async function createUser({ username, password }) {
  if (!username) {
    throw new Error('Username is required')
  }

  if (!password) {
    throw new Error('Password is required')
  }

  const existingUser = await User.findOne({ username })

  if (existingUser) {
    throw new Error('Username already exists')
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

  const user = await User.create({
    username,
    password: hashedPassword,
  })

  return {
    _id: user._id,
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}