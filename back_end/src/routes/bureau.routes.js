import prismaPkg from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'
import {
  createCarouselSlide,
  deleteCarouselSlide,
  listCarouselSlides,
  updateCarouselSlide,
} from '../lib/carousel-storage.js'
import {
  createEventImage,
  deleteEventImage,
  deleteEventImagesForEvent,
  listEventImages,
  updateEventImage,
} from '../lib/event-gallery-storage.js'
import { serializeAuthUser } from '../lib/auth.js'
import { prisma } from '../lib/prisma.js'
import { authenticate, authorize } from '../middleware/auth.js'

const {
  bureauevent_status: EventStatus,
  procurationrequest_status: RequestStatus,
  user_role: UserRole,
} = prismaPkg

const router = Router()

const announcementSchema = z.object({
  expiresAt: z.string().optional(),
  message: z.string().min(5),
  title: z.string().min(1),
})

const eventSchema = z.object({
  description: z.string().min(5),
  eventDate: z.string().optional(),
  location: z.string().optional(),
  status: z.nativeEnum(EventStatus).optional().default(EventStatus.DRAFT),
  title: z.string().min(1),
})

const eventUpdateSchema = z.object({
  description: z.string().min(5).optional(),
  eventDate: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  status: z.nativeEnum(EventStatus).optional(),
  title: z.string().min(1).optional(),
})

const reviewSchema = z.object({
  approved: z.boolean(),
})

const carouselSlideCreateSchema = z.object({
  ecole: z.string().optional().default(''),
  filiere: z.string().optional().default(''),
  imageData: z.string().min(1),
  imageName: z.string().min(1),
  niveau: z.string().optional().default(''),
  nom: z.string().min(1),
  poste: z.string().min(1),
  role: z.string().optional().default(''),
})

const carouselSlideUpdateSchema = z.object({
  ecole: z.string().optional(),
  filiere: z.string().optional(),
  imageData: z.string().optional(),
  imageName: z.string().optional(),
  niveau: z.string().optional(),
  nom: z.string().optional(),
  poste: z.string().optional(),
  role: z.string().optional(),
})

const eventImageCreateSchema = z.object({
  imageData: z.string().min(1),
  imageName: z.string().min(1),
  name: z.string().optional(),
})

const eventImageUpdateSchema = z.object({
  imageData: z.string().optional(),
  imageName: z.string().optional(),
  name: z.string().optional(),
})

async function serializeEvent(event) {
  return {
    date: event.eventDate,
    description: event.description,
    id: event.id,
    imageData: await listEventImages(event.id),
    location: event.location,
    status: event.status,
    title: event.title,
  }
}

router.use(authenticate)
router.use(authorize(UserRole.BUREAU, UserRole.ADMIN))

