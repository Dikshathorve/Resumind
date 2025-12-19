import express from 'express'
import {
  signup,
  signin,
  logout,
  verifySession,
} from '../controllers/authController.js'
import { isAuthenticated } from '../middleware/middleware.js'

const router = express.Router()

// Public routes
router.post('/signup', signup)
router.post('/signin', signin)

// Protected routes (require authentication)
router.post('/logout', isAuthenticated, logout)
router.get('/verify', isAuthenticated, verifySession)

export default router
