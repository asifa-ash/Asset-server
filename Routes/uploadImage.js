import express from 'express';
import { deleteUser, getUser, updateUser, uploadData } from '../Controller/UploadController.js';
import { getAllUser } from '../Controller/UploadController.js';
import multer from 'multer'
import {Auth} from '../middlewares/AuthMiddleware.js'

const router=express.Router()
const upload=multer()
router.post("/",upload.single("image"),uploadData)
router.get('/allUser',getAllUser)
router.get('/:id',getUser)
router.put('/update/:id',updateUser)
router.delete('/delete/:id',deleteUser)





export default router;
