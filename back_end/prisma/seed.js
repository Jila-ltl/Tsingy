import { PrismaClient, RequestStatus, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const demoUser = await prisma.user.upsert({
    where: { email: 'member@tsingy.app' },
    update: {},
    create: {
      email: 'member@tsingy.app',
      passwordHash: 'change-me',
      role: UserRole.MEMBER,
      profile: {
        create: {
          firstName: 'Dany',
          lastName: 'Dama',
          phone: '0349459128',
          address: 'Marrakech',
          matricule: 'AMCI-1489',
          cinNumber: 'E034606W'
        }
      }
    },
    include: { profile: true }
  })

  await prisma.procurationRequest.createMany({
    data: [
      {
        userId: demoUser.id,
        title: 'Demande de procuration AMCI',
        status: RequestStatus.PENDING,
        ownerFirstName: 'Dany',
        ownerLastName: 'Dama',
        ownerPhone: '0349459128',
        ownerAddress: 'Marrakech',
        ownerMatricule: 'AMCI-1489',
        ownerCinNumber: 'E034606W',
        proxyFullName: 'Vony Veronique',
        proxyCinNumber: 'A20X01417',
        requestDate: new Date()
      }
    ],
    skipDuplicates: true
  })
}

main()
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
