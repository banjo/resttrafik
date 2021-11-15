import { Delay, PrismaClient } from "@prisma/client";
import {
    mapToDelay,
    mapToDelayWithoutId,
} from "../../worker/tasks/fetchLate/helpers";
import { convertToCorrectDates } from "../helpers/date";
import { DelayWithoutId, Transfer } from "../types/types";

const prisma = new PrismaClient();

export const getDelay = async (externalId: string) => {
    return await prisma.delay.findFirst({
        where: {
            externalId: externalId,
        },
    });
};

export const getDelays = async () => {
    return await prisma.delay.findMany();
};

export const addDelay = async (delay: DelayWithoutId) => {
    const updatedDelay = convertToCorrectDates(delay, true);

    const newDelay = await prisma.delay.create({
        data: { ...updatedDelay },
    });

    return newDelay.id;
};

export const updateDelay = async (newDelay: Delay) => {
    const delay = await prisma.delay.findUnique({
        where: {
            id: newDelay.id,
        },
    });

    if (delay === null) {
        console.error("Could not find delay with id: " + newDelay.id);
        return false;
    }

    const formatedDelay = convertToCorrectDates(newDelay, false) as Delay;

    const updatedDelay = await prisma.delay.update({
        where: {
            id: formatedDelay.id,
        },
        data: formatedDelay,
    });

    return updatedDelay;
};

export const addOrUpdateDelays = async (transfers: Transfer[]) => {
    for (const transfer of transfers) {
        const delayInDatabase = await getDelay(transfer.id);

        if (delayInDatabase) {
            const newDelay = mapToDelay(transfer, delayInDatabase.id);
            await updateDelay(newDelay);
            return;
        }

        const newDelay = mapToDelayWithoutId(transfer);
        await addDelay(newDelay);
    }
};
