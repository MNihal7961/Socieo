import express from 'express'

import { verifyToken } from '../middleware/auth.js'
import { getFeedPosts, getUserPosts, likePost } from '../controller/post.js'

const router = express.Router()

//GET ALL POSTS
router.get('/', verifyToken, getFeedPosts)

//GET USER POSTS
router.get('/:userId/posts', verifyToken, getUserPosts)

//LIKE POSTS
router.patch('/:id/like', verifyToken, likePost)

export default router