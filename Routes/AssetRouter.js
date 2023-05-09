import express from 'express'
import multer from 'multer'
const upload=multer()
import { deleteAsset, getAllAsset, getAsset, updateAsset, uploadAsset } from '../Controller/AssetControl.js'
const router=express.Router()
router.post("/",upload.single("image"),uploadAsset)
router.get('/allAsset',getAllAsset)
router.get('/:id',getAsset)
router.put('/update/:id',updateAsset)
router.delete('/delete/:id',deleteAsset)





export default router