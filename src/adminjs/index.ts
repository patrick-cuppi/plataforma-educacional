import AdminJSExpress from '@adminjs/express'
import AdminJSSequelize from '@adminjs/sequelize'
import AdminJS from 'adminjs'
import { sequelize } from '../database'
import { authenticationOptions } from './authentication'
import { brandingOptions } from './branding'
import { dashboardOptions } from './dashboard'
import { locale } from './locale'
import { adminJsResource } from './resources'

AdminJS.registerAdapter(AdminJSSequelize)

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  resources: adminJsResource,
  branding: brandingOptions,
  locale: locale,
  dashboard: dashboardOptions,
})

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  authenticationOptions,
  null,
  {
    resave: false,
    saveUninitialize: false,
  }
)
