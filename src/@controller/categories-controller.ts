import type { Request, Response } from 'express'
import { Category } from '../models'

export const categoriesController = {
  index: async (req: Request, res: Response) => {
    const categories = await Category.findAll()

    return res.json(categories)
  },
}
