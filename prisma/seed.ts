import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const statuses = [
        { name: 'Not Started' },
        { name: 'Playing' },
        { name: 'Completed' },
        { name: 'Abandoned' },
    ];

    for (const status of statuses) {
        await prisma.gameStatus.upsert({
            where: { name: status.name },
            update: {},
            create: status,
        });
    }

    console.log('Seed completed!.');
}

main()
    .catch((e) => {
        console.error('Error while executing this seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });