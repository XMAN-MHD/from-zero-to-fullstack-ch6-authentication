import mongoose from 'mongoose'

export async function initDatabase() {
  const databaseUrl =
    process.env.DATABASE_URL || 'mongodb://localhost:27018/blog'

  try {
    await mongoose.connect(databaseUrl)

    console.info('✅ Successfully connected to database')
  } catch (error) {
    console.error('❌ Error connecting to database:', error)
    throw error
  }
}