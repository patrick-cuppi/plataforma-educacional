import type { ResourceWithOptions } from 'adminjs'
import { Category, Course } from '../../models'
import { categortyResourceOptions } from './category'
import { courseResourceOptions } from './course'

export const adminJsResource: ResourceWithOptions[] = [
  {
    resource: Category,
    options: categortyResourceOptions,
  },
  {
    resource: Course,
    options: courseResourceOptions,
  },
]
