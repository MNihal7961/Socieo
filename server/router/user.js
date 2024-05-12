import express from 'express'

import { verifyToken } from '../middleware/auth.js'
import { getUser, getUserFriends, addRemoveFriend } from '../controller/user.js'

const router = express.Router()

//GET USER PROFILE
router.get('/:id', verifyToken, getUser)

//GET USER FRIENDS
router.get('/:id/friends', verifyToken, getUserFriends)

//PATCH ADD AND REMOVE FRIENDS
router.patch('/:id/:friendId', verifyToken, addRemoveFriend)

export default router