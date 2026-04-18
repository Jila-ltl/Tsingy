import { EventStatus, PrismaClient, ProfessionType, RequestStatus, UserRole } from '@prisma/client'
import { hashPassword } from '../src/lib/auth.js'

const prisma = new PrismaClient()

async function main() {
  const memberPasswordHash = await hashPassword('member123')
  const bureauPasswordHash = await hashPassword('bureau123')

  const demoUser = await prisma.user.upsert({
    where: { email: 'member@tsingy.app' },
    update: {
      isApproved: true,
      passwordHash: memberPasswordHash,
      profile: {
        upsert: {
          create: {
            address: 'Marrakech',
            domicileAtMarrakech: 'Gueliz',
            firstName: 'Dany',
            lastName: 'Dama',
            matricule: 'AMCI-1489',
            passportNumber: 'MG123456',
            phone: '0349459128',
            professionType: ProfessionType.STUDENT,
            school: 'ENCG Marrakech',
            track: 'Audit'
          },
          update: {
            address: 'Marrakech',
            domicileAtMarrakech: 'Gueliz',
            firstName: 'Dany',
            lastName: 'Dama',
            matricule: 'AMCI-1489',
            passportNumber: 'MG123456',
            phone: '0349459128',
            professionType: ProfessionType.STUDENT,
            school: 'ENCG Marrakech',
            track: 'Audit'
          }
        }
      }
    },
    create: {
      email: 'member@tsingy.app',
      isApproved: true,
      passwordHash: memberPasswordHash,
      role: UserRole.MEMBER,
      profile: {
        create: {
          domicileAtMarrakech: 'Gueliz',
          firstName: 'Dany',
          lastName: 'Dama',
          phone: '0349459128',
          address: 'Marrakech',
          matricule: 'AMCI-1489',
          cinNumber: 'E034606W',
          passportNumber: 'MG123456',
          professionType: ProfessionType.STUDENT,
          school: 'ENCG Marrakech',
          track: 'Audit'
        }
      }
    },
    include: { profile: true }
  })

  const pendingMember = await prisma.user.upsert({
    where: { email: 'pending@tsingy.app' },
    update: {
      passwordHash: memberPasswordHash,
      profile: {
        upsert: {
          create: {
            domicileAtMarrakech: 'Semlalia',
            firstName: 'Miora',
            lastName: 'Randria',
            professionType: ProfessionType.WORKER,
            jobTitle: 'Developpeur Fullstack',
            phone: '+212600000001'
          },
          update: {
            domicileAtMarrakech: 'Semlalia',
            firstName: 'Miora',
            lastName: 'Randria',
            professionType: ProfessionType.WORKER,
            jobTitle: 'Developpeur Fullstack',
            phone: '+212600000001'
          }
        }
      }
    },
    create: {
      email: 'pending@tsingy.app',
      passwordHash: memberPasswordHash,
      role: UserRole.MEMBER,
      profile: {
        create: {
          domicileAtMarrakech: 'Semlalia',
          firstName: 'Miora',
          lastName: 'Randria',
          professionType: ProfessionType.WORKER,
          jobTitle: 'Developpeur Fullstack',
          phone: '+212600000001'
        }
      }
    },
    include: { profile: true }
  })

  const bureauUser = await prisma.user.upsert({
    where: { email: 'bureau@tsingy.app' },
    update: {
      isApproved: true,
      passwordHash: bureauPasswordHash,
      role: UserRole.BUREAU,
      profile: {
        upsert: {
          create: {
            firstName: 'Marie',
            lastName: 'Ralison',
            phone: '+212600000010',
            professionType: ProfessionType.STUDENT,
            school: 'ENCG Marrakech',
            track: 'Audit'
          },
          update: {
            firstName: 'Marie',
            lastName: 'Ralison',
            phone: '+212600000010',
            professionType: ProfessionType.STUDENT,
            school: 'ENCG Marrakech',
            track: 'Audit'
          }
        }
      }
    },
    create: {
      email: 'bureau@tsingy.app',
      isApproved: true,
      passwordHash: bureauPasswordHash,
      role: UserRole.BUREAU,
      profile: {
        create: {
          firstName: 'Marie',
          lastName: 'Ralison',
          phone: '+212600000010',
          professionType: ProfessionType.STUDENT,
          school: 'ENCG Marrakech',
          track: 'Audit'
        }
      }
    },
    include: { profile: true }
  })

  await prisma.procurationRequest.deleteMany({
    where: {
      userId: { in: [demoUser.id, pendingMember.id] }
    }
  })

  await prisma.reclamation.deleteMany({
    where: {
      userId: { in: [demoUser.id, pendingMember.id] }
    }
  })

  await prisma.certificateSubmission.deleteMany({
    where: {
      userId: { in: [demoUser.id, pendingMember.id] }
    }
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
      },
      {
        userId: pendingMember.id,
        title: 'Retrait de dossier administratif',
        status: RequestStatus.APPROVED,
        ownerFirstName: 'Miora',
        ownerLastName: 'Randria',
        ownerPhone: '+212600000001',
        ownerAddress: 'Semlalia',
        ownerMatricule: 'AMCI-2001',
        ownerCinNumber: 'M123456',
        proxyFullName: 'Lova Raman',
        proxyCinNumber: 'CIN-8891',
        requestDate: new Date()
      }
    ]
  })

  await prisma.reclamation.createMany({
    data: [
      {
        userId: demoUser.id,
        subject: 'Bourse AMCI',
        message: 'Le versement du mois en cours n a pas encore ete recu.',
        status: RequestStatus.PENDING
      },
      {
        userId: pendingMember.id,
        subject: 'Regularisation du dossier',
        message: 'Merci de verifier la mise a jour de mes informations administratives.',
        status: RequestStatus.APPROVED
      }
    ]
  })

  await prisma.certificateSubmission.createMany({
    data: [
      {
        userId: demoUser.id,
        schoolYear: '2025 - 2026',
        fileName: 'Certificat de scolarite',
        reference: 'Depot numerique',
        status: RequestStatus.PENDING
      }
    ]
  })

  await prisma.announcement.deleteMany({ where: { publishedBy: bureauUser.id } })
  await prisma.bureauEvent.deleteMany({ where: { publishedBy: bureauUser.id } })
  await prisma.bureauMember.deleteMany()

  await prisma.announcement.createMany({
    data: [
      {
        title: 'Assemblee generale 2026',
        message: 'L assemblee generale se tiendra samedi prochain au siege de Marrakech.',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        publishedBy: bureauUser.id
      },
      {
        title: 'Campagne de mise a jour des profils',
        message: 'Merci de verifier vos informations avant la fin du mois.',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
        publishedBy: bureauUser.id
      }
    ]
  })

  await prisma.bureauEvent.createMany({
    data: [
      {
        title: 'Journee integration',
        description: 'Accueil des nouveaux membres et presentation du bureau.',
        location: 'Marrakech',
        eventDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
        status: EventStatus.PUBLISHED,
        publishedBy: bureauUser.id
      }
    ]
  })

  await prisma.bureauMember.createMany({
    data: [
      {
        fullName: 'Marie Warenska Jocya Ralison',
        title: 'Secretaire generale (SG)',
        school: 'ENCG',
        track: 'Audit',
        level: '4eme annee',
        mission: 'Coordination generale',
        imageUrl: '/img/waren.jpeg',
        sortOrder: 1
      },
      {
        fullName: 'Jade Ismael',
        title: 'Secretaire generale adjointe',
        school: 'FSJES',
        track: 'Droit',
        level: '3eme annee',
        mission: 'Support SG',
        imageUrl: '/img/jade.jpeg',
        sortOrder: 2
      },
      {
        fullName: 'Ulrica Chadia Baozaka',
        title: 'Responsable communication',
        school: 'ENCG',
        track: 'Commerce et Gestion',
        level: '2eme annee',
        mission: 'Communication des informations',
        imageUrl: '/img/chadia.jpeg',
        sortOrder: 3
      }
    ]
  })

  console.log('Seed completed:', {
    bureauUser: bureauUser.email,
    memberUser: demoUser.email,
    passwordBureau: 'bureau123',
    passwordMember: 'member123'
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
