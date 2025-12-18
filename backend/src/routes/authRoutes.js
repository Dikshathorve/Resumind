import express from 'express'
import {
  signup,
  signin,
  logout,
  verifySession,
} from '../controllers/authController.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/logout', logout)
router.get('/verify', verifySession)

export default router
