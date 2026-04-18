import { ProfessionType } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma.js'
import { authenticate } from '../middleware/auth.js'

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
  title: z.string().min(1)
})

const reclamationSchema = z.object({
  message: z.string().min(5),
  subject: z.string().min(1)
})

const certificateSchema = z.object({
  fileName: z.string().min(1),
  reference: z.string().optional(),
  schoolYear: z.string().min(1)
})

const profileSchema = z.object({
  address: z.string().optional().nullable(),
  arrivalDate: z.string().optional().nullable(),
  birthDate: z.string().optional().nullable(),
  domicileAtMarrakech: z.string().optional().nullable(),
  email: z.string().email().optional(),
  facebookName: z.string().optional().nullable(),
  firstName: z.string().min(1),
  jobTitle: z.string().optional().nullable(),
  lastName: z.string().min(1),
  passportNumber: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  professionType: z.nativeEnum(ProfessionType).optional(),
  residenceCardNumber: z.string().optional().nullable(),
  school: z.string().optional().nullable(),
  track: z.string().optional().nullable()
})

router.use(authenticate)

router.get('/dashboard', async (req, res, next) => {
  try {
    const [procurations, reclamations, certificates] = await Promise.all([
      prisma.procurationRequest.findMany({ where: { userId: req.user.id }, orderBy: { createdAt: 'desc' } }),
      prisma.reclamation.findMany({ where: { userId: req.user.id }, orderBy: { createdAt: 'desc' } }),
      prisma.certificateSubmission.findMany({ where: { userId: req.user.id }, orderBy: { createdAt: 'desc' } })
    ])

    res.json({
      certificates,
      procurations,
      profile: req.user.profile,
      reclamations,
      stats: {
        certificates: certificates.length,
        procurations: procurations.length,
        reclamations: reclamations.length
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/me/profile', async (req, res) => {
  res.json(req.user.profile)
})

router.patch('/me/profile', async (req, res, next) => {
  try {
    const payload = profileSchema.parse(req.body)
    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        email: payload.email || req.user.email,
        profile: {
          update: {
            address: payload.address ?? null,
            arrivalDate: payload.arrivalDate ? new Date(payload.arrivalDate) : null,
            birthDate: payload.birthDate ? new Date(payload.birthDate) : null,
            domicileAtMarrakech: payload.domicileAtMarrakech ?? null,
            facebookName: payload.facebookName ?? null,
            firstName: payload.firstName,
            jobTitle: payload.jobTitle ?? null,
            lastName: payload.lastName,
            passportNumber: payload.passportNumber ?? null,
            phone: payload.phone ?? null,
            professionType: payload.professionType || undefined,
            residenceCardNumber: payload.residenceCardNumber ?? null,
            school: payload.school ?? null,
            track: payload.track ?? null
          }
        }
      },
      include: { profile: true }
    })

    res.json(updated.profile)
  } catch (error) {
    next(error)
  }
})

router.get('/procurations', async (req, res, next) => {
  try {
    const requests = await prisma.procurationRequest.findMany({
      where: { userId: req.user.id },
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
        requestDate: new Date(payload.requestDate),
        userId: req.user.id
      }
    })

    res.status(201).json(created)
  } catch (error) {
    next(error)
  }
})

router.get('/reclamations', async (req, res, next) => {
  try {
    const reclamations = await prisma.reclamation.findMany({
      where: { userId: req.user.id },
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
    const created = await prisma.reclamation.create({
      data: {
        ...payload,
        userId: req.user.id
      }
    })

    res.status(201).json(created)
  } catch (error) {
    next(error)
  }
})

router.get('/certificates', async (req, res, next) => {
  try {
    const certificates = await prisma.certificateSubmission.findMany({
      where: { userId: req.user.id },
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
    const created = await prisma.certificateSubmission.create({
      data: {
        ...payload,
        userId: req.user.id
      }
    })

    res.status(201).json(created)
  } catch (error) {
    next(error)
  }
})

export default router
