import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const delayData: Prisma.DelayCreateInput[] = [
    {
        destination: "gbg",
        expectedTime: new Date(),
        externalId: "123",
        info: "Some info",
        newTime: new Date(),
        origin: "thn",
        track: "14",
        train: "1002",
        type: "SJ",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

async function main() {
    console.log(`Start seeding ...`);
    for (const u of delayData) {
        const delay = await prisma.delay.create({
            data: u,
        });
        console.log(`Created user with id: ${delay.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
