import { type Request, type Response, query } from 'express'
import { getPaginationParams } from '../@helpers/getPaginationParams'
import { categoryService } from '../@services/categoryService'

export const categoriesController = {
  index: async (req: Request, res: Response) => {
    const [page, perPage] = getPaginationParams(req.query)

    try {
      const paginatedCategories = await categoryService.findAllPaginated(page, perPage)

      return res.json(paginatedCategories)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  show: async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const category = await categoryService.findById(id)

      return res.json(category)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },
}
