import 'dotenv/config'
import jwt from 'jsonwebtoken'

const secret: jwt.PrivateKey = process.env.SECRET

export const jwtService = {
  signToken: async (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, secret, {
      expiresIn: expiration,
    })
  },
}
