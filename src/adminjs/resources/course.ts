import path from 'node:path'
import uploadFileFeature from '@adminjs/upload'
import type { FeatureType, ResourceOptions } from 'adminjs'

export const courseResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'uploadThumbnail', 'featured', 'categoryId'],
  filterProperties: ['name', 'synopsis', 'featured', 'categoryId', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'featured', 'categoryId'],
  showProperties: [
    'id',
    'name',
    'synopsis',
    'featured',
    'thumbnailUrl',
    'categoryId',
    'createdAt',
    'updatedAt',
  ],
}

export const courseResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, '..', '..', '..', 'public'),
      },
    },
    properties: {
      key: 'thumbnailUrl',
      file: 'uploadThumbnail',
    },
    uploadPath: (record, filename) => `thumbnails/course-${record.get('courseId')}/${filename}`,
  }),
]
