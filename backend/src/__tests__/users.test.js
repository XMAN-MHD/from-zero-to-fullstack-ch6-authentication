import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { beforeEach, describe, expect, test } from '@jest/globals'

import { User } from '../db/models/user.js'
import { createUser } from '../services/users.js'

beforeEach(async () => {
  await User.deleteMany({})
})

describe('creating users', () => {
  test('should create a user successfully', async () => {
    const input = {
      username: 'daniel',
      password: 'secret-password',
    }

    const createdUser = await createUser(input)

    expect(createdUser._id).toBeInstanceOf(mongoose.Types.ObjectId)
    expect(createdUser.username).toEqual(input.username)
    expect(createdUser.createdAt).toBeInstanceOf(Date)
    expect(createdUser.updatedAt).toBeInstanceOf(Date)
  })

  test('should hash the password before storing it', async () => {
    const input = {
      username: 'daniel',
      password: 'secret-password',
    }

    const createdUser = await createUser(input)

    const storedUser = await User.findById(createdUser._id)

    expect(storedUser).not.toBeNull()
    expect(storedUser.password).not.toEqual(input.password)

    const passwordMatches = await bcrypt.compare(
      input.password,
      storedUser.password,
    )

    expect(passwordMatches).toBe(true)
  })

  test('should not return the password', async () => {
    const input = {
      username: 'daniel',
      password: 'secret-password',
    }

    const createdUser = await createUser(input)

    expect(createdUser.password).toBeUndefined()
  })

  test('should not store the plain-text password', async () => {
    const input = {
      username: 'daniel',
      password: 'secret-password',
    }

    const createdUser = await createUser(input)

    const storedUser = await User.findById(createdUser._id)

    expect(storedUser.password).not.toContain(input.password)
  })

  test('should reject a duplicate username', async () => {
    const input = {
      username: 'daniel',
      password: 'secret-password',
    }

    await createUser(input)

    await expect(
      createUser({
        username: 'daniel',
        password: 'another-password',
      }),
    ).rejects.toThrow('Username already exists')

    const users = await User.find({ username: 'daniel' })

    expect(users).toHaveLength(1)
  })

  test('should fail when username is missing', async () => {
    await expect(
      createUser({
        password: 'secret-password',
      }),
    ).rejects.toThrow('Username is required')
  })

  test('should fail when password is missing', async () => {
    await expect(
      createUser({
        username: 'daniel',
      }),
    ).rejects.toThrow('Password is required')
  })
})
