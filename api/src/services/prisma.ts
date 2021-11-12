import { Delay, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDelays = async () => {
    return await prisma.delay.findMany();
};

export const addDelay = async (delay: Delay) => {
    delay.createdAt = new Date();
    delay.updatedAt = new Date();
    delay.expectedTime = new Date(delay.expectedTime);
    delay.newTime = new Date(delay.newTime);

    const newDelay = await prisma.delay.create({
        data: { ...delay },
    });

    return newDelay.id;
};
