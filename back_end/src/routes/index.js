import { Router } from 'express'
import healthRoutes from './health.routes.js'
import memberRoutes from './member.routes.js'

const router = Router()

router.use('/health', healthRoutes)
router.use('/members', memberRoutes)

export default router
