import type { Request, Response } from 'express'
import { getPaginationParams } from '../@helpers/getPaginationParams'
import type { AuthenticatedRequest } from '../@middlewares/auth'
import { courseService } from '../@services/courseService'
import { favoriteService } from '../@services/favoriteService'
import { likeService } from '../@services/likeService'

export const coursesController = {
  featured: async (req: Request, res: Response) => {
    try {
      const featuredCourses = await courseService.getRandomFeaturedCourses()

      return res.json(featuredCourses)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  releases: async (req: Request, res: Response) => {
    try {
      const releaseCourses = await courseService.getTopTenNewest()

      return res.json(releaseCourses)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  search: async (req: Request, res: Response) => {
    const { name } = req.query
    const [page, perPage] = getPaginationParams(req.query)

    try {
      if (typeof name !== 'string') throw new Error('Type need to be string.')

      const searchCourses = await courseService.findByName(name, page, perPage)

      return res.json(searchCourses)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  show: async (req: AuthenticatedRequest, res: Response) => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const userId = req.user!.id
    const courseId = req.params.id

    try {
      const course = await courseService.findById(courseId)

      if (!course) return res.status(404).json({ message: 'Course not found!' })

      const liked = await likeService.isLiked(userId, Number(courseId))
      const favorited = await favoriteService.isFavorited(userId, Number(courseId))
      return res.json({ ...course.get(), favorited, liked })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },
}
