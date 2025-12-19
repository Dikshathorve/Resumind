import express from 'express'
import cors from 'cors'
import { config } from './config/config.js'
import { connectDB } from './config/database.js'
import sessionConfig from './config/session.js'
import { errorHandler, notFoundHandler } from './middleware/middleware.js'

// Import routes
import authRoutes from './routes/authRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'
import userRoutes from './routes/userRoutes.js'
import analysisRoutes from './routes/analysisRoutes.js'

const app = express()

// Connect to database (non-blocking - don't wait for connection)
connectDB().catch(err => {
  console.error('Database connection will be retried...')
})

// Middleware
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true, // Allow cookies
  })
)

// Session middleware
app.use(sessionConfig)

// Request logging middleware
app.use((req, res, next) => {
  next()
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/resumes', resumeRoutes)
app.use('/api/user', userRoutes)
app.use('/api/analysis', analysisRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  })
})

// 404 handler
app.use(notFoundHandler)

// Error handler
app.use(errorHandler)

// Start server
const PORT = config.port
app.listen(PORT, () => {
  console.log(`
    ╔═══════════════════════════════════════════╗
    ║   Resumind Backend Server Started          ║
    ║   Port: ${PORT}                              ║
    ║   Environment: ${config.nodeEnv}            ║
    ║   Database: MongoDB                        ║
    ║   Session: MongoDB Store                   ║
    ╚═══════════════════════════════════════════╝
  `)
})

export default app
