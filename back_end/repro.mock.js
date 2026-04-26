import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  try {
    const now = new Date()
    const email = 'repro_' + Date.now() + '@example.com'
    const user = await prisma.user.create({
      data: {
        email: email,
        isApproved: false,
        passwordHash: 'dummy_hash',
        role: 'MEMBER',
        updatedAt: now,
        memberprofile: {
          create: {
            firstName: 'Test',
            lastName: 'User',
            professionType: 'STUDENT',
            updatedAt: now,
          },
        },
      },
      include: { profile: true },
    })
    console.log('Success:', user)
  } catch (error) {
    console.log('--- ERROR START ---')
    console.log('Name:', error.constructor.name)
    console.log('Code:', error.code)
    console.log('Message:', error.message)
    console.log('--- ERROR END ---')
  } finally {
    await prisma.$disconnect()
  }
}

main()
