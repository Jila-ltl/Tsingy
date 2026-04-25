const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const secret = 'change-this-secret';


async function main() {
  try {
    const user = await prisma.user.findFirst({
      where: {
        role: { in: ['BUREAU', 'ADMIN'] }
      }
    });

    if (!user) {
      console.error('No BUREAU or ADMIN user found');
      process.exit(1);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: '1h' }
    );

    console.log(token);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.\();
  }
}

main();
