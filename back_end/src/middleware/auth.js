import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { prisma } from '../lib/prisma.js'

export async function authenticate(req, _res, next) {
  try {
    const authorization = req.headers.authorization || ''
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : ''

    if (!token) {
      const error = new Error('Authentication required')
      error.status = 401
      throw error
    }

    const payload = jwt.verify(token, env.jwtSecret)
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      include: { profile: true }
    })

    if (!user) {
      const error = new Error('User not found')
      error.status = 401
      throw error
    }

    req.user = user
    next()
  } catch (error) {
    error.status = error.status || 401
    next(error)
  }
}

export function authorize(...roles) {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      const error = new Error('Forbidden')
      error.status = 403
      return next(error)
    }

    next()
  }
}
