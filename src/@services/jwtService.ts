import 'dotenv/config'
import jwt from 'jsonwebtoken'

const secret: jwt.Secret = process.env.SECRET

export const jwtService = {
  signToken: async (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, secret, {
      expiresIn: expiration,
    })
  },

  verifyToken: async (token: string, callbackfn: jwt.VerifyCallback) => {
    jwt.verify(token, secret, callbackfn)
  },
}