router.get('/dashboard', async (_req, res, next) => {
  try {
    const [membersCount, pendingMembers, procurations, reclamations, certificates, announcements, events, bureauMembers] = await Promise.all([
      prisma.user.count({ where: { role: UserRole.MEMBER } }),
      prisma.user.findMany({
        where: { isApproved: false, role: UserRole.MEMBER },
        include: { memberprofile: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      prisma.procurationrequest.findMany({ orderBy: { createdAt: 'desc' }, take: 8, include: { user: { include: { memberprofile: true } } } }),
      prisma.reclamation.findMany({ orderBy: { createdAt: 'desc' }, take: 8, include: { user: { include: { memberprofile: true } } } }),
      prisma.certificatesubmission.findMany({ orderBy: { createdAt: 'desc' }, take: 8, include: { user: { include: { memberprofile: true } } } }),
      prisma.announcement.findMany({ orderBy: { createdAt: 'desc' }, take: 6 }),
      prisma.bureauevent.findMany({ orderBy: { createdAt: 'desc' }, take: 6 }),
      prisma.bureaumember.findMany({ orderBy: { sortOrder: 'asc' } }),
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
        requests: procurations.length + reclamations.length + certificates.length,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/directory', async (_req, res, next) => {
  try {
    const members = await prisma.user.findMany({
      include: { memberprofile: true },
      orderBy: { createdAt: 'desc' },
    })

    res.json(members.map(member => serializeAuthUser(member)))
  } catch (error) {
    next(error)
  }
})

router.get('/carousel-slides', async (_req, res, next) => {
  try {
    res.json(await listCarouselSlides())
  } catch (error) {
    next(error)
  }
})

router.post('/carousel-slides', authorize(UserRole.ADMIN), async (req, res, next) => {
  try {
    const payload = carouselSlideCreateSchema.parse(req.body)
    res.status(201).json(await createCarouselSlide(payload))
  } catch (error) {
    next(error)
  }
})

router.patch('/carousel-slides/:id', authorize(UserRole.ADMIN), async (req, res, next) => {
  try {
    const payload = carouselSlideUpdateSchema.parse(req.body)
    res.json(await updateCarouselSlide(req.params.id, payload))
  } catch (error) {
    next(error)
  }
})

router.delete('/carousel-slides/:id', authorize(UserRole.ADMIN), async (req, res, next) => {
  try {
    await deleteCarouselSlide(req.params.id)
    res.status(204).send()
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
        title: payload.title,
      },
    })

    res.status(201).json(created)
  } catch (error) {
    next(error)
  }
})

router.post('/events', async (req, res, next) => {
  try {
    const payload = eventSchema.parse(req.body)
    const created = await prisma.bureauevent.create({
      data: {
        description: payload.description,
        eventDate: payload.eventDate ? new Date(payload.eventDate) : null,
        location: payload.location || null,
        publishedBy: req.user.id,
        status: payload.status,
        title: payload.title,
        updatedAt: new Date(),
      },
    })

    res.status(201).json(await serializeEvent(created))
  } catch (error) {
    next(error)
  }
})

router.patch('/events/:id', async (req, res, next) => {
  try {
    const eventId = Number(req.params.id)
    const payload = eventUpdateSchema.parse(req.body)
    const updated = await prisma.bureauevent.update({
      where: { id: eventId },
      data: {
        description: payload.description,
        eventDate: payload.eventDate === undefined ? undefined : (payload.eventDate ? new Date(payload.eventDate) : null),
        location: payload.location === undefined ? undefined : (payload.location || null),
        status: payload.status,
        title: payload.title,
        updatedAt: new Date(),
      },
    })

    res.json(await serializeEvent(updated))
  } catch (error) {
    next(error)
  }
})

router.delete('/events/:id', async (req, res, next) => {
  try {
    const eventId = Number(req.params.id)

    await prisma.bureauevent.delete({ where: { id: eventId } })
    await deleteEventImagesForEvent(eventId)

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

router.post('/events/:id/images', async (req, res, next) => {
  try {
    const eventId = Number(req.params.id)
    const payload = eventImageCreateSchema.parse(req.body)

    await prisma.bureauevent.findUniqueOrThrow({ where: { id: eventId } })
    res.status(201).json(await createEventImage(eventId, payload))
  } catch (error) {
    next(error)
  }
})

router.patch('/events/:id/images/:imageId', async (req, res, next) => {
  try {
    const eventId = Number(req.params.id)
    const payload = eventImageUpdateSchema.parse(req.body)

    await prisma.bureauevent.findUniqueOrThrow({ where: { id: eventId } })
    res.json(await updateEventImage(eventId, req.params.imageId, payload))
  } catch (error) {
    next(error)
  }
})

router.delete('/events/:id/images/:imageId', async (req, res, next) => {
  try {
    const eventId = Number(req.params.id)

    await prisma.bureauevent.findUniqueOrThrow({ where: { id: eventId } })
    await deleteEventImage(eventId, req.params.imageId)

    res.status(204).send()
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
      include: { memberprofile: true },
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
      return res.json(await prisma.procurationrequest.update({ where: { id: requestId }, data: { status: payload.status } }))
    }

    if (kind === 'reclamation') {
      return res.json(await prisma.reclamation.update({ where: { id: requestId }, data: { status: payload.status } }))
    }

    if (kind === 'certificate') {
      return res.json(await prisma.certificatesubmission.update({ where: { id: requestId }, data: { status: payload.status } }))
    }

    const error = new Error('Unknown request type')
    error.status = 400
    throw error
  } catch (error) {
    next(error)
  }
})

export default router
