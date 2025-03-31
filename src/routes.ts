import express from 'express'
import { categoriesController } from './@controller/categories-controller'
import { coursesController } from './@controller/coursesController'
import { episodesController } from './@controller/episodesController'

const router = express.Router()

router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

router.get('/courses/featured', coursesController.featured)
router.get('/courses/releases', coursesController.releases)
router.get('/courses/search', coursesController.search)
router.get('/courses/:id', coursesController.show)

router.get('/episodes/stream', episodesController.stream)

export { router }
