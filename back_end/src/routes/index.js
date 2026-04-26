import { Router } from 'express'
import authRoutes from './auth.routes.js'
import bureauRoutes from './bureau.routes.js'
import healthRoutes from './health.routes.js'
import memberRoutes from './member.routes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/bureau', bureauRoutes)
router.use('/health', healthRoutes)
router.use('/members', memberRoutes)

export default router
