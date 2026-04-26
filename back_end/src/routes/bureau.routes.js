import { EventStatus, RequestStatus, UserRole } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = Router()

const announcementSchema = z.object({
  expiresAt: z.string().optional(),
  message: z.string().min(5),
  title: z.string().min(1)
})

const eventSchema = z.object({
  description: z.string().min(5),
  eventDate: z.string().optional(),
  location: z.string().optional(),
  status: z.nativeEnum(EventStatus).optional().default(EventStatus.DRAFT),
  title: z.string().min(1)
})

const reviewSchema = z.object({
  approved: z.boolean()
})

router.use(authenticate)
router.use(authorize(UserRole.BUREAU, UserRole.ADMIN))

router.get('/dashboard', async (_req, res, next) => {
  try {
    const [membersCount, pendingMembers, procurations, reclamations, certificates, announcements, events, bureauMembers] = await Promise.all([
      prisma.user.count({ where: { role: UserRole.MEMBER } }),
      prisma.user.findMany({
        where: { isApproved: false, role: UserRole.MEMBER },
        include: { profile: true },
        orderBy: { createdAt: 'desc' },
        take: 10
      }),
      prisma.procurationRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 8, include: { user: { include: { profile: true } } } }),
      prisma.reclamation.findMany({ orderBy: { createdAt: 'desc' }, take: 8, include: { user: { include: { profile: true } } } }),
      prisma.certificateSubmission.findMany({ orderBy: { createdAt: 'desc' }, take: 8, include: { user: { include: { profile: true } } } }),
      prisma.announcement.findMany({ orderBy: { createdAt: 'desc' }, take: 6 }),
      prisma.bureauEvent.findMany({ orderBy: { createdAt: 'desc' }, take: 6 }),
      prisma.bureauMember.findMany({ orderBy: { sortOrder: 'asc' } })
    ])

    res.json({
      announcements,
      bureauMembers,
      certificates,
      events,
      pendingMembers,
      procurations,
      reclamations,
      stats: {
        announcements: announcements.length,
        members: membersCount,
        pendingApprovals: pendingMembers.length,
        requests: procurations.length + reclamations.length + certificates.length
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/directory', async (_req, res, next) => {
  try {
    const members = await prisma.user.findMany({
      where: { role: UserRole.MEMBER },
      include: { profile: true },
      orderBy: { createdAt: 'desc' }
    })

    res.json(members)
  } catch (error) {
    next(error)
  }
})

router.post('/announcements', async (req, res, next) => {
  try {
    const payload = announcementSchema.parse(req.body)
    const created = await prisma.announcement.create({
      data: {
        expiresAt: payload.expiresAt ? new Date(payload.expiresAt) : null,
        message: payload.message,
        publishedBy: req.user.id,
        title: payload.title
      }
    })

    res.status(201).json(created)
  } catch (error) {
    next(error)
  }
})

router.post('/events', async (req, res, next) => {
  try {
    const payload = eventSchema.parse(req.body)
    const created = await prisma.bureauEvent.create({
      data: {
        description: payload.description,
        eventDate: payload.eventDate ? new Date(payload.eventDate) : null,
        location: payload.location || null,
        publishedBy: req.user.id,
        status: payload.status,
        title: payload.title
      }
    })

    res.status(201).json(created)
  } catch (error) {
    next(error)
  }
})

router.patch('/members/:id/review', async (req, res, next) => {
  try {
    const memberId = Number(req.params.id)
    const payload = reviewSchema.parse(req.body)
    const updated = await prisma.user.update({
      where: { id: memberId },
      data: { isApproved: payload.approved },
      include: { profile: true }
    })

    res.json(updated)
  } catch (error) {
    next(error)
  }
})

router.patch('/requests/:kind/:id', async (req, res, next) => {
  try {
    const requestId = Number(req.params.id)
    const payload = z.object({ status: z.nativeEnum(RequestStatus) }).parse(req.body)
    const kind = req.params.kind

    if (kind === 'procuration') {
      return res.json(await prisma.procurationRequest.update({ where: { id: requestId }, data: { status: payload.status } }))
    }

    if (kind === 'reclamation') {
      return res.json(await prisma.reclamation.update({ where: { id: requestId }, data: { status: payload.status } }))
    }

    if (kind === 'certificate') {
      return res.json(await prisma.certificateSubmission.update({ where: { id: requestId }, data: { status: payload.status } }))
    }

    const error = new Error('Unknown request type')
    error.status = 400
    throw error
  } catch (error) {
    next(error)
  }
})

export default router
