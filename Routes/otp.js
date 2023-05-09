import express from 'express'
import { getOtp, sendOtp } from '../Controller/otpController.js'

const router=express.Router()


router.post('/sent',sendOtp)
router.get("/getotp:id/:token",getOtp)


export default router