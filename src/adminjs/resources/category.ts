import type { ResourceOptions } from 'adminjs'

export const categortyResourceOptions: ResourceOptions = {
  navigation: 'Catálago',
  editProperties: ['name', 'position'],
  filterProperties: ['name', 'position', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'position'],
}
