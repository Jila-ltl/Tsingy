import { randomUUID } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { prisma } from './prisma.js'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const storageRoot = path.resolve(currentDir, '../../storage')
const uploadsRoot = path.join(storageRoot, 'uploads', 'carousel')
const metadataDir = path.join(storageRoot, 'carousel')
const metadataFile = path.join(metadataDir, 'slides.json')

function buildSlide(record) {
  return {
    id: record.id,
    image: record.imageUrl,
    nom: record.nom,
    poste: record.poste,
    details: {
      ecole: record.ecole || '',
      filiere: record.filiere || '',
      niveau: record.niveau || '',
      role: record.role || '',
    },
  }
}

async function ensureStorage() {
  await fs.mkdir(uploadsRoot, { recursive: true })
  await fs.mkdir(metadataDir, { recursive: true })
}

async function readLegacyRecords() {
  await ensureStorage()

  try {
    const content = await fs.readFile(metadataFile, 'utf8')

    return JSON.parse(content)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return []
    }

    throw error
  }
}

async function archiveLegacyFile() {
  try {
    await fs.access(metadataFile)
  } catch {
    return
  }

  const archivedFile = path.join(metadataDir, `slides.migrated-${Date.now()}.json`)
  await fs.rename(metadataFile, archivedFile)
}

async function ensureLegacySlidesMigrated() {
  await ensureStorage()

  const existingCount = await prisma.carouselslide.count()

  if (existingCount > 0) {
    return
  }

  const legacyRecords = await readLegacyRecords()

  if (legacyRecords.length === 0) {
    return
  }

  await prisma.$transaction(
    legacyRecords.map((record, index) => prisma.carouselslide.create({
      data: {
        createdAt: record.createdAt ? new Date(record.createdAt) : undefined,
        ecole: record.ecole || '',
        filiere: record.filiere || '',
        id: record.id || randomUUID(),
        imageUrl: record.image,
        niveau: record.niveau || '',
        nom: record.nom,
        poste: record.poste,
        role: record.role || '',
        sortOrder: Number.isInteger(record.sortOrder) ? record.sortOrder : index,
        updatedAt: record.updatedAt ? new Date(record.updatedAt) : new Date(),
      },
    })),
  )

  await archiveLegacyFile()
}

function getExtension(fileName, mimeType) {
  const sanitizedExt = path.extname(fileName || '').replace(/[^.a-z0-9]/gi, '')

  if (sanitizedExt) {
    return sanitizedExt.toLowerCase()
  }

  if (mimeType === 'image/png') return '.png'
  if (mimeType === 'image/webp') return '.webp'
  if (mimeType === 'image/gif') return '.gif'

  return '.jpg'
}

function parseImageData(imageData) {
  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(imageData || '')

  if (!match) {
    const error = new Error('Le format de l image est invalide.')
    error.status = 400
    throw error
  }

  return {
    base64: match[2],
    mimeType: match[1],
  }
}

async function saveImage(imageData, imageName) {
  const { base64, mimeType } = parseImageData(imageData)
  const extension = getExtension(imageName, mimeType)
  const fileName = `${Date.now()}-${randomUUID()}${extension}`
  const filePath = path.join(uploadsRoot, fileName)

  await fs.writeFile(filePath, Buffer.from(base64, 'base64'))

  return `/uploads/carousel/${fileName}`
}

async function removeImage(imageUrl) {
  if (!imageUrl) {
    return
  }

  const fileName = path.basename(imageUrl)
  const filePath = path.join(uploadsRoot, fileName)

  try {
    await fs.unlink(filePath)
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error
    }
  }
}

function mapPayload(payload) {
  return {
    ecole: payload.ecole || '',
    filiere: payload.filiere || '',
    imageUrl: payload.imageUrl,
    niveau: payload.niveau || '',
    nom: payload.nom,
    poste: payload.poste,
    role: payload.role || '',
  }
}

export async function listCarouselSlides() {
  await ensureLegacySlidesMigrated()
  const records = await prisma.carouselslide.findMany({
    orderBy: [
      { sortOrder: 'asc' },
      { createdAt: 'asc' },
    ],
  })

  return records.map(buildSlide)
}

export async function createCarouselSlide(payload) {
  await ensureLegacySlidesMigrated()
  const imageUrl = await saveImage(payload.imageData, payload.imageName)
  const lastSlide = await prisma.carouselslide.findFirst({
    orderBy: { sortOrder: 'desc' },
  })
  const record = await prisma.carouselslide.create({
    data: {
      ...mapPayload({ ...payload, imageUrl }),
      sortOrder: (lastSlide?.sortOrder ?? -1) + 1,
    },
  })

  return buildSlide(record)
}

export async function updateCarouselSlide(id, payload) {
  await ensureLegacySlidesMigrated()
  const currentRecord = await prisma.carouselslide.findUnique({
    where: { id },
  })

  if (!currentRecord) {
    const error = new Error('Slide introuvable.')
    error.status = 404
    throw error
  }

  let imageUrl = currentRecord.imageUrl

  if (payload.imageData) {
    imageUrl = await saveImage(payload.imageData, payload.imageName)
    await removeImage(currentRecord.imageUrl)
  }

  const updatedRecord = await prisma.carouselslide.update({
    where: { id },
    data: {
      ecole: payload.ecole ?? currentRecord.ecole,
      filiere: payload.filiere ?? currentRecord.filiere,
      imageUrl,
      niveau: payload.niveau ?? currentRecord.niveau,
      nom: payload.nom ?? currentRecord.nom,
      poste: payload.poste ?? currentRecord.poste,
      role: payload.role ?? currentRecord.role,
    },
  })

  return buildSlide(updatedRecord)
}

export async function deleteCarouselSlide(id) {
  await ensureLegacySlidesMigrated()
  const record = await prisma.carouselslide.findUnique({
    where: { id },
  })

  if (!record) {
    const error = new Error('Slide introuvable.')
    error.status = 404
    throw error
  }

  await prisma.carouselslide.delete({
    where: { id },
  })
  await removeImage(record.imageUrl)
}
