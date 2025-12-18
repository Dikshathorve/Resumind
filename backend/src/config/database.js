import mongoose from 'mongoose'
import { config } from '../config/config.js'

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodbUri)
    console.log('✓ MongoDB connected successfully')
    return mongoose.connection
  } catch (error) {
    console.error('✗ MongoDB connection error:', error)
    process.exit(1)
  }
}

export default mongoose
