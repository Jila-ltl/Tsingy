import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    message: 'Tsingy backend is running',
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
})

export default router
