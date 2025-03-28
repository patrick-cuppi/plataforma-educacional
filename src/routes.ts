import express from 'express'
import { categoriesController } from './@controller/categories-controller'

const router = express.Router()

router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

export { router }
