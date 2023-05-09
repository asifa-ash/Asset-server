import express from 'express'
import { login, logout, reSetPass, register } from '../Controller/AuthContol.js'
const router=express.Router()
router.post('/login',login)
router.post('/register',register)
router.post('/logout',logout)
router.post('/resetpass/:id/:token',reSetPass)




export default router