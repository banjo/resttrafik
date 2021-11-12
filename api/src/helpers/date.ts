import { Delay } from ".prisma/client";
import { DelayWithoutId } from "../types/types";

export const convertToCorrectDates = (delay: DelayWithoutId | Delay) => {
    delay.createdAt = new Date();
    delay.updatedAt = new Date();
    delay.expectedTime = new Date(delay.expectedTime);
    delay.newTime = new Date(delay.newTime);

    return delay;
};
