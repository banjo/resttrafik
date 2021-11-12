import { Delay, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDelays = async () => {
    return await prisma.delay.findMany();
};

export const addDelay = async (delay: Delay) => {
    const newDelay = await prisma.delay.create({
        data: delay,
    });

    return newDelay.id;
};
