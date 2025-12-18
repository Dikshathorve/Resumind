import express from 'express'
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  deleteAccount,
} from '../controllers/userController.js'
import { isAuthenticated } from '../middleware/middleware.js'

const router = express.Router()

router.use(isAuthenticated) // All user routes require authentication

router.get('/profile', getUserProfile)
router.put('/profile', updateUserProfile)
router.post('/password', changePassword)
router.delete('/account', deleteAccount)

export default router
