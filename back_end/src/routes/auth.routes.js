import { ProfessionType, UserRole } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'
import { hashPassword, serializeAuthUser, signToken, verifyPassword } from '../lib/auth.js'
import { prisma } from '../lib/prisma.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

const registerSchema = z.object({
  address: z.string().optional().default(''),
  arrivalDate: z.string().optional(),
  birthDate: z.string().optional(),
  domicileAtMarrakech: z.string().optional().default(''),
  email: z.string().email(),
  facebookName: z.string().optional().default(''),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  matricule: z.string().optional().default(''),
  passportNumber: z.string().optional().default(''),
  password: z.string().min(6),
  phone: z.string().optional().default(''),
  professionType: z.nativeEnum(ProfessionType).optional().default(ProfessionType.STUDENT),
  residenceCardNumber: z.string().optional().default(''),
  school: z.string().optional().default(''),
  track: z.string().optional().default(''),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

router.post('/register', async (req, res, next) => {
  try {
    const payload = registerSchema.parse(req.body)
    const existingUser = await prisma.user.findUnique({ where: { email: payload.email } })

    if (existingUser) {
      const error = new Error('Email already in use')
      error.status = 409
      throw error
    }

    const user = await prisma.user.create({
      data: {
        email: payload.email,
        isApproved: false,
        passwordHash: await hashPassword(payload.password),
        role: UserRole.MEMBER,
        profile: {
          create: {
            address: payload.address || null,
            arrivalDate: payload.arrivalDate ? new Date(payload.arrivalDate) : null,
            birthDate: payload.birthDate ? new Date(payload.birthDate) : null,
            domicileAtMarrakech: payload.domicileAtMarrakech || null,
            facebookName: payload.facebookName || null,
            firstName: payload.firstName,
            lastName: payload.lastName,
            matricule: payload.matricule || null,
            passportNumber: payload.passportNumber || null,
            phone: payload.phone || null,
            professionType: payload.professionType,
            residenceCardNumber: payload.residenceCardNumber || null,
            school: payload.school || null,
            track: payload.track || null,
          },
        },
      },
      include: { profile: true },
    })

    res.status(201).json({
      token: signToken(user),
      user: serializeAuthUser(user),
    })
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const payload = loginSchema.parse(req.body)
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      include: { profile: true },
    })

    if (!user || !(await verifyPassword(payload.password, user.passwordHash))) {
      const error = new Error('Invalid email or password')
      error.status = 401
      throw error
    }

    res.json({
      token: signToken(user),
      user: serializeAuthUser(user),
    })
  } catch (error) {
    next(error)
  }
})

router.get('/me', authenticate, async (req, res) => {
  res.json({ user: serializeAuthUser(req.user) })
})

export default router
