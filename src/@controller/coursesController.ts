import type { Request, Response } from 'express'
import { courseService } from '../@services/courseService'

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

    try {
      if (typeof name !== 'string') throw new Error('Type need to be string.')

      const searchCourses = await courseService.findByName(name)

      return res.json(searchCourses)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  show: async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const course = await courseService.findById(id)

      return res.json(course)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },
}
