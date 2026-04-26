import { randomUUID } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const storageRoot = path.resolve(currentDir, '../../storage')
const uploadsRoot = path.join(storageRoot, 'uploads', 'events')
const metadataDir = path.join(storageRoot, 'events')
const metadataFile = path.join(metadataDir, 'images.json')

function buildEventImage(record) {
  return {
    id: record.id,
    name: record.name,
    type: record.type,
    url: record.url,
  }
}

async function ensureStorage() {
  await fs.mkdir(uploadsRoot, { recursive: true })
  await fs.mkdir(metadataDir, { recursive: true })

  try {
    await fs.access(metadataFile)
  } catch {
    await fs.writeFile(metadataFile, '[]', 'utf8')
  }
}

async function readRecords() {
  await ensureStorage()
  const content = await fs.readFile(metadataFile, 'utf8')

  return JSON.parse(content)
}

async function writeRecords(records) {
  await ensureStorage()
  await fs.writeFile(metadataFile, JSON.stringify(records, null, 2), 'utf8')
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

  return {
    type: mimeType,
    url: `/uploads/events/${fileName}`,
  }
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

export async function listEventImages(eventId) {
  const records = await readRecords()

  return records
    .filter(record => record.eventId === Number(eventId))
    .map(buildEventImage)
}

export async function listEventImagesMap() {
  const records = await readRecords()

  return records.reduce((accumulator, record) => {
    const eventId = Number(record.eventId)

    if (!accumulator[eventId]) {
      accumulator[eventId] = []
    }

    accumulator[eventId].push(buildEventImage(record))
    return accumulator
  }, {})
}

export async function createEventImage(eventId, payload) {
  const records = await readRecords()
  const savedImage = await saveImage(payload.imageData, payload.imageName)
  const record = {
    eventId: Number(eventId),
    id: randomUUID(),
    name: payload.name || payload.imageName,
    type: savedImage.type,
    url: savedImage.url,
  }

  records.unshift(record)
  await writeRecords(records)

  return buildEventImage(record)
}

export async function updateEventImage(eventId, imageId, payload) {
  const records = await readRecords()
  const index = records.findIndex(record => record.eventId === Number(eventId) && record.id === imageId)

  if (index === -1) {
    const error = new Error('Image introuvable.')
    error.status = 404
    throw error
  }

  const currentRecord = records[index]
  let nextUrl = currentRecord.url
  let nextType = currentRecord.type

  if (payload.imageData) {
    const savedImage = await saveImage(payload.imageData, payload.imageName)
    nextUrl = savedImage.url
    nextType = savedImage.type
    await removeImage(currentRecord.url)
  }

  const updatedRecord = {
    ...currentRecord,
    name: payload.name ?? currentRecord.name,
    type: nextType,
    url: nextUrl,
  }

  records[index] = updatedRecord
  await writeRecords(records)

  return buildEventImage(updatedRecord)
}

export async function deleteEventImage(eventId, imageId) {
  const records = await readRecords()
  const index = records.findIndex(record => record.eventId === Number(eventId) && record.id === imageId)

  if (index === -1) {
    const error = new Error('Image introuvable.')
    error.status = 404
    throw error
  }

  const [removed] = records.splice(index, 1)
  await writeRecords(records)
  await removeImage(removed.url)
}

export async function deleteEventImagesForEvent(eventId) {
  const records = await readRecords()
  const eventIdNumber = Number(eventId)
  const keptRecords = []
  const removedRecords = []

  for (const record of records) {
    if (record.eventId === eventIdNumber) {
      removedRecords.push(record)
      continue
    }

    keptRecords.push(record)
  }

  await writeRecords(keptRecords)
  await Promise.all(removedRecords.map(record => removeImage(record.url)))
}
