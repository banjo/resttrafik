import { Delay, PrismaClient } from "@prisma/client";
import { convertToCorrectDates } from "../helpers/date";
import { updateableDelay } from "../types/delay";

const prisma = new PrismaClient();

export const getDelays = async () => {
    return await prisma.delay.findMany();
};

export const addDelay = async (delay: Delay) => {
    const updatedDelay = convertToCorrectDates(delay);

    const newDelay = await prisma.delay.create({
        data: { ...updatedDelay },
    });

    return newDelay.id;
};

export const updateDelay = async (newDelay: updateableDelay) => {
    const delay = await prisma.delay.findUnique({
        where: {
            id: newDelay.id,
        },
    });

    if (delay === null) {
        console.error("Could not find delay with id: " + newDelay.id);
        return false;
    }

    const formatedDelay = convertToCorrectDates(newDelay);

    const updatedDelay = await prisma.delay.update({
        where: {
            id: formatedDelay.id,
        },
        data: formatedDelay,
    });

    return updatedDelay;
};
