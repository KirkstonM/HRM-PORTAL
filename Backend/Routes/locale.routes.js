import { getLocale, addLocale } from '../Controllers/locale.controller.js'
import express from 'express'

const router = express.Router()

//GET http://localhost:5000/locale
router.get('/locale', getLocale)
//POST http://localhost:5000/locale
router.post('/locale', addLocale)

export default router
