import mongoose from 'mongoose'
import { config } from '../config/config.js'

export const connectDB = async () => {
  try {
    // MongoDB connection options
    const mongooseOptions = {
      retryWrites: true,
      w: 'majority',
      // For development, allow self-signed certificates
      ssl: true,
      tlsAllowInvalidCertificates: process.env.NODE_ENV === 'development',
      tlsAllowInvalidHostnames: process.env.NODE_ENV === 'development',
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    const connection = await mongoose.connect(config.mongodbUri, mongooseOptions)
    console.log('✓ MongoDB connected successfully')
    return connection
  } catch (error) {
    console.error('✗ MongoDB connection error:', error.message)
    console.log('⚠ Retrying connection in 5 seconds...')
    
    // Retry connection every 5 seconds
    setTimeout(() => {
      connectDB()
    }, 5000)
  }
}

export default mongoose
