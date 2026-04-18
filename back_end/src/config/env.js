import dotenv from 'dotenv'

dotenv.config()

export const env = {
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL || '',
  port: Number(process.env.PORT || 4000)
}
