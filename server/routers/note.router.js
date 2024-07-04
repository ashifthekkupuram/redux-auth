import express from 'express'

import { get_notes } from '../controllers/note.controller.js'

const router = express.Router()

router.get('/', get_notes)

export default router