import type { Request, Response } from 'express'
import { Category } from '../models'

export const categoriesController = {
  index: async (req: Request, res: Response) => {
    const { page, perPage } = req.query

    const perPageNumber =
      typeof perPage === 'string' && Number.parseInt(perPage, 10) > 0
        ? Number.parseInt(perPage, 10)
        : 10

    const pageNumber =
      typeof page === 'string' && Number.parseInt(page, 10) > 0 ? Number.parseInt(page, 10) : 1

    const offset = (pageNumber - 1) * perPageNumber

    try {
      const { count, rows } = await Category.findAndCountAll({
        attributes: ['id', 'name', 'position'],
        order: [['position', 'ASC']],
        limit: perPageNumber,
        offset,
      })

      return res.json({
        categories: rows,
        page: pageNumber,
        perPage: perPageNumber,
        total: count,
      })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },
}
