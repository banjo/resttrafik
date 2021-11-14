import { Delay } from ".prisma/client";
import { DelayWithoutId, Transfer } from "../../../src/types/types";

export const isBetweenDates = (date: Date, start: Date, end: Date) => {
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
};

export const isValidDate = (date: Date) => {
    return (
        new Date(date).toString() !== "Invalid Date" &&
        !isNaN(new Date(date).valueOf())
    );
};

export const getCurrentDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const mapToDelay = (transfer: Transfer, id: number): Delay => {
    return {
        ...mapToDelayWithoutId(transfer),
        id: id,
    };
};

export const mapToDelayWithoutId = (transfer: Transfer): DelayWithoutId => {
    const expected = isValidDate(new Date(transfer.arrival))
        ? new Date(transfer.arrival)
        : new Date(transfer.departure);

    const late = transfer.newArrival || transfer.newDeparture;

    if (late === null || !isValidDate(new Date(late))) {
        console.error("Could not get late transfer time");
        throw new Error("Could not get late transfer time");
    }

    return {
        createdAt: new Date(),
        destination: transfer.destination,
        expectedTime: expected,
        externalId: transfer.id,
        info: transfer.comment ?? "",
        newTime: new Date(late),
        origin: transfer.origin,
        track: transfer.track,
        train: transfer.train,
        type: transfer.type,
        updatedAt: new Date(),
    };
};
