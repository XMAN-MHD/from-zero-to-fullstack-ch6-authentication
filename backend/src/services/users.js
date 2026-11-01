import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../db/models/user.js'

const SALT_ROUNDS = 10

// SIGNUP
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

//LOGIN
export async function loginUser(username, password) {
  const user = await User.findOne({ username })

  if (!user) {
    throw new Error('Invalid username or password')
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password,
  )

  if (!isPasswordCorrect) {
    throw new Error('Invalid username or password')
  }

  const token = jwt.sign(
    { sub: user._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  )

  return { token }
}