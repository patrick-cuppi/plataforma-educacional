import type { Request, Response } from 'express'
import type { AuthenticatedRequest } from '../@middlewares/auth'
import { favoriteService } from '../@services/favoriteService'

export const favoritesController = {
  save: async (req: AuthenticatedRequest, res: Response) => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const userId = req.user!.id
    const { courseId } = req.body

    try {
      const favorite = await favoriteService.create(userId, Number(courseId))

      return res.status(201).json(favorite)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },
}
