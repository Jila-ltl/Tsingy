import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma.js'

const router = Router()

const procurationSchema = z.object({
  ownerAddress: z.string().min(1),
  ownerCinNumber: z.string().min(1),
  ownerFirstName: z.string().min(1),
  ownerLastName: z.string().min(1),
  ownerMatricule: z.string().min(1),
  ownerPhone: z.string().min(1),
  proxyCinNumber: z.string().min(1),
  proxyFullName: z.string().min(1),
  requestDate: z.string().datetime().or(z.string().date()),
  title: z.string().min(1),
  userId: z.number().int().positive()
})

const reclamationSchema = z.object({
  message: z.string().min(5),
  subject: z.string().min(1),
  userId: z.number().int().positive()
})

const certificateSchema = z.object({
  fileName: z.string().min(1),
  reference: z.string().optional(),
  schoolYear: z.string().min(1),
  userId: z.number().int().positive()
})

router.get('/dashboard', async (_req, res, next) => {
  try {
    const [members, procurations, reclamations, certificates] = await Promise.all([
      prisma.user.count(),
      prisma.procurationRequest.count(),
      prisma.reclamation.count(),
      prisma.certificateSubmission.count()
    ])

    res.json({ certificates, members, procurations, reclamations })
  } catch (error) {
    next(error)
  }
})

router.get('/procurations', async (_req, res, next) => {
  try {
    const requests = await prisma.procurationRequest.findMany({
      include: { user: { include: { profile: true } } },
      orderBy: { createdAt: 'desc' }
    })

    res.json(requests)
  } catch (error) {
    next(error)
  }
})

router.post('/procurations', async (req, res, next) => {
  try {
    const payload = procurationSchema.parse(req.body)
    const created = await prisma.procurationRequest.create({
      data: {
        ...payload,
        requestDate: new Date(payload.requestDate)
      }
    })

    res.status(201).json(created)
  } catch (error) {
    next(error)
  }
})

router.get('/reclamations', async (_req, res, next) => {
  try {
    const reclamations = await prisma.reclamation.findMany({
      orderBy: { createdAt: 'desc' }
    })

    res.json(reclamations)
  } catch (error) {
    next(error)
  }
})

router.post('/reclamations', async (req, res, next) => {
  try {
    const payload = reclamationSchema.parse(req.body)
    const created = await prisma.reclamation.create({ data: payload })

    res.status(201).json(created)
  } catch (error) {
    next(error)
  }
})

router.get('/certificates', async (_req, res, next) => {
  try {
    const certificates = await prisma.certificateSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    })

    res.json(certificates)
  } catch (error) {
    next(error)
  }
})

router.post('/certificates', async (req, res, next) => {
  try {
    const payload = certificateSchema.parse(req.body)
    const created = await prisma.certificateSubmission.create({ data: payload })

    res.status(201).json(created)
  } catch (error) {
    next(error)
  }
})

export default router
