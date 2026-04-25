import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export function hashPassword (password) {
  return bcrypt.hash(password, 10)
}

export function verifyPassword (password, passwordHash) {
  return bcrypt.compare(password, passwordHash)
}

export function signToken (user) {
  return jwt.sign(
    {
      email: user.email,
      role: user.role,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
      subject: String(user.id),
    },
  )
}

export function serializeAuthUser (user) {
  return {
    email: user.email,
    id: user.id,
    isApproved: user.isApproved,
    profile: user.profile,
    role: user.role,
  }
}
