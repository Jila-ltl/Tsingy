import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { env } from './config/env.js'
import { errorHandler } from './middleware/error-handler.js'
import routes from './routes/index.js'

const app = express()

app.use(cors({ origin: env.clientUrl }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to the Tsingy Node.js backend',
    prisma: 'connected when DATABASE_URL is configured',
  })
})

app.use('/api', routes)
app.use(errorHandler)

export default app
