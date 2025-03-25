import type { ResourceWithOptions } from 'adminjs'
import { Category, Course, Episode } from '../../models'
import { categortyResourceOptions } from './category'
import { courseResourceOptions } from './course'
import { episodeResourceFeatures, episodeResourceOptions } from './episode'

export const adminJsResource: ResourceWithOptions[] = [
  {
    resource: Category,
    options: categortyResourceOptions,
  },
  {
    resource: Course,
    options: courseResourceOptions,
  },
  {
    resource: Episode,
    options: episodeResourceOptions,
    features: episodeResourceFeatures,
  },
]
