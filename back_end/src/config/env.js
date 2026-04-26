import dotenv from 'dotenv'

dotenv.config()

export const env = {
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  jwtSecret: process.env.JWT_SECRET || 'change-this-secret',
  port: Number(process.env.PORT || 4000),
}
