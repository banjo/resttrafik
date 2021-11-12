import { Delay } from ".prisma/client";

export const convertToCorrectDates = (delay: Delay) => {
    delay.createdAt = new Date();
    delay.updatedAt = new Date();
    delay.expectedTime = new Date(delay.expectedTime);
    delay.newTime = new Date(delay.newTime);

    return delay;
};
