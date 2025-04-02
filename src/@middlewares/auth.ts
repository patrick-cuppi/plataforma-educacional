import type { NextFunction, Request, Response } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import { jwtService } from '../@services/jwtService'
import { userService } from '../@services/userService'
import type { UserInstance } from '../models/User'

export interface AuthenticatedRequest extends Request {
  user?: UserInstance | null
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader)
    return res.status(401).json({ message: 'Access denied! The token is not valid.' })

  const token = authorizationHeader.replace(/Bearer /, '')

  jwtService.verifyToken(token, async (error, decoded) => {
    if (error || typeof decoded === 'undefined')
      return res.status(401).json({ message: 'Access denied! The token is not valid' })

    const user = await userService.findByEmail((decoded as JwtPayload).email)

    req.user = user
    next()
  })
}

export function ensureAuthViaQuery(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { token } = req.query

  if (!token) return res.status(401).json({ message: 'Access denied! The token is not valid' })

  if (typeof token !== 'string')
    return res.status(401).json({ message: 'Access denied! The token is not valid' })

  jwtService.verifyToken(token, async (error, decoded) => {
    if (error || typeof decoded === 'undefined')
      return res.status(401).json({ message: 'Access denied! The token is not valid' })

    const user = await userService.findByEmail((decoded as JwtPayload).email)

    req.user = user
    next()
  })
}
