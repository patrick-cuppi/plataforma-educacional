import type { Request, Response } from 'express'
import { categoryService } from '../@services/categoryService'

export const categoriesController = {
  index: async (req: Request, res: Response) => {
    const { page, perPage } = req.query

    const perPageNumber =
      typeof perPage === 'string' && Number.parseInt(perPage, 10) > 0
        ? Number.parseInt(perPage, 10)
        : 10

    const pageNumber =
      typeof page === 'string' && Number.parseInt(page, 10) > 0 ? Number.parseInt(page, 10) : 1

    try {
      const paginatedCategories = await categoryService.findAllPaginated(pageNumber, perPageNumber)

      return res.json(paginatedCategories)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },
}
