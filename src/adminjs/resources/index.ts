import type { ResourceWithOptions } from 'adminjs'
import { Category } from '../../models'
import { categortyResourceOptions } from './category'

export const adminJsResource: ResourceWithOptions[] = [
  {
    resource: Category,
    options: categortyResourceOptions,
  },
]
