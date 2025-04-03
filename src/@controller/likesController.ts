import type { Response } from 'express'
import type { AuthenticatedRequest } from '../@middlewares/auth'
import { likeService } from '../@services/likeService'

export const likesController = {
  save: async (req: AuthenticatedRequest, res: Response) => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const userId = req.user!.id
    const { courseId } = req.body

    try {
      const like = await likeService.create(userId, courseId)

      return res.status(201).json(like)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  delete: async (req: AuthenticatedRequest, res: Response) => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const userId = req.user!.id
    const courseId = req.params.id

    try {
      const like = await likeService.delete(userId, Number(courseId))

      return res.status(204).send()
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },
}
